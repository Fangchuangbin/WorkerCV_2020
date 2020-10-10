'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async login() {
    const { ctx } = this;
    const username = ctx.request.body.username;
    const password = Buffer.from(ctx.request.body.password).toString('base64');
    const response = await ctx.service.frontend.account.login(username, password);
    ctx.body = response;
  }
}

module.exports = AccountController;
