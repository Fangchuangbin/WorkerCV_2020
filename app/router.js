'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.frontend.index.default); //首页
  router.post('/login', controller.frontend.account.login); //登录
  router.get('/center', controller.frontend.admin.default); //用户中心

  
  router.get('/edit/:tempid', controller.frontend.index.edit);
  router.get('/createPDF', controller.frontend.index.createPDF);
};
