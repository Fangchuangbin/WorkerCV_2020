'use strict';

const Controller = require('egg').Controller;

//用户控制器
class HomeController extends Controller {

  //页面->用户中心首页
  async index() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    //if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    var userResumeList = await ctx.service.frontend.home.getResumeList(loginTokenData.userData.id); //获取用户简历列表
    var resumeTemplateList = await ctx.service.frontend.home.getResumeTemplateList(); //获取12条简历模板列表

    await ctx.render('frontend/home/index', {
      title: '个人中心 - 极速简历',
      id: loginTokenData.userData.id, //用户Id
      vip: loginTokenData.userData.vip, //用户Id
      avatar: loginTokenData.userData.avatar, //头像
      realname: loginTokenData.userData.realname, //姓名
      identity: loginTokenData.userData.identity, //身份
      update_time: loginTokenData.userData.update_time, //更新时间
      work_status: loginTokenData.userData.work_status, //工作状态
      sex: loginTokenData.userData.sex, //性别
      birth: loginTokenData.userData.birth, //出生日期
      native_place: loginTokenData.userData.native_place, //籍贯
      phone: loginTokenData.userData.phone, //联系电话
      email: loginTokenData.userData.email, //电子邮箱
      resumeList: userResumeList.resumeList, //用户简历列表
      resumeTemplateList: resumeTemplateList.resumeTemplateListData //简历模板列表
    })
  }

  //页面->我的收藏
  async collect() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var data = await ctx.service.frontend.token.loginToken(tokenData);
    if(data.result.code !== 20000) { ctx.redirect('/'); ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    await ctx.render('frontend/home/collect', {
      title: '我的收藏 - 极速简历',
      data: data
    })
  }

  //页面->账户设置
  async settings() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    await ctx.render('frontend/home/settings', {
      title: '账户设置 - 极速简历',
      data: loginTokenData, //测试数据
      question: loginTokenData.userData.question, //密保问题
      answer: loginTokenData.userData.answer, //密保答案
    })
  }

  //页面->建议反馈
  async feedback() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    await ctx.render('/frontend/home/feedback', {
      title: '建议反馈 - 极速简历',
      data: loginTokenData, //测试数据
    })
  }

  //接口->修改个人信息
  async setUserInfo() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    
    var userInfoData = ctx.request.body;
    var setUserInfo = await ctx.service.frontend.home.setUserInfo(userInfoData);
    ctx.body = setUserInfo;
  }

  //接口->更换个人头像
  async changeAvatar() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.home('/'); ctx.cookies.set('loginToken', ''); return false; }

    var fileStream = await ctx.getFileStream();
    var changeAvatar = await ctx.service.frontend.home.changeAvatar(fileStream, loginTokenData);
    ctx.body = changeAvatar;
  }

  //接口->修改密码
  async modifyPassword() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var passwordData = ctx.request.body;
    var modifyPassword = await ctx.service.frontend.home.modifyPassword(passwordData, loginTokenData);
    console.log('*******controller')
    console.log(modifyPassword)
    ctx.body = modifyPassword;
  }

  //接口->设置密保
  async setSecurity() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var securityData = ctx.request.body;
    var setSecurity = await ctx.service.frontend.home.setSecurity(securityData, loginTokenData);
    ctx.body = setSecurity;
  }

}

module.exports = HomeController;