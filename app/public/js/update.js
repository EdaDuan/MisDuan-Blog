// 显示存放文章Table
function showCon(data) {
  let mydiv = document.querySelector('.article');
  mydiv.innerHTML = "";
  let table = document.createElement('table');
  table.classList.add('ConTable');
  let tr1 = document.createElement('tr');
  let td1 = document.createElement('td');
  td1.classList.add('center')
  td1.innerHTML = data[0].title;
  td1.addEventListener('dblclick', () => {
    td1.setAttribute("contenteditable", true);
  })
  tr1.appendChild(td1);
  table.appendChild(tr1);

  let tr2 = document.createElement('tr');
  let td2 = document.createElement('td');
  td2.classList.add('Contd');
  td2.innerHTML = data[0].content;
  td2.addEventListener('dblclick', () => {
    td2.setAttribute("contenteditable", true);
  })
  tr2.appendChild(td2);
  table.appendChild(tr2);
  mydiv.appendChild(table);
  let saveBtn = document.createElement('button');
  saveBtn.innerHTML = "保存";
  saveBtn.classList.add('saveBtn');
  saveBtn.addEventListener('click', () => {
    // console.log(td.innerText);
    // console.log(data[0].article_id);
    saveCon(td1, data[0].article_id, 'title');
    saveCon(td2, data[0].article_id, 'content');
    show();
  })
  mydiv.appendChild(saveBtn);
}
function saveCon(td, id, log) {
  console.log(td.innerText);
  let sCon = td.innerHTML;
  axios.post('/saveCon', {
    sCon,
    id,
    log
  }).then(res => {
    console.log('save成功');
  }).catch(err => {
    console.log('请求失败');
  })
}


