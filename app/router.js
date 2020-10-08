'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.frontend.index.default);
  router.get('/login', controller.frontend.index.login);
  router.get('/edit/:tempid', controller.frontend.index.edit);
  router.get('/createPDF', controller.frontend.index.createPDF);
};
