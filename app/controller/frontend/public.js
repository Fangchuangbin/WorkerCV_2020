'use strict';

const Controller = require('egg').Controller;

//公共控制器
class PublicController extends Controller {
  //页面->网站首页
  async index() {
    const { ctx } = this;
    var getResumeTemplateList = await ctx.service.frontend.resume.getResumeTemplateList();
    await ctx.render('frontend/index', {
      title: '极速简历WorkerCV - 智能简历制作工具,免费简历模板下载,应届生求职简历模板',
      keywords: '求职简历,极速简历,简历模板下载,免费简历模板',
      description: '极速简历WorkerCV提供各行业求职简历模板免费下载和求职简历范文参考,是一个专业的智能简历制作工具.还有智能简历优化建议和求职简历定制服务,以及大量简历制作攻略和职场攻略.',
      resumeTemplateList: getResumeTemplateList.resumeTemplateListData,
    });
  }

  //页面->简历模板列表
  async template() {
    const { ctx } = this;
    var pageNum = ctx.query.page;
    await ctx.render('frontend/template/index', {
      title: '简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//当前页面ID
      allPageNum: 76,//所有页面数
    })
  }

  //页面->简历模板列表->分类
  async templateList() {
    const { ctx } = this;
    var templateData = ctx.params;
    var pageNum = ctx.query.page;
    await ctx.render('frontend/template/list', {
      title: '大学生简历模板下载 - 简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      data: JSON.stringify(templateData),
      className: 'Web前端开发工程师',
      pageNum: pageNum,//当前页面ID
      allPageNum: 76,//所有页面数
    })
  }
  
  //页面->简历模板详情
  async templateItem() {
    const { ctx } = this;
    var templateData = ctx.params;
    await ctx.render('frontend/template/item', {
      title: '详情内容 - 简历模板 - 极速简历',
      keywords: '求职简历,极速简历,简历模板下载,免费简历模板',
      description: '极速简历WorkerCV提供各行业求职简历模板免费下载和求职简历范文参考,是一个专业的智能简历制作工具.还有智能简历优化建议和求职简历定制服务,以及大量简历制作攻略和职场攻略.',
      data: JSON.stringify(templateData)
    })
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
