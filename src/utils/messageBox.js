// import {ElMessage} from 'element-ui'

/**
 * @description 删除弹框
 */
export function openDel (msg) {
  console.log('删除', msg)
  console.log('this', this)
  this.$confirm(msg, '删除提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$message({
      type: 'success',
      message: '删除成功!'
    })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}

/**
 * @description 提示弹窗
 */
export function openTip (msg) {
  this.$confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    console.log('点击确定按钮')
    return true
  }).catch(() => {
    console.log('点击取消按钮')
    return false
  })
}

// export default {
//   openDel: openDel,
//   openTip: openTip
// }
