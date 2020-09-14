const Service = require('egg').Service;

class articleService extends Service {
  // 获取所有的文章
  async showAllArticleS() {
    // //获取配置数据
    // "select id, name, sex from stu where id>? and id<?, [0, 100]"
    let sql = "select article_id, title, content, create_time from barticle"
    let allList = await this.ctx.app.mysql.query(sql);
    return allList;
  }
  // 获取用户所有文章showArticleS
  async showArticleS(phone) {
    let sql = "select article_id, title, content, uphone from barticle where uphone = ?";
    let List = await this.ctx.app.mysql.query(sql, [phone]);
    return List;
  }
  // 删除文章
  async delarticleS(id) {
    let delsql = "DELETE from barticle where article_id = ?";
    let delCont = await this.ctx.app.mysql.query(delsql, [id]);
    return delCont;
  }
  // 模糊查询
  async searchArticleS(con) {
    console.log(con)
    let sql = "SELECT * FROM barticle WHERE article_id LIKE ? or title LIKE ? or content LIKE ?;"
    let searchList = await this.ctx.app.mysql.query(sql, ['%' + con + '%', '%' + con + '%', '%' + con + '%']);
    return searchList;
  }
  // updatearticleS 根据ID查询 获取该内容
  async updatearticleS(id) {
    let upsql = "select article_id, title, content from barticle where article_id = ?"
    let upList = await this.ctx.app.mysql.query(upsql, [id]);
    return upList;
  }
  // saveConS 更改之后 更新数据库
  async saveConS(sCon, id, log) {
    if (log == 'title') {
      let savesql = "update barticle set title = ? where article_id = ?";
      let saveList = await this.ctx.app.mysql.query(savesql, [sCon, id]);
      return saveList;
    } else {
      let savesql = "update barticle set content = ? where article_id = ?";
      let saveList = await this.ctx.app.mysql.query(savesql, [sCon, id]);
      return saveList;
    }
  }
  // publicArticleS 发布文章 保存在数据库
  async publicArticleS(title, content, phone, creatTime) {
    // 2020-08-28 16:58:55
    let sql = "INSERT INTO barticle(title, content, uphone, create_time) VALUES (?, ?, ?, ?)";
    let addArticle = await this.ctx.app.mysql.query(sql, [title, content, phone, creatTime]);
    return addArticle;
  }
}
module.exports = articleService;