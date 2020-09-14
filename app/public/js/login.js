function $(id) {
  return document.getElementById(id)
}
function getByKey(key) {
  let name = key + "=";//"pwd="
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    // "pwd=abc"   "price=12.4"  "name=小王"
    let c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      //"pwd=abc"	   //4       ,  7
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

function loginOpen() {
  let userLogin = $('userLogin');
  userLogin.style.display = 'block';
}
function loginclose() {
  let userLogin = $('userLogin');
  userLogin.style.display = 'none';
}
function Ltoregister() {
  let userLogin = $('userLogin');
  let userRegister = $('userRegister');
  userLogin.style.display = 'none';
  userRegister.style.display = 'block';

}
function loginBtn() {
  let userphone = $('userphone').value;
  let pwd = $('pwd').value;
  axios.post('/userLogin', {
    userphone,
    pwd
  }).then(res => {
    if (!res.data) {
      location.href = "/public/html/error.html";
    }
    else {
      // 保存cookie值
      document.cookie = "phone=" + res.data.phone;
      document.cookie = "username=" + res.data.username;
      location.href = "/public/html/user.html";
    }
  }).catch(err => {
    console.log('请求失败');
  })
}
// 判断是否登录
function isLogin() {
  let username = getByKey('username');
  if (username) {
    location.href = "./user.html"
    // let loginOpen = document.getElementsByClassName('loginOpen')[0];
    // let status = document.getElementsByClassName('status')[0];
    // loginOpen.innerHTML = '已登录';
    // status.innerHTML = '切换账号';
  }
}
