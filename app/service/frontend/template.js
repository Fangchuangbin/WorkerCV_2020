const Service = require('egg').Service;
const moment = require('moment');

class TemplateService extends Service {

  //行业->模板分类
  async getTemplateHotClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var templateHotClass = await app.mysql.select('frontend_template_hot', { orders: [['id', 'desc']] });
    if(templateHotClass) {
      return { result: getSuccess, templateHotClass }
    }else{
      return { result: getFail }
    }
  }
  

  //行业->模板分类
  async getTemplateIndustryClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var templateIndustryClass = await app.mysql.select('frontend_template_industry');
    if(templateIndustryClass) {
      return { result: getSuccess, templateIndustryClass }
    }else{
      return { result: getFail }
    }
  }

  //职位->模板分类
  async getTemplatePositionClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var templatePositionClass = await app.mysql.select('frontend_template_position');
    if(templatePositionClass) {
      return { result: getSuccess, templatePositionClass }
    }else{
      return { result: getFail }
    }
  }

  //高校->模板分类
  async getTemplateSchoolClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var templateSchoolClass = await app.mysql.select('frontend_template_school');
    if(templateSchoolClass) {
      return { result: getSuccess, templateSchoolClass }
    }else{
      return { result: getFail }
    }
  }

  //获取当前分类URL的数据
  async getTemplateClassData(className) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取当前分类URL数据成功' };
    var getFail = { code: 40004, message: '获取当前分类URL数据失败' };
    var templateClassData1 = await app.mysql.get('frontend_template_hot', { url: className }); //获取热门分类
    var templateClassData2 = await app.mysql.get('frontend_template_industry', { url: className }); //获取行业分类
    var templateClassData3 = await app.mysql.get('frontend_template_position', { url: className }); //获取职位分类
    var templateClassData4 = await app.mysql.get('frontend_template_school', { url: className }); //获取高校分类
    var templateClassData; //公共分类变量
    if(templateClassData1) {
      templateClassData = templateClassData1;
      var templateData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_hot_id: templateClassData.id } }) //获取当前的热门分类数据
      if(templateData) {
        for (let i = 0; i < templateData.length; i++) { templateData[i].update_time = moment(Number(templateData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, templateClassData, templateData }
    }else if(templateClassData2) {
      templateClassData = templateClassData2;
      var templateData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_industry_id: templateClassData.id } }) //获取当前的行业分类数据
      if(templateData) {
        for (let i = 0; i < templateData.length; i++) { templateData[i].update_time = moment(Number(templateData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, templateClassData, templateData }
    }else if(templateClassData3) {
      templateClassData = templateClassData3;
      var templateData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_position_id: templateClassData.id } }) //获取当前的职业分类数据
      if(templateData) {
        for (let i = 0; i < templateData.length; i++) { templateData[i].update_time = moment(Number(templateData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, templateClassData, templateData }
    }else if(templateClassData4) {
      templateClassData = templateClassData4;
      var templateData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_school_id: templateClassData.id } }) //获取当前的高校分类数据
      if(templateData) {
        for (let i = 0; i < templateData.length; i++) { templateData[i].update_time = moment(Number(templateData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, templateClassData, templateData }
    }else{ return { result: getFail } }
  }

  //获取所有模板数量
  async getAllTemplateCount() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取模板数量成功' };
    var getFail = { code: 40004, message: '获取模板数量失败' };
    var allTemplateCount = await app.mysql.query('select count(*) as count from frontend_template');
    if(allTemplateCount) {
      return { result: getSuccess, allTemplateCount }
    }else{
      return { result: getFail }
    }
  }

  //获取当前页模板列表
  async getPageTemplateList(pageNum, limitNum) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取模板列表成功' };
    var getFail = { code: 40004, message: '获取模板列表失败' };
    var offsetNum = ( pageNum - 1 ) * limitNum;
    var pageTemplateList = await app.mysql.select('frontend_template', { orders: [ ['template_id', 'desc'] ], limit: limitNum, offset: offsetNum })
    if(pageTemplateList) {
      return { result: getSuccess, pageTemplateList }
    }else{
      return { result: getFail }
    }
  }
}

module.exports = TemplateService;