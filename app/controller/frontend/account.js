'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

//用户控制器
class AccountController extends Controller {
  //接口->用户登录
  async getUser() {
    const { ctx } = this;
    var username = ctx.request.body.username;
    var password = crypto.createHash('md5').update(ctx.request.body.password).digest('hex');
    var tokenData = Buffer.from(crypto.createHash('sha1').update(username).digest('hex') + new Date().getTime()).toString('base64');
    var userData = await ctx.service.frontend.account.login(username, password, tokenData);
    if(userData.result.code == 20000) { ctx.cookies.set('loginToken', tokenData, { httpOnly: false, maxAge: 259200000 }); }
    ctx.body = userData;
  }

  //接口->修改个人信息
  async setUserInfo() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    
    var userInfoData = ctx.request.body;
    var setUserInfoData = await ctx.service.frontend.account.setUserInfo(userInfoData);
    ctx.body = setUserInfoData;
  }

  //接口->注册用户
  async registerAccount() {
    const { ctx } = this;
    var registerAccountData = ctx.request.body;
    var registerAccount = await ctx.service.frontend.account.registerAccount(registerAccountData);
    ctx.body = registerAccount;
  }
}

module.exports = AccountController;