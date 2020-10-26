const Service = require('egg').Service;
const moment = require('moment');

class TemplateService extends Service {

  //行业->模板分类
  async getTemplateHotClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var getTemplateHotClass = await app.mysql.select('frontend_template_hot');
    if(getTemplateHotClass) {
      return { result: getSuccess, getTemplateHotClass }
    }else{
      return { result: getFail }
    }
  }

  //行业->模板分类
  async getTemplateIndustryClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var getTemplateIndustryClass = await app.mysql.select('frontend_template_industry');
    if(getTemplateIndustryClass) {
      return { result: getSuccess, getTemplateIndustryClass }
    }else{
      return { result: getFail }
    }
  }

  //职位->模板分类
  async getTemplatePositionClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var getTemplatePositionClass = await app.mysql.select('frontend_template_position');
    if(getTemplatePositionClass) {
      return { result: getSuccess, getTemplatePositionClass }
    }else{
      return { result: getFail }
    }
  }

  //高校->模板分类
  async getTemplateSchoolClass() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取热门模板分类成功' };
    var getFail = { code: 40004, message: '获取热门模板分类失败' };
    var getTemplateSchoolClass = await app.mysql.select('frontend_template_school');
    if(getTemplateSchoolClass) {
      return { result: getSuccess, getTemplateSchoolClass }
    }else{
      return { result: getFail }
    }
  }

  //获取当前分类URL的数据
  async getTemplateClassData(className) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取当前分类URL数据成功' };
    var getFail = { code: 40004, message: '获取当前分类URL数据失败' };
    var getTemplateClassData1 = await app.mysql.get('frontend_template_hot', { url: className }); //获取热门分类
    var getTemplateClassData2 = await app.mysql.get('frontend_template_industry', { url: className }); //获取行业分类
    var getTemplateClassData3 = await app.mysql.get('frontend_template_position', { url: className }); //获取职位分类
    var getTemplateClassData4 = await app.mysql.get('frontend_template_school', { url: className }); //获取高校分类
    var classNameData;
    if(getTemplateClassData1) {
      classNameData = getTemplateClassData1;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_hot_id: classNameData.id } }) //获取当前的热门分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getTemplateClassData2) {
      classNameData = getTemplateClassData2;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_industry_id: classNameData.id } }) //获取当前的行业分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getTemplateClassData3) {
      classNameData = getTemplateClassData3;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_position_id: classNameData.id } }) //获取当前的职业分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getTemplateClassData4) {
      classNameData = getTemplateClassData4;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_school_id: classNameData.id } }) //获取当前的高校分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else{ return{ result: getFail } }
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