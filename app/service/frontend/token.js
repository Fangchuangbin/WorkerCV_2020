const Service = require('egg').Service;

class TokenService extends Service {
  async loginToken(tokenData) {
    const { ctx, app } = this;
    var userData;
    var verifySuccess = { code: 20000, message: '已登录，欢迎使用极速简历！' };
    var verifyFail = { code: 40001, message: '已超时，请重新登录！' }
    if(tokenData == null) {
      return { result: verifyFail };
    }else{
      userData = await app.mysql.get('user', { login_token: tokenData });
      if(tokenData == userData.login_token){
        return { result: verifySuccess, userData };
      }else{
        return { result: verifyFail };
      }
    }
  }
}

module.exports = TokenService;