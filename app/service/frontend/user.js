const Service = require('egg').Service;

class UserService extends Service {
  async login(username, password) {
    const user = await this.app.mysql.get('user', { phone: username, password: password });
    return { user };
  }
}

module.exports = UserService;