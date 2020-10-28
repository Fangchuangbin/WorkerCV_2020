'use strict';

const Controller = require('egg').Controller;

//模板控制器
class TemplateController extends Controller {

  //页面->简历模板 -> 首页
  async index() {
    const { ctx } = this;
    var templateHotClass = await ctx.service.frontend.template.getTemplateHotClass();//获取模板分类->行业
    var templateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->行业
    var templatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->职业
    var templateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->高校

    var allTemplateCount = await ctx.service.frontend.template.getAllTemplateCount(); //获取所有模板数量
    var limitNum = 12; //每页模板数量
    var allPageNum = Math.ceil(allTemplateCount.allTemplateCount[0].count / limitNum); //获取所有页码数
    var pageNum = ctx.query.page; //获取当前页码数
    if(pageNum == null) { pageNum = Number(1); } //如为空，则为 1
    var pageTemplateList = await ctx.service.frontend.template.getPageTemplateList(pageNum, limitNum); //获取当前页面模板
    await ctx.render('frontend/template/index', {
      title: '简历模板下载 - 免费求职简历模板 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//当前页面ID
      allPageNum: allPageNum,//所有条数
      hotClass: templateHotClass.templateHotClass, //模板分类 -> 热门
      industryClass: templateIndustryClass.templateIndustryClass, //模板分类 -> 行业
      positionClass: templatePositionClass.templatePositionClass, //模板分类 -> 职位
      schoolClass: templateSchoolClass.templateSchoolClass, //模板分类 -> 高校
      pageTemplateList: pageTemplateList.pageTemplateList, //当前列表页模板
    })
  }

  //页面->简历模板列表 -> 分类
  async list() {
    const { ctx } = this;
    var templateHotClass = await ctx.service.frontend.template.getTemplateHotClass();//获取模板分类->热门
    var templateIndustryClass = await ctx.service.frontend.template.getTemplateIndustryClass();//获取模板分类->热门
    var templatePositionClass = await ctx.service.frontend.template.getTemplatePositionClass();//获取模板分类->热门
    var templateSchoolClass = await ctx.service.frontend.template.getTemplateSchoolClass();//获取模板分类->热门
    var pageNum = ctx.query.page; //获取当前页码数
    if(pageNum == null) { pageNum = Number(1); } //如为空，则为 1
    var templateClassName = ctx.params.templateClassName;//获取当前分类
    var limitNum = 12; //每页模板数量
    var templateClassData = await ctx.service.frontend.template.getTemplateClassData(templateClassName, pageNum, limitNum); //获取当前分类的数据
    if(templateClassData.result.code !== 20000) { return false; }
    var allTemplateCount = Number(templateClassData.allTemplateCount[0].count); //获取所有模板数量
    var allPageNum = Math.ceil(allTemplateCount / limitNum); //获取所有页码数
    
    
    await ctx.render('frontend/template/list', {
      title: templateClassData.templateClassData.tagname + ' - 免费求职简历模板下载 - 极速简历',
      keywords: '简历模板,个人简历,个人简历模板,简历模板免费下载,简历模板下载',
      description: '极速简历WorkerCV提供各行业HR推荐专业简历模板免费下载,包括个人简历模板,大学生简历模板,高薪跳槽简历模板,中英文简历模板等.还有大牛真人简历案例共享,高效制作专业求职简历.',
      pageNum: pageNum,//获取当前页码数
      allPageNum: allPageNum,//获取所有页码数
      hotClass: templateHotClass.templateHotClass, //模板分类 -> 热门
      industryClass: templateIndustryClass.templateIndustryClass, //模板分类 -> 热门
      positionClass: templatePositionClass.templatePositionClass, //模板分类 -> 职位
      schoolClass: templateSchoolClass.templateSchoolClass, //模板分类 -> 高校
      templateClassData: templateClassData.templateClassData, //当前模板分类信息
      templateData: templateClassData.templateData, //当前分类的模板列表
    })
  }
  
  //页面->简历模板 -> 详情
  async item() {
    const { ctx } = this;
    var templateData = ctx.params;
    var templateItem = await ctx.service.frontend.template.getTemplateItem(templateData);//获取简历模板详情数据
    var recommendTemplateList = await ctx.service.frontend.template.getRecommendTemplateList();//获取相似简历推荐数据列表
    if(templateItem.result.code === 20000) {
      await ctx.render('frontend/template/item', {
        title: '免费简历模板下载 - 极速简历',
        templateData: templateItem.templateItem,//当前简历模板详情小叔
        recommendTemplateList: recommendTemplateList.recommendTemplateList,//获取相似简历推荐数据列表
      })
    }else{
      return false;
    }
    
  }

}

module.exports = TemplateController;