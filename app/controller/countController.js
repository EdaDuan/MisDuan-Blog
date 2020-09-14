const Controller = require('egg').Controller;
class countController extends Controller {
  async getCountC() {
    let phone = this.ctx.request.query.phone;
    let msg = await this.ctx.service.countService.getCountS(phone);
    this.ctx.response.body = msg;
  }
  async isCountC() {
    let phone = this.ctx.request.body.phone;
    let msg = await this.ctx.service.countService.isCountS(phone);
    this.ctx.response.body = msg;
  }
}
module.exports = countController;