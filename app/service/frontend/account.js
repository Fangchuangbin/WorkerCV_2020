const Service = require('egg').Service;

class AccountService extends Service {
  async login(username, password) {
    if(await this.app.mysql.get('user', { email: username }) == null) {
      return await this.app.mysql.get('user', { phone: username, password: password });
    }else{
      return await this.app.mysql.get('user', { email: username, password: password });
    }
    
  }
}

module.exports = AccountService;