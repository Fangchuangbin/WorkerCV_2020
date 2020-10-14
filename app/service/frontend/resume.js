const Service = require('egg').Service;
const moment = require('moment');

class ResumeService extends Service {
  //获取简历列表
  async getResumeList(userId) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历列表成功' };
    var getFail = { code: 40004, message: '获取用户简历列表失败' };
    var resumeList = await app.mysql.query(`select * from resume where user_id = ${userId} order by update_time desc`);
    for (let i = 0; i < resumeList.length; i++) {
      resumeList[i].update_time = moment(Number(resumeList[i].update_time)).format('YYYY-MM-DD HH:mm:ss')
    }
    if(resumeList) {
        return { result: getSuccess, resumeList }
    }else{
        return { result: getFail }
    }
  }

  //保存简历
  async setResume(resumeData) {
    const { ctx, app } = this;
    var setSuccess = { code: 20000, message: '保存用户简历成功' };
    var setFail = { code: 40004, message: '保存用户简历失败' };
    var updateTime = Date.parse(new Date());
    var setResume = await app.mysql.update('resume', { resume_name: resumeData.resumeName, resume_code: resumeData.resumeCode, update_time: updateTime }, { where: { resume_token: resumeData.resumeToken } });
    if(setResume.affectedRows === 1) {
      return { result: setSuccess, setResume }
    }else{
      return { result: setFail, setResume }
    }
  }

  //获取编辑简历
  async getResumeData(resumeToken) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历表成功' };
    var getFail = { code: 40004, message: '获取用户简历失败' };
    var resumeData = await app.mysql.get('resume', { resume_token: resumeToken })
    if(resumeData) {
      return { result: getSuccess, resumeData }
    }else{
      return { result: getFail }
    }
  }
}

module.exports = ResumeService;