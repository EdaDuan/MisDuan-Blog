let deleteRow = document.getElementsByClassName('delete-row');
let update = document.getElementsByClassName('update');
// 显示存放框架
function showArticle(a) {
  let mydiv = document.querySelector('.article');
  mydiv.innerHTML = "";
  let table = document.createElement('table');
  table.classList.add('articleTable');
  let tr = document.createElement('tr');
  table.appendChild(tr);
  let th2 = document.createElement('th');
  th2.innerHTML = 'title';
  let th3 = document.createElement('th');
  th3.innerHTML = 'content';
  let th4 = document.createElement('th');
  th4.innerHTML = 'operate';
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  table.appendChild(tr);
  for (let i = 0; i < a.length; i++) {
    let tr = document.createElement('tr');
    let td2 = document.createElement('td');
    td2.innerHTML = a[i].title;
    tr.appendChild(td2);
    let td3 = document.createElement('td');
    let con = a[i].content.slice(0, 20) + '...';
    td3.innerHTML = con;
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    let delBtn = document.createElement("button");
    delBtn.classList.add('setBtn');
    delBtn.innerHTML = "删除" + '';
    delBtn.classList.add("delete-row");
    td4.appendChild(delBtn);


    let upBtn = document.createElement("button");
    upBtn.classList.add('setBtn');
    upBtn.innerHTML = "编辑" + '';
    upBtn.classList.add("update");
    td4.appendChild(upBtn);

    tr.appendChild(td4);
    table.appendChild(tr);
  }
  mydiv.appendChild(table)
}

// 显示用户的content
function show() {
  let showText = document.querySelector('.personCen').innerHTML;
  if (showText == "个人中心") {
    document.querySelector('.personCen').innerHTML = '返回';
    let phone = getByKey('phone');
    let username = getByKey('username');
    axios.get('/showArticle', {
      params: {
        phone
      }
    }).then(res => {
      console.log('请求成功');
      if (phone && username) {
        console.log(phone, username);
        showArticle(res.data);
        del(res.data);
        updateC(res.data);
      } else {
        location.href = "./index.html"
      }
    }).catch(err => {
      console.log('请求失败');
    })
  } else if (showText == "返回") {
    document.querySelector('.personCen').innerHTML = '个人中心';
    location.href = "./user.html"
    // location.reload();
    // history.go(0);
  }

}
// 删除数据
function del(data) {
  for (let i = 0; i < data.length; i++) {
    let index = data[i].article_id;
    deleteRow[i].addEventListener('click', function () {
      axios.post('/delarticle', {
        id: index
      }).then(res => {
        show();
      }).catch(err => {
        console.log('请求失败');
      })
    })
  }
}

// 模糊查询
function searchclick() {
  let inputValue = document.getElementsByClassName('s_input')[0].value;
  console.log(inputValue);
  axios.post('/searchArticle', {
    inputValue
  }).then(res => {
    showAllArticle(res.data);
    console.log('search请求成功');
    // let telno = getByKey('telno');
    // let username = getByKey('username');
    // console.log(res.data);

  }).catch(err => {
    console.log('请求失败');
  })
}
// update编辑
function updateC(data) {
  for (let i = 0; i < data.length; i++) {
    let index = data[i].article_id;
    update[i].addEventListener('click', function () {
      axios.post('/updatearticle', {
        id: index
      }).then(res => {
        showCon(res.data);
        console.log(res.data);
      }).catch(err => {
        console.log('请求失败');
      })
    })
  }
}

// 显示用户
function showUser() {
  let username = getByKey("username");
  let info = document.getElementById('infouser');
  console.log(info);
  info.innerHTML = `欢迎${username}`;
}

// 显示头像

// 上传头像到浏览器以及服务器
function upImg() {
  let phone = getByKey("phone");
  let file = document.getElementById("uphead").files[0];
  console.log(file);
  let url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  let img = document.getElementsByClassName('img')[0];
  img.style.backgroundImage = `url(${url})`;
  document.getElementsByClassName('status')[0].innerHTML = "点击更改头像";
  console.log('页面成功显示头像');

  let formData = new FormData();
  formData.append("uploadFile", file, file.name);
  formData.append("phone", phone);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
    }
  };
  axios.post('/updateImg', formData, config)
    .then(res => {
      console.log("请求成功");
      console.log(res.data);
    }).catch(err => {
      console.log("请求失败");
    })

}
// 上传头像到服务器
// function updateImg() {
// 根据phone
// let phone = getByKey("phone");
// console.log(phone)
// let file = document.getElementById("uphead").files[0];
// console.log(file);
// let formData = new FormData();
// formData.append("uploadFile", file, file.name);
// formData.append("phone", phone);
// const config = {
//   headers: {
//     "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
//   }
// };
// axios.post('./updateImg', formData, config)
//   .then(res => {
//     console.log("请求成功");
//     console.log(res.data);
//   }).catch(err => {
//     console.log("请求失败");
//   })
// console.log('数据库成功录入头像url')
// }

// 
function putImg(url) {
  console.log(url);
  let Img = document.getElementsByClassName('img')[0];
  if (url != null) {
    Img.style.backgroundImage = `url(${url})`;
    document.getElementsByClassName('status')[0].innerHTML = "点击更改头像";
  }
  else {
    Img.style.backgroundImage = "../img/head.jpg";
    document.getElementsByClassName('status')[0].innerHTML = "点击上传头像";
  }
}
// 

// 显示头像
function showHead() {
  // 根据phone
  let phone = getByKey("phone");
  axios.post('/showImg', {
    phone
  }).then(res => {
    console.log(res.data);
    putImg(res.data[0].url);
  }).catch(err => {
    console.log("请求失败");
  })
}
function Login() {
  let username = getByKey('username');
  console.log(username);
  if (!username) {
    location.href = "./index.html"
  }
}
// 在界面加载完成调用函数
window.onload = function () {
  showUser();
  showHead();
  Login();
  let article = document.getElementsByClassName('article')[0];
  for (let i = 0; i < article.children.length; i++) {
    article.children[i].addEventListener('click', function () {

      let id = article.children[i].firstChild.firstChild.innerHTML.slice(2);
      showContent(id);
    })
  }
  document.getElementsByClassName('img')[0].addEventListener("mouseover", function () {
    document.getElementsByClassName('status')[0].style.display = 'inline-block';
  })
  document.getElementsByClassName('img')[0].addEventListener("mouseout", function () {
    document.getElementsByClassName('status')[0].style.display = 'none';
  })
  // showBox();
}