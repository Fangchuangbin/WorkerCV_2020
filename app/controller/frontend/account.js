'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

//用户控制器
class AccountController extends Controller {
  //接口->用户登录
  async getUser() {
    const { ctx } = this;
    var userData = ctx.request.body;
    var tokenData = Buffer.from(crypto.createHash('sha1').update(userData.username).digest('hex') + new Date().getTime()).toString('base64');
    var getUser = await ctx.service.frontend.account.getUser(userData, tokenData);
    if(getUser.result.code == 20000) { ctx.cookies.set('loginToken', tokenData, { httpOnly: false, maxAge: 259200000 }); }
    ctx.body = getUser;
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

  //接口->更换个人头像
  async changeAvatar() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var fileStream = await ctx.getFileStream();
    var changeAvatar = await ctx.service.frontend.account.changeAvatar(fileStream, loginTokenData);
    ctx.body = changeAvatar;
  }

  //接口->注册用户
  async registerAccount() {
    const { ctx } = this;
    var registerAccountData = ctx.request.body;
    var registerAccount = await ctx.service.frontend.account.registerAccount(registerAccountData);
    ctx.body = registerAccount;
  }

  //接口->修改密码
  async modifyPassword() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var passwordData = ctx.request.body;
    var modifyPassword = await ctx.service.frontend.account.modifyPassword(passwordData, loginTokenData);
    ctx.body = modifyPassword;
  }

  //接口->设置密保
  async setSecurity() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var securityData = ctx.request.body;
    var setSecurity = await ctx.service.frontend.account.setSecurity(securityData, loginTokenData);
    ctx.body = setSecurity;
  }

  //接口->忘记密码
  async resetPassword() {
    const { ctx } = this;
    var resetData = ctx.request.body;
    var resetPassword = await ctx.service.frontend.account.resetPassword(resetData);
    ctx.body = resetPassword;
  }

  //接口->忘记密码->设置新密码
  async resetNewPassword() {
    const { ctx } = this;
    var resetNewData = ctx.request.body;
    var resetNewPassword = await ctx.service.frontend.account.resetNewPassword(resetNewData);
    ctx.body = resetNewPassword;
  }
}

module.exports = AccountController;