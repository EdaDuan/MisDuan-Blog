{/* <div class="box">
  <div class="login">
    <h1>欢迎使用</h1>
    账号：<input id="userphone" type="text"><br />
    密码：<input id="pwd" type="password"><br />
    <button onclick="loginBtn()">登录</button><br />
    <div id="jump"><a href="./regist.html">没有账号？请注册</a></div>
  </div>
</div> */}
function create(tager) {
  return document.createElement('div');
}
function fun() {
  console.log('fun');
  let body = document.getElementById('body');
  let div1 = document.createElement('div1');
  div1.classList.add('div1');
  let div2 = document.createElement('div2');
  div2.classList.add('div2');
  let h1 = document.createElement('h1');
  h1.innerHTML = '欢迎使用';
  div2.appendChild(h1);
  // let span = document.createElement('span');
  // span.innerHTML = '账号:';
  // div.appendChild(span);
  // let span = document.createElement('input');

  div1.appendChild(div2);
  body.text = div1;
}