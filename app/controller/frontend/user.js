'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const user = await ctx.service.frontend.user.login(username, password);
    ctx.body = user;
  }
}

module.exports = UserController;
