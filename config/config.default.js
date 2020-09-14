exports.keys = "dndjkvnfkxjnvjkf"

//加上后post请求才能成功,文件上传才能成功 1
exports.security = {
  csrf: {
    enable: false,
    ignoreJSON: true
  }
};
exports.cluster = {
  listen: {
    port: 7003
  }
};
// config / config.default.js
exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'blog',
  },
};
// 文件上传
exports.multipart = {
  mode: "file",
  // 允许文件上传的大小
  // fileSize: "500k",
  // 新增文件上传的格式
  fileExtensions: ['.txt'],
};