'use strict';

const Controller = require('egg').Controller;

//模板控制器
class TemplateController extends Controller {

  //页面->简历模板列表
  async index() {
    const { ctx } = this;
    var getTemplateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->热门
    var getTemplatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->热门
    var getTemplateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->热门

    var allTemplateCount = await ctx.service.frontend.template.getAllTemplateCount(); //获取所有模板数量
    var limitNum = 5; //每页模板数量
    var allPageNum = Math.ceil(allTemplateCount.allTemplateCount[0].count / limitNum); //获取所有页码数
    var pageNum = ctx.query.page; //获取当前页码数
    if(pageNum == null) { pageNum = Number(1); } //如为空，则为 1
    var pageTemplateList = await ctx.service.frontend.template.getPageTemplateList(pageNum, limitNum); //获取当前页面模板
    //console.log(pageTemplateList);
    await ctx.render('frontend/template/index', {
      title: '简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//当前页面ID
      allPageNum: allPageNum,//所有条数
      industryClass: getTemplateIndustryClass.getTemplateIndustryClass, //模板分类 -> 热门
      positionClass: getTemplatePositionClass.getTemplatePositionClass, //模板分类 -> 职位
      schoolClass: getTemplateSchoolClass.getTemplateSchoolClass, //模板分类 -> 高校
      pageTemplateList: pageTemplateList.pageTemplateList, //当前列表页模板
    })
  }

  //页面->简历模板列表->分类
  async templateList() {
    const { ctx } = this;
    var templateClassName = ctx.params.templateClassName;//获取当前分类
    var pageNum = ctx.query.page;//获取当前分页ID
    var templateHotClass = await ctx.service.frontend.template.getTemplateHotClass();//获取模板分类->热门
    var templateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->热门
    var templatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->热门
    var templateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->热门

    var templateClassData = await ctx.service.frontend.template.getTemplateClassData(templateClassName); //获取当前分类的列表数据
    await ctx.render('frontend/template/list', {
      title: '大学生简历模板下载 - 简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      className: '北京大学',
      pageNum: pageNum,//当前页面ID
      allPageNum: 76,//所有页面数
      hotClass: templateHotClass.getTemplateHotClass, //模板分类 -> 热门
      industryClass: templateIndustryClass.getTemplateIndustryClass, //模板分类 -> 热门
      positionClass: templatePositionClass.getTemplatePositionClass, //模板分类 -> 职位
      schoolClass: templateSchoolClass.getTemplateSchoolClass, //模板分类 -> 高校
      classNameData: templateClassData.classNameData, //当前分类URL的数据
      classData: templateClassData.getClassData, //当前分类的列表数据
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