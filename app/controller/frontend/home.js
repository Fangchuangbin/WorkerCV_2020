'use strict';

const Controller = require('egg').Controller;

//用户中心
class HomeController extends Controller {

  //页面->用户中心首页
  async index() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    //获取用户简历列表
    var getResumeList = await ctx.service.frontend.resume.getResumeList(loginTokenData.userData.id);

    //获取所有简历模板列表
    var getResumeTemplateList = await ctx.service.frontend.resume.getResumeTemplateList();
    await ctx.render('frontend/home/index', {
      title: '个人中心 - 极速简历',
      id: loginTokenData.userData.id, //用户Id
      type: loginTokenData.userData.type, //用户Id
      avatar: loginTokenData.userData.avatar, //头像
      realname: loginTokenData.userData.realname, //姓名
      identity: loginTokenData.userData.identity, //身份
      update_time: loginTokenData.userData.update_time, //更新时间
      work_status: loginTokenData.userData.work_status, //工作状态
      sex: loginTokenData.userData.sex, //性别
      birth: loginTokenData.userData.birth, //出生日期
      native_place: loginTokenData.userData.native_place, //籍贯
      phone: loginTokenData.userData.phone, //联系电话
      email: loginTokenData.userData.email, //电子邮箱
      resumeList: getResumeList.resumeList, //用户简历列表
      resumeTemplateList: getResumeTemplateList.resumeTemplateListData //简历模板列表
    })
  }

  //页面->我的收藏
  async collect() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/'); ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    await ctx.render('frontend/home/collect', {
      title: '我的收藏 - 极速简历',
      data: data
    })
  }

  //页面->账户设置
  async settings() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/'); ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    await ctx.render('frontend/home/settings', {
      title: '账户设置 - 极速简历',
      data: data
    })
  }
}

module.exports = HomeController;