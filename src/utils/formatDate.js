/**
 * @description 时间转换格式（yyyy-mm-dd）
 * @param {*} date 
 */
function formatDate(date) {
  date = new Date(Date.parse(date.replace(/-/g, "/"))); //转换成Data();
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  return y + '-' + m + '-' + d;
}

export default {
  formatDate: formatDate
}
