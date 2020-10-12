'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.frontend.index.default); //首页
  router.post('/login', controller.frontend.account.login); //登录
  router.get('/home', controller.frontend.home.default); //用户中心
  router.get('/home/collect', controller.frontend.home.collect); //我的收藏
  router.post('/setResume', controller.frontend.index.setResume); //保存简历
  router.get('/edit/:tempid', controller.frontend.index.edit);
  router.post('/createPDF', controller.frontend.index.createPDF);
};
