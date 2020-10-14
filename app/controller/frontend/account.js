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
    var verifyAccountData = await ctx.service.frontend.account.login(username, password, tokenData);
    if(verifyAccountData.result.code == 20000){
      ctx.cookies.set('loginToken', tokenData, {
        httpOnly: false,
        maxAge: 259200000
      });
    }
    ctx.body = verifyAccountData;
  }

  //接口->修改个人信息
  async setUserInfo() {
    const { ctx } = this;
    var userInfoData = ctx.request.body;
    var setUserInfoData = await ctx.service.frontend.account.setUserInfo(userInfoData);
    ctx.body = setUserInfoData;
  }
}

module.exports = AccountController;