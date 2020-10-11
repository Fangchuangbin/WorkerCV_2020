'use strict';

const { jsonp } = require('../../../config/plugin');

const Controller = require('egg').Controller;

//用户中心
class HomeController extends Controller {
  async default() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/'); }
    await ctx.render('frontend/home/index', {
      title: '个人中心 - 极速简历',
      data: JSON.stringify(data),
      avatar: data.userData.avatar, realname: data.userData.realname, education: data.userData.education, school: data.userData.school, update_time: data.userData.update_time,
      work_status: data.userData.work_status
    })
  }

  async collect() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/'); }
    await ctx.render('frontend/home/collect', {
      title: '我的收藏 - 极速简历',
      data: data
    })
  }
}

module.exports = HomeController;