const Service = require('egg').Service;
const moment = require('moment').Service;
const crypto = require('crypto');

class AccountService extends Service {
  //用户登录
  async login(username, password, loginToken) {
    const { ctx, app } = this;
    var emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var getAccount;
    var getSuccess = { code: 20000, message: '登录成功，欢迎使用极速简历！' };
    var getFail = { code: 40001, message: '未知错误，请重新登录！' };
    if(emailRule.test(username)) {
      getAccount = await app.mysql.get('frontend_user', { email: username, password: password });
    }else{
      getAccount = await app.mysql.get('frontend_user', { phone: username, password: password });
    }
    if(getAccount) {
      await app.mysql.update('frontend_user', { id: getAccount.id, login_token: loginToken });
      return { result: getSuccess, getAccount };
    }else{
      return { result: getFail };
    }
  }

  //修改个人信息
  async setUserInfo(userInfoData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '修改个人信息成功' };
    var setFail = { code: 40004, message: '修改个人信息失败' };
    var setUserInfo;
    var updateTime = Date.parse(new Date());
    if(userInfoData) {
      setUserInfo = await app.mysql.update('frontend_user', {
        id: userInfoData.id, realname: userInfoData.realname, sex: userInfoData.sex, birth: userInfoData.birth, update_time: updateTime,
        identity: userInfoData.identity, native_place: userInfoData.native_place, phone: userInfoData.phone, email: userInfoData.email })
      return { result: setSuccess, setUserInfo }
    }else{
      return { result: setFail }
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
}

module.exports = AccountService;