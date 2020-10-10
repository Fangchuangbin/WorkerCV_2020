const Service = require('egg').Service;
const crypto = require('crypto');

class TokenService extends Service {
  async loginToken(userId) {
    const { ctx, app } = this;
    var userData;
    var tokenData = ctx.cookies.get('loginToken');
    var verifySuccess = {
      code: 20000,
      message: '已登录，欢迎使用极速简历！'
    };
    var verifyFail = {
      code: 40001,
      message: '已超时，请重新登录！'
    }
    userData = await app.mysql.get('user', { id: userId });
    if(tokenData == userData.login_token){
      return {
        result: verifySuccess,
        userData
      };
    }else{
      return {
        result: verifyFail
      };
    }
  }
}

module.exports = TokenService;