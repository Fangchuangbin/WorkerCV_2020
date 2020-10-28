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
    var getSuccess = { code: 20000, message: '获取职位模板分类成功' };
    var getFail = { code: 40004, message: '获取职位模板分类失败' };
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

  //获取所有模板数量
  async getAllTemplateCount() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取模板数量成功' };
    var getFail = { code: 40004, message: '获取模板数量失败' };
    var allTemplateCount = await app.mysql.query('select count(*) as count from `frontend_template`');
    if(allTemplateCount) {
      return { result: getSuccess, allTemplateCount }
    }else{
      return { result: getFail }
    }
  }

  //获取当前页模板列表->1级 => /template/
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

  //获取当前分类所有子分类名称 + 子分类模板列表数据 => /template/:templateClassName/
  async getTemplateClassData(className, pageNum, limitNum) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取当前分类所有子分类数据成功' };
    var getFail = { code: 40004, message: '获取当前分类所有子分类数据失败' };
    var templateClassData1 = await app.mysql.get('frontend_template_hot', { url: className }); //获取热门分类
    var templateClassData2 = await app.mysql.get('frontend_template_industry', { url: className }); //获取行业分类
    var templateClassData3 = await app.mysql.get('frontend_template_position', { url: className }); //获取职位分类
    var templateClassData4 = await app.mysql.get('frontend_template_school', { url: className }); //获取高校分类
    var templateClassData; //公共分类名称数据
    var sheetName; //公共查询的表名数据
    if(templateClassData1) {
      sheetName = 'template_hot_id'; templateClassData = templateClassData1; //热门
    }else if(templateClassData2) {
      sheetName = 'template_industry_id'; templateClassData = templateClassData2; //行业
    }else if(templateClassData3) {
      sheetName = 'template_position_id'; templateClassData = templateClassData3; //职位
    }else if(templateClassData4) {
      sheetName = 'template_school_id'; templateClassData = templateClassData4; //高校
    }else{ return { result: getFail } }
    var offsetNum = ( pageNum - 1 ) * limitNum; //数据偏移量
    if(templateClassData) {
      var allTemplateCount = await app.mysql.query('select count(*) as count from `frontend_template` where `' + sheetName + '` = ' + templateClassData.id);//获取当前分类的模板数量
      var templateData = await app.mysql.query('select * from `frontend_template` where `' + sheetName + '` = ' + templateClassData.id + ' order by `template_id` desc limit ' + offsetNum + ',' + limitNum);//获取当前分类的模板数据
      if(templateData) {
        for (let i = 0; i < templateData.length; i++) { templateData[i].update_time = moment(Number(templateData[i].update_time)).format('YYYY-MM-DD HH:mm:ss') }
      }
      return{ result: getSuccess, templateClassData, templateData, allTemplateCount }
    }else{ return { result: getFail } }
  }

  //获取简历模板详情数据
  async getTemplateItem(templateData) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取简历模板详情数据成功' };
    var getFail = { code: 40004, message: '获取简历模板详情数据失败' };
    var templateItem = await app.mysql.get('frontend_template', { template_id: templateData.templateId });//获取简历模板详情数据
    if(templateItem) {
      templateItem.update_time = moment(Number(templateItem.update_time)).format('YYYY-MM-DD HH:mm:ss')
      return { result: getSuccess, templateItem }
    }else{
      return { result: getFail }
    }
  }
  
  //获取相似简历推荐数据列表
  async getRecommendTemplateList() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取相似简历推荐数据成功' };
    var getFail = { code: 40004, message: '获取相似简历推荐数据失败' };
    var recommendTemplateList = await app.mysql.select('frontend_template');
    if(recommendTemplateList) {
      return { result: getSuccess, recommendTemplateList }
    }else{
      return { result: getFail }
    }
  }

}

module.exports = TemplateService;