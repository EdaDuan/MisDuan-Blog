function allCookie() {//读取所有保存的cookie字符串 
  var str = document.cookie;
  if (str == "") {
    str = "没有保存任何cookie";
  }
  alert(str);
}
function out() {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var phone = getByKey("phone");
  var username = getByKey("username");
  if (phone != null || username != null) {
    document.cookie = 'phone=' + ";expires=" + exp.toGMTString();
    document.cookie = 'username=' + ";expires=" + exp.toGMTString();
  }
  location.href = './index.html';
}