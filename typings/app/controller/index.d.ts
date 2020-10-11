// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFrontendAccount = require('../../../app/controller/frontend/account');
import ExportFrontendHome = require('../../../app/controller/frontend/home');
import ExportFrontendIndex = require('../../../app/controller/frontend/index');

declare module 'egg' {
  interface IController {
    frontend: {
      account: ExportFrontendAccount;
      home: ExportFrontendHome;
      index: ExportFrontendIndex;
    }
  }
}
