//判断访问量 如果数据库没有数据null则用0表示
function judge(num) {
  let ruselt = 0
  if (num != null) {
    return num;
  } else return ruselt;
}

// 文章访问情况
function showtable(data) {
  let visit = document.getElementById('visit');

  let table = document.createElement('table');
  let tr = document.createElement('tr');
  tr.classList.add('tr');
  let th1 = document.createElement('th');
  th1.innerHTML = "原创";
  th1.classList.add('visitTitle')
  tr.appendChild(th1);

  let th2 = document.createElement('th');
  th2.innerHTML = "粉丝";
  th2.classList.add('visitTitle')
  tr.appendChild(th2);

  let th3 = document.createElement('th');
  th3.innerHTML = "评论";
  th3.classList.add('visitTitle')
  tr.appendChild(th3);

  let th4 = document.createElement('th');
  th4.innerHTML = "访问者";
  th4.classList.add('visitTitle')
  tr.appendChild(th4);

  table.appendChild(tr);
  console.log(data);
  for (let i = 0; i < data.length; i++) {

    let tr2 = document.createElement('tr');

    let td1 = document.createElement('td');

    td1.innerHTML = judge(data[i].origina);
    td1.classList.add('visitTitle');
    tr2.appendChild(td1);

    let td2 = document.createElement('td');
    td2.innerHTML = data[i].fans;
    td2.classList.add('visitTitle');
    tr2.appendChild(td2);

    let td3 = document.createElement('td');
    td3.innerHTML = data[i].discuss;
    td3.classList.add('visitTitle');
    tr2.appendChild(td3);

    let td4 = document.createElement('td');
    td4.innerHTML = data[i].visit;
    td4.classList.add('visitTitle');
    tr2.appendChild(td4);

    table.appendChild(tr2);
  }
  visit.appendChild(table);
}
function showBox() {
  let phone = getByKey('phone');
  axios.get('/getCount', {
    params: {
      phone
    }
  }).then((res) => {
    console.log("请求成功");
    console.log(res.data);
    showtable(res.data)

  }).catch((err) => {
    console.log("请求失败")
  })
}
showBox();

