'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //页面路由

  //index.js
  router.get('/', controller.frontend.index.index); //首页
  router.post('/api/login', controller.frontend.index.login); //用户登录
  router.post('/api/register', controller.frontend.index.register); //注册用户
  router.post('/api/forgetPassword', controller.frontend.index.forgetPassword); //首页->重置密码
  router.post('/api/resetNewPassword', controller.frontend.index.resetNewPassword); //首页->重置新密码
  router.get('/optimize/', controller.frontend.index.optimize); //简历优化
  router.get('/custom/', controller.frontend.index.custom); //简历定制
  router.get('/article/', controller.frontend.index.article); //求职攻略

  //home.js
  router.get('/home/', controller.frontend.home.index); //用户中心首页
  router.get('/home/settings/', controller.frontend.home.settings); //账户设置
  router.get('/home/collect/', controller.frontend.home.collect); //我的收藏
  router.get('/home/feedback/', controller.frontend.home.feedback); //建议反馈

  //resume.js
  router.get('/resume/:resumeKey/', controller.frontend.resume.index); //编辑简历

  //template.js
  router.get('/template/', controller.frontend.template.index); //简历模板列表->所有
  router.get('/template/:templateClassName/', controller.frontend.template.templateList); //简历模板列表->分类
  router.get('/template/:classname/:templateId.html', controller.frontend.template.templateItem); //简历模板详情


  //接口路由


  router.post('/api/setResume', controller.frontend.resume.setResume); //保存简历
  router.post('/api/createResume', controller.frontend.resume.createResume); //创建简历
  router.post('/api/deleteResume', controller.frontend.resume.deleteResume); //删除简历
  router.post('/api/downResume', controller.frontend.resume.downResume); //下载简历

  
  router.post('/api/setUserInfo', controller.frontend.home.setUserInfo); //修改个人信息
  router.post('/api/changeAvatar', controller.frontend.home.changeAvatar); //更换个人头像
  router.post('/api/modifyPassword', controller.frontend.home.modifyPassword); //用户中心->修改密码

  router.post('/api/setSecurity', controller.frontend.home.setSecurity); //设置密保

};
