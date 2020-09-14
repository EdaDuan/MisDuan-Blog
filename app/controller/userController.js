const Controller = require('egg').Controller;

const fs = require('fs');
const path = require("path");
class userController extends Controller {
  async loginC() {
    let userphone = this.ctx.request.body.userphone;
    let pwd = this.ctx.request.body.pwd;
    let msg = await this.ctx.service.userService.loginS(userphone, pwd);
    this.ctx.response.body = msg;
  }
  async registC() {
    // // 输入的账号和密码(post请求参数)
    // let username = this.ctx.request.body.username;
    // let pwd = this.ctx.request.body.pwd;
    // let phone = this.ctx.request.body.phone;
    let msg = await this.ctx.service.userService.registS();
    this.ctx.response.body = msg;
  }

  // 登录成功后删除文章内容
  async delContentC() {
    let id = this.ctx.request.body.id;
    let msg = await this.ctx.service.delConService.delContentS(id);
    // console.log(msg);
    this.ctx.response.body = msg;
  }
  // 模糊查询
  async searchC() {
    let con = this.ctx.request.body.inputValue;
    console.log(con)
    let msg = await this.ctx.service.searchConService.searchContentS(con);
    this.ctx.response.body = msg;
  }
  // 显示头像showImgC
  async showImgC() {
    let phone = this.ctx.request.body.phone;
    let msg = await this.ctx.service.userService.showImgS(phone);
    this.ctx.response.body = msg;
  }
  // 登录后 重新上传头像updateImgC
  async updateImgC() {
    let msg = await this.ctx.service.userService.updateImgS();
    this.ctx.response.body = msg;
  }
}
module.exports = userController;