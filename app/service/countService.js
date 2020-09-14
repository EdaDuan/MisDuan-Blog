const Service = require('egg').Service;
class countService extends Service {
  async getCountS(phone) {
    let sql = "select origina, fans, discuss, visit from bcount where uphone = ?"
    let List = await this.ctx.app.mysql.query(sql, [phone]);
    return List;
    // return 111;
  }
  async isCountS(phone) {
    // let sqlphone = "select phone from buser"
    // let userList = await this.ctx.app.mysql.query(sqlphone);
    // for (let i = 0; i < userList.length; i++) {
    //   if (userList[i].phone == phone)
    //     return false;
    // }
    let sql = "select uphone from bcount"
    let List = await this.ctx.app.mysql.query(sql);
    console.log(List)
    for (let i = 0; i < List.length; i++) {
      if (phone == List[i].uphone) {
        console.log("已有账号")
        return false;
      }
    }
    let zero = 0;
    let addsql = "insert into bcount(origina, fans, discuss, visit, uphone)values(?, ?, ?, ?, ?)"
    let addList = await this.ctx.app.mysql.query(addsql, [zero, zero, zero, zero, phone]);
    return true;
  }
}
module.exports = countService;