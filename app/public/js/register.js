function $(id) {
  return document.getElementById(id)
}
function registerOpen() {
  let userRegister = $('userRegister');
  userRegister.style.display = 'block';
}
function registerclose() {
  let userRegister = $('userRegister');
  userRegister.style.display = 'none';
}
function RtoLogin() {
  let userRegister = $('userRegister');
  let userLogin = $('userLogin');
  userRegister.style.display = 'none';
  userLogin.style.display = 'block';
}

//  上传头像
function axiosupload() {
  console.log('点击上传图片');
}
// 点击上传图片 显示图片
function upImg() {
  let file = document.getElementById("file").files[0];
  console.log(file)
  let url = null;
  if (window.createObjectURL != undefined) {
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  console.log(url)
  let uploadImage = document.getElementsByClassName('uploadImage')[0];
  uploadImage.style.backgroundImage = `url(${url})`;
  document.getElementsByTagName('p')[0].style.display = 'none';
}
// 注册
async function registertBtn() {
  let file = document.getElementById("file").files[0];
  console.log(file);
  let phone = $('phone').value;
  let username = $('username').value;
  let pwd = $('password').value;
  console.log()
  if (file == undefined) {
    alert("请上传图片")
  }
  else if (phone == '' || username == '' || pwd == '') {
    alert("电话，用户名或密码为空");
  }
  else {
    let formData = new FormData();
    formData.append("uploadFile", file, file.name);
    formData.append("phone", phone);
    formData.append("username", username);
    formData.append("pwd", pwd);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data;boundary=" + new Date().getTime()
      }
    };
    await axios.post('/userRegist', formData, config)
      .then(res => {
        console.log('请求成功');
        console.log(res.data);
        if (!res.data) {
          alert('该账号已被注册');
          $('username').value = '';
          $('password').value = '';
          $('phone').value = '';
        } else {
          alert('注册成功');
          $('username').value = '';
          $('password').value = '';
          $('phone').value = '';
        }
      }).catch(err => {
        console.log('请求失败');
      })
    // 更新count表
    await axios.post('/isCount', {
      phone
    }).then((res) => {
      console.log("请求成功");
      console.log(res.data);
      if (!res.data) {
        console.log("已有账号")
      } else {
        console.log("更新成功")
      }
    }).catch(err => {
      console.log("请求失败");
    })
  }



}