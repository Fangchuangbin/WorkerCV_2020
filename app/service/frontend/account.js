const Service = require('egg').Service;
const moment = require('moment').Service;
const path = require('path');
const crypto = require('crypto');
const upyun = require('upyun');
const service = new upyun.Service('image-workercv', 'fangchuangbin', 'ozQ76iKwl4jFhrClvf10PIJL75t1QgoZ');
const client = new upyun.Client(service);

class AccountService extends Service {
  //用户登录
  async getUser(userData, loginToken) {
    const { ctx, app } = this;
    var emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var getUser;
    var getSuccess = { code: 20000, message: '登录成功，欢迎使用极速简历！' };
    var getFail = { code: 40001, message: '未知错误，请重新登录！' };
    var username = userData.username;
    var password = crypto.createHash('md5').update(userData.password).digest('hex');
    if(emailRule.test(username)) {
      getUser = await app.mysql.get('frontend_user', { email: username, password: password });
    }else{
      getUser = await app.mysql.get('frontend_user', { phone: username, password: password });
    }
    if(getUser) {
      await app.mysql.update('frontend_user', { id: getUser.id, login_token: loginToken });
      return { result: getSuccess, getUser };
    }else{
      return { result: getFail };
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

  //注册用户
  async registerAccount(registerAccountData) {
    const { ctx, app } = this;
    var registerSuccess = { code: 20000, message: '注册用户成功' };
    var registerFail = { code: 40004, message: '注册用户失败' };
    var updateTime = Date.parse(new Date());
    var password = crypto.createHash('md5').update(registerAccountData.password).digest('hex');
    var registerAccount = await app.mysql.insert('frontend_user', { phone: registerAccountData.phone, realname: registerAccountData.realname, email: registerAccountData.email, password: password, update_time: updateTime, vip: 0, avatar: '/frontend/images/account-img.png' })
    if(registerAccount.affectedRows === 1) {
      return { result: registerSuccess, registerAccount }
    }else{
      return { result: registerFail }
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
      var modifyPassword = await app.mysql.update('frontend_user', { id: loginTokenData.userData.id, password: newPassword });
      if(modifyPassword.effectedRows === 1) {
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

  //忘记密码
  async resetPassword(resetData) {
    const { ctx, app } = this;
    var resetSuccess = { code: 20000, message: '重置密码成功' };
    var resetFail = { code: 40004, message: '重置密码失败' };
    var resetPassword = await app.mysql.get('frontend_user', { realname: resetData.realname, email: resetData.email, question: resetData.resetQuestion, answer: resetData.resetAnswer }, { where: { phone: resetData.phone } })
    if(resetPassword) {
      return { result: resetSuccess, resetPassword }
    }else{
      return { result: resetFail }
    }
  }
  
  //忘记密码->设置新密码
  async resetNewPassword(resetNewData) {
    const { ctx, app } = this;
    var resetNewSuccess = { code: 20000, message: '重置密码成功' };
    var resetNewFail = { code: 40004, message: '重置密码失败' };
    var newPassword = crypto.createHash('md5').update(resetNewData.newPassword).digest('hex');
    var resetNewPassword = await app.mysql.update('frontend_user', { password: newPassword }, { where: { id: resetNewData.userId, password: resetNewData.nowPassword } });
    if(resetNewPassword.affectedRows === 1) {
      return { result: resetNewSuccess, resetNewPassword }
    }else{
      return { result: resetNewFail }
    }
  }
}

module.exports = AccountService;