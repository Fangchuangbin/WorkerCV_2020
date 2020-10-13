const Service = require('egg').Service;
const moment = require('moment').Service;

class AccountService extends Service {
  //用户登录
  async login(username, password, loginToken) {
    const { ctx, app } = this;
    var emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var verifyAccount;
    var verifySuccess = { code: 20000, message: '登录成功，欢迎使用极速简历！' };
    var verifyFail = { code: 40001, message: '未知错误，请重新登录！' };
    if(emailRule.test(username)) {
      verifyAccount = await app.mysql.get('user', { email: username, password: password });
    }else{
      verifyAccount = await app.mysql.get('user', { phone: username, password: password });
    }
    if(verifyAccount) {
      await app.mysql.update('user', { id: verifyAccount.id, login_token: loginToken });
      return { result: verifySuccess, verifyAccount };
    }else{
      return { result: verifyFail };
    }
  }

  //修改个人信息
  async reviseInfo(reviseInfoData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '修改个人信息成功' };
    var setFail = { code: 40004, message: '修改个人信息失败' };
    var setReviseInfo;
    var updateTime = Date.parse(new Date());
    if(reviseInfoData) {
      setReviseInfo = await app.mysql.update('user', {
        id: reviseInfoData.id, realname: reviseInfoData.realname, sex: reviseInfoData.sex, birth: reviseInfoData.birth, update_time: updateTime,
        identity: reviseInfoData.identity, native_place: reviseInfoData.native_place, phone: reviseInfoData.phone, email: reviseInfoData.email })
      return { result: setSuccess, setReviseInfo }
    }else{
      return { result: setFail }
    }
  }
}

module.exports = AccountService;