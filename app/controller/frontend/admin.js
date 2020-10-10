'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async default() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    ctx.body = data;
  }
}

module.exports = AdminController;