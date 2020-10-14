const Service = require('egg').Service;
const moment = require('moment');

class TokenService extends Service {
  async loginToken(tokenData) {
    const { ctx, app } = this;
    var userData;
    var verifySuccess = { code: 20000, message: '登录成功，欢迎使用极速简历！' };
    var verifyFail = { code: 40001, message: '未知错误，请重新登录！' }
    userData = await app.mysql.get('user', { login_token: tokenData });
    if(userData) {
      if(tokenData !== userData.login_token){
        return { result: verifyFail, userData };
      }else{
        userData.update_time = moment(Number(userData.update_time)).format('YYYY-MM-DD HH:mm:ss')
        return { result: verifySuccess, userData };
      }
    }else{
      return { result: verifyFail, userData };
    }
    
  }
}

module.exports = TokenService;