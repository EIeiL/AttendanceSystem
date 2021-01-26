import axios from 'axios'
// import ElementUI, { Message } from 'element-ui'
// import store from '@/store/index'
import qs from 'qs'

axios.defaults.timeout = 300000
axios.defaults.withCredentials = false
// axios.defaults.baseURL = '/newoaApi' // 填写域名  正式环境
axios.defaults.baseURL = '' // 填写域名

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}, config = {
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' // 设置跨域头部
  },
  withCredentials: true
}) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data), config)
      .then(response => {
        // if (!response) { return false }
        resolve(response.data)
      }, err => {
        console.log(err)
        reject(err)
      })
  })
}

export function post2 (url, data = {}, config = {
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8' // 设置跨域头部
  },
  withCredentials: true
}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        // if (!response) { return false }
        resolve(response.data)
      }, err => {
        console.log(err)
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, params = {}, others) {
  return new Promise((resolve, reject) => {
    axios.get(url + '?time=' + new Date().getTime(), {
      params: params,
      ...others
    }, {
      withCredentials: true
    })
      .then(response => {
        // if (!response) { return false }
        resolve(response.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

export function noTimeGet (url, params = {}, others) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params,
      ...others
    }, {
      withCredentials: true
    })
      .then(response => {
        // if (!response) { return false }
        resolve(response.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

const service = axios.create({
  withCredentials: false
})
export function get2 (url, params = {}) {
  return new Promise((resolve, reject) => {
    service.get(url + '?time=' + new Date().getTime(), {
      params: params
    })
      .then(response => {
        // if (!response) { return false }
        resolve(response.data)
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}

