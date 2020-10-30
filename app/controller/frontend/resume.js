'use strict';

const Controller = require('egg').Controller;
const crypto = require('crypto');
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

//简历控制器
class ResumeController extends Controller {

  //页面->编辑简历
  async index() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    const resumeKey = ctx.params.resumeKey;
    var resumeData = await ctx.service.frontend.resume.resumeData(resumeKey);//获取用户信息

    var resumeProposal = await ctx.service.frontend.resume.getResumeProposal();//获取简历优化建议
    if(resumeData.result.code !== 20000) { return false; }
    await ctx.render('/frontend/resume/index', {
      title: '编辑简历 - 极速简历',
      resumeName: resumeData.resumeData.resume_name, //简历名称
      resumeData: resumeData.resumeData.resume_code, //简历代码
      resumeScore: resumeData.resumeData.resume_score, //简历评分
      resumeKey: resumeData.resumeData.resume_key, //简历秘钥
      userData: loginTokenData, //用户信息
      resumeProposal: resumeProposal.resumeProposal,//获取建议优化建议
    })
  }

  //接口->保存简历
  async setResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    const resumeData = ctx.request.body;
    var setResumeData = await ctx.service.frontend.resume.setResume(resumeData);
    ctx.body = setResumeData;
  }

  //接口->下载简历
  async downResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var resumeData = ctx.request.body;
    //resumeData.resumeCode
    await wkhtmltopdf('<html lang="zh-cn"><body style="margin: 0;">' + resumeData.resumeCode + '</body></html>', { pageSize: 'a4', encoding: 'utf-8', marginBottom: 0, marginTop: 0, marginLeft: 0, marginRight: 0 }).pipe(fs.createWriteStream('./app/public/file/' + resumeData.resumeName + '.pdf'));
    ctx.body = {
     result: loginTokenData.result,
     pdfUrl: resumeData.resumeName + '.pdf'
    }
  }

  //接口->创建简历
  async createResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }
    
    var resumeTeamplateData = ctx.request.body;
    //获取简历模板
    var getResumeTemplateData = await ctx.service.frontend.resume.getResumeTemplate(resumeTeamplateData.templateKey);
    //创建简历
    var createResumeData = await ctx.service.frontend.resume.createResume(getResumeTemplateData, resumeTeamplateData, loginTokenData);
    ctx.body = createResumeData;
  }

  //接口->删除简历
  async deleteResume() {
    const { ctx } = this;
    var tokenData = ctx.cookies.get('loginToken');
    var loginTokenData = await ctx.service.frontend.token.loginToken(tokenData);
    if(loginTokenData.result.code !== 20000) { ctx.redirect('/'); ctx.cookies.set('loginToken', ''); return false; }

    var resumeData = ctx.request.body;
    var deleteResume = await ctx.service.frontend.resume.deleteResume(resumeData);
    ctx.body = deleteResume;
  }

}

module.exports = ResumeController;