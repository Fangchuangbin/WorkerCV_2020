'use strict';

const Controller = require('egg').Controller;

//简历控制器
class ResumeController extends Controller {

  //保存简历
  async setResume() {
    const { ctx } = this;
    const resumeData = ctx.request.body.resumeData;
    var setResume = await ctx.service.frontend.resume.setResume(resumeData);
    ctx.body = setResume;
  }
}

module.exports = ResumeController;