const Service = require('egg').Service;
const crypto = require('crypto');

class IndexService extends Service {

  //首页获取12条简历模板列表
  async getResumeTemplateList() {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取简历模板成功' };
    var getFail = { code: 40004, message: '获取简历模板失败' };
    var resumeTemplateListData = await app.mysql.select('frontend_template', { limit: 12, orders: [['template_id', 'desc']] })
    if(resumeTemplateListData) {
      return { result: getSuccess, resumeTemplateListData }
    }else{
      return { result: getFail }
    }
  }
  
  //用户登录
  async login(userData, loginToken) {
    const { ctx, app } = this;
    var emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var getUser;
    var getSuccess = { code: 20000, message: '登录成功，欢迎使用极速简历！' };
    var getFail = { code: 40001, message: '未知错误，请重新登录！' };
    var username = userData.username;
    var password = crypto.createHash('md5').update(userData.password).digest('hex');
    if(emailRule.test(username)) {
      getUser = await app.mysql.get('frontend_user', { email: username, password: password });
    }else{
      getUser = await app.mysql.get('frontend_user', { phone: username, password: password });
    }
    if(getUser) {
      await app.mysql.update('frontend_user', { id: getUser.id, login_token: loginToken });
      return { result: getSuccess, getUser };
    }else{ return { result: getFail }; }
  }

  //注册用户
  async register(registerData) {
    const { ctx, app } = this;
    var registerSuccess = { code: 20000, message: '注册用户成功' };
    var registerFail = { code: 40004, message: '注册用户失败' };
    var updateTime = Date.parse(new Date());
    var password = crypto.createHash('md5').update(registerData.password).digest('hex');
    var setRegister = await app.mysql.insert('frontend_user', { phone: registerData.phone, realname: registerData.realname, email: registerData.email, password: password, update_time: updateTime, vip: 0, avatar: '/frontend/images/account-img.png' })
    if(setRegister.affectedRows === 1) {
      return { result: registerSuccess, setRegister }
    }else{
      return { result: registerFail }
    }
  }

  //忘记密码
  async forgetPassword(resetData) {
    const { ctx, app } = this;
    var resetSuccess = { code: 20000, message: '重置密码成功' };
    var resetFail = { code: 40004, message: '重置密码失败' };
    var forgetPassword = await app.mysql.get('frontend_user', { realname: resetData.realname, email: resetData.email, question: resetData.resetQuestion, answer: resetData.resetAnswer }, { where: { phone: resetData.phone } })
    if(forgetPassword) {
      return { result: resetSuccess, forgetPassword }
    }else{
      return { result: resetFail }
    }
  }
  
  //忘记密码->设置新密码
  async resetNewPassword(resetNewData) {
    const { ctx, app } = this;
    var resetNewSuccess = { code: 20000, message: '重置密码成功' };
    var resetNewFail = { code: 40004, message: '重置密码失败' };
    var newPassword = crypto.createHash('md5').update(resetNewData.newPassword).digest('hex');
    var resetNewPassword = await app.mysql.update('frontend_user', { password: newPassword }, { where: { id: resetNewData.userId, password: resetNewData.nowPassword } });
    if(resetNewPassword.affectedRows === 1) {
      return { result: resetNewSuccess, resetNewPassword }
    }else{
      return { result: resetNewFail }
    }
  }
}

module.exports = IndexService;