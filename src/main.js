// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import '@/style/common.css'
import '@/packages/flexible.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局挂载
import qs from 'qs'
import * as request from '@/api/main_request'
Vue.prototype.$qs = qs // qs全局挂载在vue实例上
Vue.prototype.$request = request

Vue.use(ElementUI)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
})
