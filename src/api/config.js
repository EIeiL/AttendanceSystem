export default {
  intf: {
    // 考勤管理
    attendance: {

      // 我的考勤
      attendance_getMyattendance: '/attendance/record/listStatus',
      attendance_addMyattendance: '/attendance/record/sign',
      attendance_getMyUser: '/attendance/users/findAll',

      // 用户管理
      attendance_getUser: '/attendance/users/listUser',
      attendance_addUser: '/attendance/users/addUser',
      attendance_importUser: '/attendance/users/importUser',
      attendance_editUser: '/attendance/users/updateUser',
      attendance_delUser: '/attendance/users/deleteUser',

      // 考勤状态管理
      attendance_getStatus: '/attendance/status/listStatus',
      attendance_addStatus: '',
      // attendance_editStatus: '',
      attendance_delStatus: '/attendance/status/deleteStatus',

      // 考勤组管理
      attendance_getGroup: '/attendance/group/list',
      attendance_addGroup: '/attendance/group/save',
      attendance_delGroup: '/attendance/group/deleteGroup',
    }

    // 信息配置中心
  }
}
