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
function markdown() {
  let area = document.getElementById("area");
  let table = document.createElement("table");
  table.innerHTML = "";
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let textarea = document.createElement("textarea");
  textarea.setAttribute("id", "md-area");
  textarea.addEventListener("keyup", function () {
    mdSwitch();
  })
  td1.appendChild(textarea);
  tr.appendChild(td1);
  let td2 = document.createElement("td");
  let div = document.createElement("div");
  div.setAttribute("id", "show-area");
  div.classList.add("clearfix");
  td2.appendChild(div);
  tr.appendChild(td2);
  table.appendChild(tr);
  area.appendChild(table);
  asklocalStorage();
}
function asklocalStorage() {
  let mdArea = document.getElementById("md-area");
  var lostor = localStorage.getItem('formTempData');
  lostor = JSON.parse(lostor);
  if (lostor[0].title != '' || lostor[1].text != '') { // 若存在缓存并且缓存的id和当前表单的id相等，则询问是否加载缓存文件
    if (confirm('发现上次未提交的数据是否加载?')) {

      mdArea.innerHTML = '#' + lostor[0].title + '\n' + lostor[1].text;
      mdSwitch();
    } else {
      mdArea.innerHTML = "";
      mdSwitch();
    }
  } else {
    mdArea.innerHTML = "";
    mdSwitch();
  }
}
function mdSwitch() {
  var mdValue = document.getElementById("md-area").value;
  var converter = new showdown.Converter();
  var html = converter.makeHtml(mdValue);
  document.getElementById("show-area").innerHTML = html;
}
// 点击保存（原本想保存在草稿的） 暂存在本地 也在自动保存
// 获取标题和文本
function getArticleT() {
  let showArea = document.getElementById("show-area");
  let title = '';

  if (showArea.firstChild == null) {
    title = ''
  }
  else title = showArea.firstChild.innerHTML;
  return title;
}
function getArticleC() {
  let showArea = document.getElementById("show-area");
  let text = '';
  let c = showArea.children;
  for (let i = 1; i < c.length; i++) {
    text += c[i].innerHTML;
  };
  return text;
}
function saveArticle() {
  let title = getArticleT();
  let text = getArticleC();
  changeValue(title, text);
}
// 每隔一分钟保存一次
function changeValue(title, text) {
  this.timer = window.setInterval(() => {
    setTimeout(this.autoSaveData(title, text), 0)
  }, 10000)
}

// 自动保存函数
function autoSaveData(title, text) {
  // 将填写的数据但未提交保存在本地
  let titleObj = { "title": title }, textObj = { "text": text }
  this.tempData = []
  this.tempData.push(titleObj)
  this.tempData.push(textObj)
  localStorage.setItem('formTempData', JSON.stringify(this.tempData))  // this.$message.success('已自动保存')
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份 
    "d+": this.getDate(),                    //日 
    "h+": this.getHours(),                   //小时 
    "m+": this.getMinutes(),                 //分 
    "s+": this.getSeconds(),                 //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds()             //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}

function publicArticle() {
  let phone = getByKey('phone');
  console.log(phone);
  let title = getArticleT();
  let content = getArticleC();
  let creatTime = new Date().format('yyyy-MM-dd hh:mm:ss');
  console.log(phone, title, content, creatTime);
  axios.post('/publicArticle', {
    title,
    content,
    phone,
    creatTime
  }).then((res) => {
    console.log("请求成功");
    console.log(res.data);
    alert("发布成功");
    localStorage.removeItem('formTempData');
    history.go(-1);
  }).catch((err) => {
    console.log("请求失败");
  })
}
window.onload = function () {
  markdown();
  // 渲染页面的时候自动保存
  saveArticle();
}

