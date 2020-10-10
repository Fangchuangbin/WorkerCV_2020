// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFrontendAccount = require('../../../app/controller/frontend/account');
import ExportFrontendAdmin = require('../../../app/controller/frontend/admin');
import ExportFrontendIndex = require('../../../app/controller/frontend/index');

declare module 'egg' {
  interface IController {
    frontend: {
      account: ExportFrontendAccount;
      admin: ExportFrontendAdmin;
      index: ExportFrontendIndex;
    }
  }
}
