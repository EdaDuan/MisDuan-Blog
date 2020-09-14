const Controller = require('egg').Controller;
class userController extends Controller {
  // 对游客显示所有文章
  async showAllArticleC() {
    let msg = await this.ctx.service.articleService.showAllArticleS();
    this.ctx.response.body = msg;
  }
  // 用户显示所有文章showArticleC
  async showArticleC() {
    let phone = this.ctx.request.query.phone;
    let msg = await this.ctx.service.articleService.showArticleS(phone);
    this.ctx.response.body = msg;
  }
  // 登录成功后删除文章内容
  async delarticleC() {
    let id = this.ctx.request.body.id;
    let msg = await this.ctx.service.articleService.delarticleS(id);
    this.ctx.response.body = msg;
  }
  // 模糊查询
  async searchArticleC() {
    let con = this.ctx.request.body.inputValue;
    let msg = await this.ctx.service.articleService.searchArticleS(con);
    this.ctx.response.body = msg;
  }

  // updatearticleC点击编辑编辑
  async updatearticleC() {
    let id = this.ctx.request.body.id;
    let msg = await this.ctx.service.articleService.updatearticleS(id);
    this.ctx.response.body = msg;
  }
  // saveConC 保存
  async saveConC() {
    let sCon = this.ctx.request.body.sCon;
    let id = this.ctx.request.body.id;
    let log = this.ctx.request.body.log;
    let msg = await this.ctx.service.articleService.saveConS(sCon, id, log);
    this.ctx.response.body = msg;
  }
  // 发布文章 保存在数据库 
  async publicArticleC() {
    let title = this.ctx.request.body.title;
    let content = this.ctx.request.body.content;
    let phone = this.ctx.request.body.phone;
    let creatTime = this.ctx.request.body.creatTime;
    let msg = await this.ctx.service.articleService.publicArticleS(title, content, phone, creatTime);
    this.ctx.response.body = msg;
  }
}
module.exports = userController;