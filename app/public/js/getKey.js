// 获取id
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