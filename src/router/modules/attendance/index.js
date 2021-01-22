/* 考勤管理 */
export default [
  {
    path: '/myAttendance',
    name: 'myAttendance',
    meta: {
      title: '我的考勤'
    },
    component: () =>
      import(
        /* webpackChunkName: "my-attendance" */
        '@/views/attendanceManage/myAttendance/index'
      )
  },
  {
    path: '/managerUser',
    name: 'managerUser',
    meta: {
      title: '用户管理'
    },
    component: () =>
      import(
        /* webpackChunkName: "manager-user" */
        '@/views/attendanceManage/managerUser/index'
      )
  },
  {
    path: '/attendanceStatus',
    name: 'attendanceStatus',
    meta: {
      title: '考勤状态管理'
    },
    component: () =>
      import(
        /* webpackChunkName: "manage-attendanceStatus" */
        '@/views/attendanceManage/attendanceStatus/index'
      )
  },
  {
    path: '/attendanceGroup',
    name: 'attendanceGroup',
    meta: {
      title: '考勤组管理'
    },
    component: () =>
      import(
        /* webpackChunkName: "manage-attendanceGroup" */
        '@/views/attendanceManage/attendanceGroup/index'
      )
  }
]
