'use strict';

const Controller = require('egg').Controller;

//用户中心
class HomeController extends Controller {
  async default() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { console.log(data.result.code);ctx.redirect('/');ctx.cookies.set('loginToken', '');return false; }
    //获取简历列表
    var getResumeList = await ctx.service.frontend.resume.getResumeList(data.userData.id);
    await ctx.render('frontend/home/index', {
      title: '个人中心 - 极速简历',
      data: JSON.stringify(data),
      avatar: data.userData.avatar, realname: data.userData.realname, identity: data.userData.identity, update_time: data.userData.update_time,
      work_status: data.userData.work_status, work_time: data.userData.work_time, resumeList: getResumeList.resumeList
    })
  }

  async collect() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/');ctx.redirect('/');ctx.cookies.set('loginToken', '');return false; }
    await ctx.render('frontend/home/collect', {
      title: '我的收藏 - 极速简历',
      data: data
    })
  }
}

module.exports = HomeController;