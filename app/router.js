module.exports = (app) => {
  const { router, controller } = app;
  router.post('/userLogin', controller.userController.loginC);
  router.post('/userRegist', controller.userController.registC);
  router.post('/showImg', controller.userController.showImgC);
  // 登录后，没有头像更改头像
  router.post('/updateImg', controller.userController.updateImgC);

  router.get('/showAllArticle', controller.articleController.showAllArticleC);
  router.post('/delarticle', controller.articleController.delarticleC);
  router.post('/searchArticle', controller.articleController.searchArticleC);
  router.post('/updatearticle', controller.articleController.updatearticleC);
  router.get('/showArticle', controller.articleController.showArticleC);
  router.post('/saveCon', controller.articleController.saveConC);
  router.post('/publicArticle', controller.articleController.publicArticleC);

  router.get('/getCount', controller.countController.getCountC);
  router.post('/isCount', controller.countController.isCountC);
}