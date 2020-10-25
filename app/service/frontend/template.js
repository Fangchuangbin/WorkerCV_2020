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
  async getClassNameData(className) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取当前分类URL数据成功' };
    var getFail = { code: 40004, message: '获取当前分类URL数据失败' };
    var getClassNameData1 = await app.mysql.get('frontend_template_hot', { url: className }); //获取热门分类
    var getClassNameData2 = await app.mysql.get('frontend_template_industry', { url: className }); //获取行业分类
    var getClassNameData3 = await app.mysql.get('frontend_template_position', { url: className }); //获取职位分类
    var getClassNameData4 = await app.mysql.get('frontend_template_school', { url: className }); //获取高校分类
    var classNameData;
    if(getClassNameData1) {
      classNameData = getClassNameData1;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_hot_id: classNameData.id } }) //获取当前的热门分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getClassNameData2) {
      classNameData = getClassNameData2;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_industry_id: classNameData.id } }) //获取当前的行业分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getClassNameData3) {
      classNameData = getClassNameData3;
      var getClassData = await app.mysql.select('frontend_template', { orders: [['update_time','desc']], where: { template_position_id: classNameData.id } }) //获取当前的职业分类数据
      if(getClassData) {
        for (let i = 0; i < getClassData.length; i++) { getClassData[i].update_time = moment(Number(getClassData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, classNameData, getClassData }
    }else if(getClassNameData4) {
      classNameData = getClassNameData4;
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
    var getSuccess = { code: 20000, message: '获取数据成功' };
    var getFail = { code: 40004, message: '获取数据失败' };
    var getAllTemplateCount = await app.mysql.query('select count(*) as count from frontend_template');
    if(getAllTemplateCount) {
      return { result: getSuccess, getAllTemplateCount }
    }else{
      return { result: getFail }
    }
  }
}

module.exports = TemplateService;