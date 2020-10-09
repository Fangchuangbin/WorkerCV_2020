'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async login() {
    const { ctx } = this;
    const username = ctx.request.body.username;
    const password = Buffer.from(ctx.request.body.password).toString('base64');
    const csrfToken = ctx.request.body.csrfToken;
    ctx.cookies.set('fcb', 'fcb1212');
    console.log(ctx.cookies.get('fcb'));
    const response = await ctx.service.frontend.account.login(username, password, csrfToken);
    ctx.body = response;
  }
}

module.exports = AccountController;
