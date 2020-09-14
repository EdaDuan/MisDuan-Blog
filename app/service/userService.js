const Service = require('egg').Service;
const path = require("path");
const fs = require("fs");
class userService extends Service {
  // 登录 查询所有的用户在进行匹配
  async loginS(userphone, pwd) {
    let sql = "select phone, password, username from buser";
    let stuList = await this.ctx.app.mysql.query(sql);

    for (let i = 0; i < stuList.length; i++) {
      if (userphone == stuList[i].phone && pwd == stuList[i].password) {
        return stuList[i];
      }
    }
    return false;
  }
  // 注册 
  async registS() {
    // // 数据库中遍历的账号和密码
    // let sql = "select phone from buser"
    // let userList = await this.ctx.app.mysql.query(sql);
    // for (let i = 0; i < userList.length; i++) {
    //   if (userList[i].phone == phone)
    //     return false;
    // }
    // let values = [username, pwd, phone];
    // let addsql = "INSERT INTO buser(username, password, phone) VALUES (?, ?, ?)";
    // let addUser = await this.ctx.app.mysql.query(addsql, values);
    // return addUser;
    const file = this.ctx.request.files[0];
    const toFileName = '/public/upload/' + Date.now() + file.filename;
    let to = path.dirname(__dirname) + toFileName;
    await fs.copyFileSync(file.filepath, to);
    await fs.unlinkSync(file.filepath);

    const newUrl = "http://127.0.0.1:7003" + toFileName;

    let phone = this.ctx.request.body.phone;
    let sqlphone = "select phone from buser"
    let userList = await this.ctx.app.mysql.query(sqlphone);
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].phone == phone)
        return false;
    }
    let pwd = this.ctx.request.body.pwd;
    let username = this.ctx.request.body.username;
    const sql = "insert into buser(phone, password, username, url)values(?, ?, ?, ?)";
    let r = await this.ctx.app.mysql.query(sql, [phone, pwd, username, newUrl]);
    if (r.affectedRows == 0) {
      console.log('失败');
      return false;
    } else {
      console.log('成功');
      return true;
    }
  }
  // 获取头像showImgS
  async showImgS(phone) {
    const sql = "select url from buser where phone = ?";
    let res = await this.ctx.app.mysql.query(sql, [phone]);
    return res;
    // return 11;
  }
  // 更新头像
  async updateImgS() {
    const file = this.ctx.request.files[0];
    const toFileName = '/public/upload/' + Date.now() + file.filename;
    let to = path.dirname(__dirname) + toFileName;
    await fs.copyFileSync(file.filepath, to);
    await fs.unlinkSync(file.filepath);

    const newUrl = "http://127.0.0.1:7003" + toFileName;
    let phone = this.ctx.request.body.phone;
    const sql = "update buser set url = ? where phone = ?";
    let r = await this.ctx.app.mysql.query(sql, [newUrl, phone]);
    console.log(r)
    if (r.affectedRows == 0) {
      return false;
    } else {
      return true;
    }
  }
}
module.exports = userService;