// 考勤相关接口
import CONFIG from '@/api/config'
import * as https from '@/utils/request'

const INTF = CONFIG.intf.attendance

// 我的考勤 -- 获取数据列表（搜索）
export const getMyattendance = (params = {}) => {
  return https.post(INTF.attendance_getMyattendance, params).then(res => {
    return res
  })
}
// 我的考勤 -- 添加考勤记录
export const addMyattendance = (params = {}) => {
  return https.post(INTF.attendance_addMyattendance, params).then(res => {
    return res
  })
}
// 我的考勤 -- 获取用户列表
export const getMyUser = (params = {}) => {
  return https.post(INTF.attendance_getMyUser, params).then(res => {
    return res
  })
}

// 用户管理 -- 获取数据列表（搜索）
export const getUser = (params = {}) => {
  return https.post(INTF.attendance_getUser, params).then(res => {
    return res
  })
}
// 用户管理 -- 添加用户
export const addUser = (params = {}) => {
  return https.post(INTF.attendance_addUser, params).then(res => {
    return res
  })
}
// 用户管理 -- 导入用户
export const importUser = (params = {}) => {
  return https.post(INTF.attendance_importUser, params).then(res => {
    return res
  })
}
// 用户管理 -- 编辑用户
export const editUser = (params = {}) => {
  return https.post(INTF.attendance_editUser, params).then(res => {
    return res
  })
}
// 用户管理 -- 删除用户
export const delUser = (params = {}) => {
  return https.post(INTF.attendance_delUser, params).then(res => {
    return res
  })
}



// 考勤状态管理 -- 获取数据列表（搜索）
export const getStatus = (params = {}) => {
  return https.post(INTF.attendance_getStatus, params).then(res => {
    return res
  })
}
// 考勤状态管理 -- 新增、编辑考勤状态
export const addStatus = (params = {}) => {
  return https.post(INTF.attendance_addStatus, params).then(res => {
    return res
  })
}
// 考勤状态管理 -- 删除考勤状态
export const delStatus = (params = {}) => {
  return https.post(INTF.attendance_delStatus, params).then(res => {
    return res
  })
}


// 考勤组管理 -- 获取数据列表
export const getGroup = (params = {}) => {
  return https.post(INTF.attendance_getGroup, params).then(res => {
    return res
  })
}
// 考勤组管理 -- 新增、编辑考勤组
export const addGroup = (params = {}) => {
  return https.post(INTF.attendance_addGroup, params).then(res => {
    return res
  })
}
// 考勤组管理 -- 删除考勤组
export const delGroup = (params = {}) => {
  return https.post(INTF.attendance_delGroup, params).then(res => {
    return res
  })
}
