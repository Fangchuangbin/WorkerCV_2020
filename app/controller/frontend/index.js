'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');

//首页控制器
class IndexController extends Controller {
  
  //页面->网站首页
  async index() {
    const { ctx } = this;
    var resumeTemplateList = await ctx.service.frontend.index.getResumeTemplateList();
    await ctx.render('frontend/index', {
      title: '极速简历WorkerCV - 智能简历制作工具,免费简历模板下载,应届生求职简历模板',
      keywords: '求职简历,极速简历,简历模板下载,免费简历模板',
      description: '极速简历WorkerCV提供各行业求职简历模板免费下载和求职简历范文参考,是一个专业的智能简历制作工具.还有智能简历优化建议和求职简历定制服务,以及大量简历制作攻略和职场攻略.',
      resumeTemplateList: resumeTemplateList.resumeTemplateListData,
    });
  }

  //页面->简历优化
  async optimize() {
    const { ctx } = this;
    ctx.body = { optimize: true }
  }

  //页面->简历定制
  async custom() {
    const { ctx } = this;
    ctx.body = { custom: true }
  }

  //页面->简历优化
  async article() {
    const { ctx } = this;
    ctx.body = { article: true }
  }

  //接口->用户登录
  async login() {
    const { ctx } = this;
    var userData = ctx.request.body;
    var tokenData = Buffer.from(crypto.createHash('sha1').update(userData.username).digest('hex') + new Date().getTime()).toString('base64');
    var getUser = await ctx.service.frontend.index.login(userData, tokenData);
    if(getUser.result.code == 20000) { ctx.cookies.set('loginToken', tokenData, { httpOnly: false, maxAge: 259200000 }); }
    ctx.body = getUser;
  }

  //接口->注册用户
  async register() {
    const { ctx } = this;
    var registerData = ctx.request.body;
    var setRegister = await ctx.service.frontend.index.register(registerData);
    ctx.body = setRegister; 
  }

  //接口->忘记密码
  async forgetPassword() {
    const { ctx } = this;
    var resetData = ctx.request.body;
    var forgetPassword = await ctx.service.frontend.index.forgetPassword(resetData);
    ctx.body = forgetPassword;
  }

  //接口->忘记密码->设置新密码
  async resetNewPassword() {
    const { ctx } = this;
    var resetNewData = ctx.request.body;
    var resetNewPassword = await ctx.service.frontend.index.resetNewPassword(resetNewData);
    ctx.body = resetNewPassword;
  }
 
}

module.exports = IndexController;