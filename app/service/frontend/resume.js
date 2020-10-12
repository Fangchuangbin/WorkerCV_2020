const Service = require('egg').Service;
const moment = require('moment');

class ResumeService extends Service {
  //获取简历列表
  async getResumeList(userId) {
    const { ctx, app } = this;
    var getSuccess = { code: 20000, message: '获取用户简历列表成功' };
    var getFail = { code: 40004, message: '获取用户简历列表失败' };
    //var resumeList = await app.mysql.select('resume', { user_id: userId });
    var resumeList = await app.mysql.query(`select * from resume where user_id = ${userId} order by update_time desc`);
    for (let i = 0; i < resumeList.length; i++) {
      resumeList[i].update_time = moment(Number(resumeList[i].update_time)).format('YYYY年MM月DD日 hh时mm分ss秒')
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
    var updateTime = Date.parse(new Date());
    
    var setResume = await app.mysql.insert('resume', { user_id: 1, resume_name: '方创斌_测试简历', resume_code: resumeData, update_time: updateTime });
    return setResume;
  }
}

module.exports = ResumeService;