'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.frontend.index.homepage);
  router.post('/login', controller.frontend.account.login);
  router.get('/admin/:id', controller.frontend.index.admin);
  router.get('/edit/:tempid', controller.frontend.index.edit);
  router.get('/createPDF', controller.frontend.index.createPDF);
};
