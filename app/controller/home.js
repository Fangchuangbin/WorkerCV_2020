'use strict';

const Controller = require('egg').Controller;
const wkhtmltopdf = require('wkhtmltopdf');
const fs = require('fs');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.render('frontend/index', {
      title: '极速简历WorkerCV - 智能简历制作工具,免费简历模板下载,应届生求职简历模板'
    });
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

module.exports = HomeController;
