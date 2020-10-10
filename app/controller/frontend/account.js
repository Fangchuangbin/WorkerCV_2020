'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

class AccountController extends Controller {
  async login() {
    const { ctx } = this;
    var verifySuccess = { code: 20000, message: '已登录，欢迎使用极速简历！' };
    var verifyFail = { code: 40001, message: '已超时，请重新登录！' };
    var username = ctx.request.body.username;
    var password = crypto.createHash('md5').update(ctx.request.body.password).digest('hex');
    var tokenData = Buffer.from(crypto.createHash('sha1').update(username).digest('hex')).toString('base64');
    //const password = Buffer.from(ctx.request.body.password).toString('base64');
    var data = await ctx.service.frontend.account.login(username, password, tokenData);
    //ctx.set('Authorization', data.setToken);
    if(data){
      ctx.cookies.set('loginToken', tokenData);
      ctx.body = data;
    }else{
      ctx.body = data;
    }
    
  }
}

module.exports = AccountController;
