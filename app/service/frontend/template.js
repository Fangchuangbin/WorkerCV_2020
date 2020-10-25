const Service = require('egg').Service;
const moment = require('moment');

class TemplateService extends Service {
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
}

module.exports = TemplateService;