'use strict';

const Controller = require('egg').Controller;

//模板控制器
class TemplateController extends Controller {

  //页面->简历模板列表
  async default() {
    const { ctx } = this;
    var pageNum = ctx.query.page;
    var getTemplateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->热门
    var getTemplatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->热门
    var getTemplateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->热门
    await ctx.render('frontend/template/index', {
      title: '简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//当前页面ID
      allPageNum: 76,//所有页面数,
      IndustryClass: getTemplateIndustryClass.getTemplateIndustryClass, //模板分类 -> 热门
      PositionClass: getTemplatePositionClass.getTemplatePositionClass, //模板分类 -> 职位
      SchoolClass: getTemplateSchoolClass.getTemplateSchoolClass, //模板分类 -> 高校
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
      className: 'PHP开发工程师',
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

}

module.exports = TemplateController;