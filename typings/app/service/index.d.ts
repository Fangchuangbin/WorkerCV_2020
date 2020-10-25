// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportFrontendAccount = require('../../../app/service/frontend/account');
import ExportFrontendResume = require('../../../app/service/frontend/resume');
import ExportFrontendTemplate = require('../../../app/service/frontend/template');
import ExportFrontendToken = require('../../../app/service/frontend/token');

declare module 'egg' {
  interface IService {
    frontend: {
      account: AutoInstanceType<typeof ExportFrontendAccount>;
      resume: AutoInstanceType<typeof ExportFrontendResume>;
      template: AutoInstanceType<typeof ExportFrontendTemplate>;
      token: AutoInstanceType<typeof ExportFrontendToken>;
    }
  }
}
