'use strict';

const Controller = require('egg').Controller;

//用户中心
class HomeController extends Controller {
  async default() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code == 20000) {
      await ctx.render('frontend/home', {
        title: '个人中心 - 极速简历',
        data: JSON.stringify(data)
      })
    }else{
      ctx.redirect('/');
    }
  }
}

module.exports = HomeController;