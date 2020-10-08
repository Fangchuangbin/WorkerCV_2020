const Service = require('egg').Service;

class UserService extends Service {
  async login() {
    const user = await this.app.mysql.select('user');
    return { user };
  }
}

module.exports = UserService;