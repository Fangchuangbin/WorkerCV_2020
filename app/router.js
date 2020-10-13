'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  //页面路由

  router.get('/', controller.frontend.public.index); //首页

  router.get('/home', controller.frontend.home.index); //用户中心

  router.get('/home/collect', controller.frontend.home.collect); //我的收藏

  router.get('/edit/:tempid', controller.frontend.public.edit); //编辑简历



  //接口路由

  router.post('/createPDF', controller.frontend.public.createPDF); //生成简历

  router.post('/login', controller.frontend.account.login); //登录

  router.post('/setResume', controller.frontend.resume.setResume); //保存简历

  router.post('/reviseInfo', controller.frontend.account.reviseInfo); //修改个人信息

  
};
