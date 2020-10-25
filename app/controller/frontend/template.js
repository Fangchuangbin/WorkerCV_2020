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
    var getAllTemplateCount = await ctx.service.frontend.template.getAllTemplateCount(); //获取所有模板数量
    var allPageNum = Math.ceil(getAllTemplateCount.getAllTemplateCount[0].count / 4); //获取当前页数
    await ctx.render('frontend/template/index', {
      title: '简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//当前页面ID
      allPageNum: allPageNum,//所有条数
      industryClass: getTemplateIndustryClass.getTemplateIndustryClass, //模板分类 -> 热门
      positionClass: getTemplatePositionClass.getTemplatePositionClass, //模板分类 -> 职位
      schoolClass: getTemplateSchoolClass.getTemplateSchoolClass, //模板分类 -> 高校
    })
  }

  //页面->简历模板列表->分类
  async templateList() {
    const { ctx } = this;
    var className = ctx.params.className;//获取当前分类url
    var pageNum = ctx.query.page;//获取当前分页ID
    var getTemplateHotClass = await ctx.service.frontend.template.getTemplateHotClass();//获取模板分类->热门
    var getTemplateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->热门
    var getTemplatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->热门
    var getTemplateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->热门
    var getClassNameData = await ctx.service.frontend.template.getClassNameData(className); //获取当前分类的列表数据
    await ctx.render('frontend/template/list', {
      title: '大学生简历模板下载 - 简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      className: '北京大学',
      pageNum: pageNum,//当前页面ID
      allPageNum: 76,//所有页面数
      hotClass: getTemplateHotClass.getTemplateHotClass, //模板分类 -> 热门
      industryClass: getTemplateIndustryClass.getTemplateIndustryClass, //模板分类 -> 热门
      positionClass: getTemplatePositionClass.getTemplatePositionClass, //模板分类 -> 职位
      schoolClass: getTemplateSchoolClass.getTemplateSchoolClass, //模板分类 -> 高校
      classNameData: getClassNameData.classNameData, //当前分类URL的数据
      classData: getClassNameData.getClassData, //当前分类的列表数据
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