import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/views/Home'

import attendance from './modules/attendance/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/First',
      name: 'First',
      component: HelloWorld
    },
    {
      path: '/System',
      name: 'System',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/myAttendance',
      children: attendance
    }
  ]
})
