/**
 * @description 弹框
 */
export function openTip (msg = '确定要执行此操作吗？', title = '提示', type = 'warning') {
  return this.$confirm(msg, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: type
  })
}
