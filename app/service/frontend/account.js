const Service = require('egg').Service;

class AccountService extends Service {
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
}

module.exports = AccountService;