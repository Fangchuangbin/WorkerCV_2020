const Service = require('egg').Service;
const moment = require('moment');
const path = require('path');
const crypto = require('crypto');
const upyun = require('upyun');
const service = new upyun.Service('image-workercv', 'fangchuangbin', 'ozQ76iKwl4jFhrClvf10PIJL75t1QgoZ');
const client = new upyun.Client(service);

class HomeService extends Service {

  //用户中心获取12条简历模板列表
  async getResumeTemplateList() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取简历模板成功' };
    var getFail = { code: 40004, message: '获取简历模板失败' };
    var resumeTemplateListData = await app.mysql.select('frontend_template', { limit: 12, orders: [['template_id', 'desc']] })
    if(resumeTemplateListData) {
      return { result: getSuccess, resumeTemplateListData }
    }else{
      return { result: getFail }
    }
  }

  //获取用户简历列表
  async getResumeList(userId) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历列表成功' };
    var getFail = { code: 40004, message: '获取用户简历列表失败' };
    var resumeList = await app.mysql.select('frontend_resume', { where: { user_id: userId }, orders: [['update_time', 'desc']] });
    for (let i = 0; i < resumeList.length; i++) {
      resumeList[i].update_time = moment(Number(resumeList[i].update_time)).format('YYYY-MM-DD HH:mm:ss')
    }
    if(resumeList) {
        return { result: getSuccess, resumeList }
    }else{
        return { result: getFail }
    }
  }

  //修改个人信息
  async setUserInfo(userInfoData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '修改个人信息成功' };
    var setFail = { code: 40004, message: '修改个人信息失败' };
    var updateTime = Date.parse(new Date());
    var setUserInfo = await app.mysql.update('frontend_user', {
      id: userInfoData.id, realname: userInfoData.realname, sex: userInfoData.sex, birth: userInfoData.birth, update_time: updateTime,
      identity: userInfoData.identity, native_place: userInfoData.native_place, phone: userInfoData.phone, email: userInfoData.email })
    if(setUserInfo.affectedRows === 1) {
      return { result: setSuccess, setUserInfo }
    }else{
      return { result: setFail }
    }
  }

  //更换个人头像
  async changeAvatar(fileStream, loginTokenData) {
    const { ctx, app } = this;
    var changeSuccess = { code: 20000, message: '更换个人头像成功' };
    var changeFail = { code: 40004, message: '更换个人头像失败' };
    var extname = path.extname(fileStream.filename);
    var filename = crypto.createHash('md5').update(fileStream.filename + Date.parse(new Date())).digest('hex');
    try {
      await client.putFile('/' + filename + extname, fileStream);
      var saveAvatar = await app.mysql.update('frontend_user', { avatar: 'http://image-workercv.test.upcdn.net/' + filename + extname }, { where: { id: loginTokenData.userData.id } })
      if(saveAvatar.affectedRows === 1) {
        return { result: changeSuccess, fileUrl: 'http://image-workercv.test.upcdn.net/' + filename + extname }
      }
    } catch (error) {
      return { result: changeFail }
    }
  }

  //修改密码
  async modifyPassword(passwordData, loginTokenData) {
    const { ctx, app } = this;
    var resetSuccess = { code: 20000, message: '修改密码成功' };
    var resetFail = { code: 40004, message: '修改密码失败' };
    var nowPassword = crypto.createHash('md5').update(passwordData.nowPassword).digest('hex');
    var newPassword = crypto.createHash('md5').update(passwordData.newPassword).digest('hex');
    if(nowPassword !== loginTokenData.userData.password) {
      return { result: resetFail }
    }else{
      var modifyPassword = await app.mysql.update('frontend_user', { id: loginTokenData.userData.id, password: newPassword } );
      if(modifyPassword.affectedRows === 1) {
        return { result: resetSuccess, modifyPassword }
      }else{
        return { result: resetFail }
      }
    }
  }

  //设置密保
  async setSecurity(securityData, loginTokenData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '设置密保成功' };
    var setFail = { code: 40004, message: '设置密保失败' };
    var setSecurity = await app.mysql.update('frontend_user', { id: loginTokenData.userData.id, question: securityData.securityQuestion, answer: securityData.securityAnswer })
    if(setSecurity.affectedRows === 1) {
      return { result: setSuccess, setSecurity }
    }else{
      return { result: setFail }
    }
  }

}

module.exports = HomeService;