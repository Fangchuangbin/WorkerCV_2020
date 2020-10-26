// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportFrontendHome = require('../../../app/controller/frontend/home');
import ExportFrontendIndex = require('../../../app/controller/frontend/index');
import ExportFrontendResume = require('../../../app/controller/frontend/resume');
import ExportFrontendTemplate = require('../../../app/controller/frontend/template');

declare module 'egg' {
  interface IController {
    frontend: {
      home: ExportFrontendHome;
      index: ExportFrontendIndex;
      resume: ExportFrontendResume;
      template: ExportFrontendTemplate;
    }
  }
}
