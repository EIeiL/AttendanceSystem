// 年会相关接口
import CONFIG from '@/api/config'
import * as https from '@/utils/request'

const INTF = CONFIG.intf.attendance

// 我的考勤 -- 获取列表数据
export const getMyattendance = (params = {}) => {
  return https.post(INTF.attendance_getMyattendance, params).then(res => {
    return res
  })
}

// 我的考勤 -- 搜索
export const searchMyattendance = (params = {}) => {
  return https.post(INTF.attendance_searchMyattendance, params).then(res => {
    return res
  })
}
