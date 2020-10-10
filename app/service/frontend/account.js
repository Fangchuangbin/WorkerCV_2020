const Service = require('egg').Service;

class AccountService extends Service {
  async login(username, password) {
    const emailRule = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
    var selectAccount;
    if(emailRule.test(username)){
      selectAccount = await this.app.mysql.get('user', { email: username, password: password });
    }else{
      selectAccount = await this.app.mysql.get('user', { phone: username, password: password });
    }
    if(selectAccount) {
      // await this.app.mysql.update('user', { id: selectAccount.id, csrf_token: csrfToken })
      return selectAccount
    }else{
      return null
    }
  }
}

module.exports = AccountService;