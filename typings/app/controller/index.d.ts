// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFrontendIndex = require('../../../app/controller/frontend/index');
import ExportFrontendUser = require('../../../app/controller/frontend/user');

declare module 'egg' {
  interface IController {
    frontend: {
      index: ExportFrontendIndex;
      user: ExportFrontendUser;
    }
  }
}
