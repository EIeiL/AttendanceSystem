/**
 * @description 对象数组深拷贝
 * @param {*} obj 对象数组
 */
function copyObject (obj) {
  var sourceCopy = obj instanceof Array ? [] : {};
  for (var item in obj) {
    sourceCopy[item] = typeof obj[item] === 'object' ? copyObject(obj[item]) : obj[item];
  }
  return sourceCopy;
}

/**
 * @description 对象深拷贝
 */
function objDeepCopy (obj) {
  var sourceCopy = {};
  for (var item in obj) sourceCopy[item] = typeof obj[item] === 'object' ? objDeepCopy(obj[item]) : obj[item];
  return sourceCopy;
}

/**
 * @description 数组深拷贝
 */
function arrDeepCopy (arr) {
  var sourceCopy = [];
  for (var item in arr) sourceCopy[item] = typeof arr[item] === 'object' ? arrDeepCopy(arr[item]) : arr[item];
  return sourceCopy;
}

export default {
  copyObject: copyObject,
  objDeepCopy: objDeepCopy,
  arrDeepCopy: arrDeepCopy
}
