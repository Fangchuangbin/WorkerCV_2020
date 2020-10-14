'use strict';

const Controller = require('egg').Controller;

//用户中心
class HomeController extends Controller {

  //用户中心首页
  async index() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { console.log(data.result.code);ctx.redirect('/');ctx.cookies.set('loginToken', '');return false; }
    //获取简历列表
    var getResumeList = await ctx.service.frontend.resume.getResumeList(data.userData.id);
    await ctx.render('frontend/home/index', {
      title: '个人中心 - 极速简历',
      data: JSON.stringify(data),
      id: data.userData.id, //用户Id
      avatar: data.userData.avatar, //头像
      realname: data.userData.realname, //姓名
      identity: data.userData.identity, //身份
      update_time: data.userData.update_time, //更新时间
      work_status: data.userData.work_status, //工作状态
      sex: data.userData.sex, //性别
      birth: data.userData.birth, //出生日期
      native_place: data.userData.native_place, //籍贯
      phone: data.userData.phone, //联系电话
      email: data.userData.email, //电子邮箱
      resumeList: getResumeList.resumeList, //简历列表 
    })
  }

  //我的收藏
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