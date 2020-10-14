'use strict';

const Controller = require('egg').Controller;
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

//简历控制器
class ResumeController extends Controller {

  //接口->保存简历
  async setResume() {
    const { ctx } = this;
    const resumeData = ctx.request.body;
    var setResumeData = await ctx.service.frontend.resume.setResume(resumeData);
    ctx.body = setResumeData;
  }

  //页面->编辑简历
  async editResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/');ctx.cookies.set('loginToken', ''); return false; }

    const resumeToken = ctx.params.resumeId;
    var getResumeData = await ctx.service.frontend.resume.getResumeData(resumeToken);
    await ctx.render('/frontend/resume/index', {
      title: '编辑简历 - 极速简历',
      data: JSON.stringify(getResumeData), //测试数据
      resumeName: getResumeData.resumeData.resume_name, //简历名称
      resumeData: getResumeData.resumeData.resume_code, //简历代码
      resumeScore: getResumeData.resumeData.resume_score, //简历评分
      resumeToken: getResumeData.resumeData.resume_token //简历Token
    })
  }

  //接口->下载简历
  async downResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/');ctx.cookies.set('loginToken', ''); return false; }

    var resumeData = ctx.request.body;
    await wkhtmltopdf(resumeData.resumeCode, { pageSize: 'a4', encoding: 'utf-8' }).pipe(fs.createWriteStream('./app/public/' + resumeData.resumeName + '.pdf'));
    ctx.body = {
     result: loginTokenData.result,
     pdfUrl: resumeData.resumeName + '.pdf'
    }
  }
}

module.exports = ResumeController;