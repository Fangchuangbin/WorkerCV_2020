// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFrontendAccount = require('../../../app/controller/frontend/account');
import ExportFrontendHome = require('../../../app/controller/frontend/home');
import ExportFrontendPublic = require('../../../app/controller/frontend/public');
import ExportFrontendResume = require('../../../app/controller/frontend/resume');
import ExportFrontendTemplate = require('../../../app/controller/frontend/template');

declare module 'egg' {
  interface IController {
    frontend: {
      account: ExportFrontendAccount;
      home: ExportFrontendHome;
      public: ExportFrontendPublic;
      resume: ExportFrontendResume;
      template: ExportFrontendTemplate;
    }
  }
}
