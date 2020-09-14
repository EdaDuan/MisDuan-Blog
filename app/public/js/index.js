// 展示文章列表
function showAllArticle(data) {
  let mydiv = document.querySelector('.article');
  mydiv.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    let divcard = document.createElement('div');
    divcard.classList.add('card');
    let a = document.createElement('a');
    // a.setAttribute('href', '#');

    let p1 = document.createElement('p');
    p1.classList.add('number');
    p1.innerHTML = '原创' + data[i].article_id
    a.appendChild(p1);

    let p2 = document.createElement('p');
    p2.classList.add('name');
    p2.innerHTML = data[i].title;
    a.appendChild(p2);

    let p3 = document.createElement('p');
    p3.classList.add('summary');
    let content = data[i].content.slice(0, 80);
    p3.innerHTML = content + '...';
    a.appendChild(p3);

    let p4 = document.createElement('p');
    p4.classList.add('time');
    let time = JSON.stringify(data[i].create_time);
    time = JSON.parse(time);
    p4.innerHTML = time.slice(0, 10);
    a.appendChild(p4);
    divcard.appendChild(a);
    mydiv.appendChild(divcard)
  }
}
// 展示文章具体内容
function showC(data) {
  let mydiv = document.querySelector('.article');
  mydiv.innerHTML = "";
  let table = document.createElement('table');
  table.classList.add('ConTable');
  let tr1 = document.createElement('tr');
  let td1 = document.createElement('td');
  td1.classList.add('center')
  td1.innerHTML = data[0].title;
  tr1.appendChild(td1);
  table.appendChild(tr1);

  let tr2 = document.createElement('tr');
  let td2 = document.createElement('td');
  td2.classList.add('Contd');
  td2.innerHTML = data[0].content;
  tr2.appendChild(td2);
  table.appendChild(tr2);
  mydiv.appendChild(table);
  let backBtn = document.createElement('button');
  backBtn.innerHTML = "返回";
  backBtn.classList.add('backBtn');
  backBtn.addEventListener('click', () => {
    history.go(0);
  })
  mydiv.appendChild(backBtn);
}
// 显示所有文章内容
function showAll() {
  axios.get('/showAllArticle', {
  }).then(res => {
    showAllArticle(res.data);
  }).catch(err => {
    console.log('请求失败');
  })
}
showAll();

function showContent(id) {
  axios.post('/updatearticle', {
    id
  }).then(res => {
    console.log('显示文章详细内容请求成功');
    console.log(res.data);
    showC(res.data);
  }).catch(err => {
    console.log('请求失败');
  })
}

window.onload = function () {
  isLogin();
  let article = document.getElementsByClassName('article')[0];
  for (let i = 0; i < article.children.length; i++) {
    article.children[i].addEventListener('click', function () {

      let id = article.children[i].firstChild.firstChild.innerHTML.slice(2);
      showContent(id);
    })
  }

}
// 在所有文章中搜索searchAllClick
function searchAllClick() {
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
