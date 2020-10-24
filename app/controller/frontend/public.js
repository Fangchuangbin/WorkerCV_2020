'use strict';

const Controller = require('egg').Controller;

//公共控制器
class PublicController extends Controller {
  //页面->网站首页
  async default() {
    const { ctx } = this;
    var getResumeTemplateList = await ctx.service.frontend.resume.getResumeTemplateList();
    await ctx.render('frontend/index', {
      title: '极速简历WorkerCV - 智能简历制作工具,免费简历模板下载,应届生求职简历模板',
      keywords: '求职简历,极速简历,简历模板下载,免费简历模板',
      description: '极速简历WorkerCV提供各行业求职简历模板免费下载和求职简历范文参考,是一个专业的智能简历制作工具.还有智能简历优化建议和求职简历定制服务,以及大量简历制作攻略和职场攻略.',
      resumeTemplateList: getResumeTemplateList.resumeTemplateListData,
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

 
}

module.exports = PublicController;
