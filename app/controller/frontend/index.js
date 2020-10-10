'use strict';

const Controller = require('egg').Controller;
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

class IndexController extends Controller {
  async homepage() {
    const { ctx } = this;
    await ctx.render('frontend/index', {
      title: '极速简历WorkerCV - 智能简历制作工具,免费简历模板下载,应届生求职简历模板'
    });
  }

  async admin() {
    const { ctx } = this;
    var userId = ctx.params.id;
    //var tokenData = ctx.cookies.get("loginToken");
    var data = await ctx.service.frontend.token.loginToken(userId);
    ctx.body = {
      data
    };
  }

  async edit() {
    const { ctx } = this;
    await ctx.render('frontend/edit', {
      tempid: ctx.params.tempid
    });
  }
  async createPDF() {
    const { ctx } = this;
    const html = ctx.query.html;
    wkhtmltopdf(html, { pageSize: 'a4', encoding: 'utf-8' }).pipe(fs.createWriteStream('./app/public/out.pdf'));
    ctx.status = 200;
    ctx.body = {
      status: ctx.status,
      outpdf: 'out.pdf'
    }
  }
}

module.exports = IndexController;
