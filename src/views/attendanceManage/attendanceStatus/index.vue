<template>
  <div class="manage-AttendanceStatus">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form
      :btn-items="'search,reset'"
      :form-options="formOptions"
      :btn-tools="btnTools"
      @onSearch="onSearch"
      @toolsBtn="toolsBtn"
      @currPage="currPage"
    />
    <!-- 表格+分页 -->
    <attendance-table
      :table-data="tableData"
      :column-options="columnOptions"
      :search-param="searchParam"
      :count="count"
      @onTableDel="onTableDel"
      @pageSize="pageSize"
      @currPage="currPage"
      v-loading="loading"
    />
    <!-- 模态框 -->
    <addStatus-modal
      :dialogVisible.sync="dialogVisible"
      :modalTitle="modalTitle"
      @onModal="onModal"
      ref="addStatus"
    />
  </div>
</template>

<script>
// 通用组件 -- 1当前位置、2表单、3表格+分页
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'

// 业务组件 -- 1添加状态模态框
import AddStatusModal from './components/addStatus'

// js文件 -- 1传入组件内容、2弹框
import { attendanceStatus } from '@/enum/attendance'
import { openTip } from '@/utils/messageBox'

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    AddStatusModal // 添加状态模态框
  },
  data () {
    return {
      dialogVisible: false, // 模态框是否显示
      modalTitle: '', // 模态框标题
      formOptions: attendanceStatus.formOptions, // 表单属性
      btnTools: attendanceStatus.btnTools, // 工具按钮属性
      columnOptions: attendanceStatus.columnOptions, // 列属性
      tableData: [], // 页面显示数据 -- 表格
      searchParam: { // 分页相关
        currPage: 1,
        pageSize: 10
      },
      count: 0, // 总的数据条数
      loading: false // 是否加载
    }
  },
  created () {
    this.getStatusList(1)
  },
  methods: {
    /**
     * @description 声明弹框事件
     */
    openTip,
    /**
     * @description 触发搜索
     */
    onSearch (val) {
      this.searchParam.query = val.name
      this.getStatusList(1)
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      this.modalTitle = '添加状态'
      this.dialogVisible = true
    },
    /**
     * @description 模态框返回内容
     */
    async onModal (val) {
      const res = await this.$request.addStatus({
        name: val.value,
        rule: val.time
      })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.$refs.addStatus.resetForm()
        this.getStatusList(1)
      } else if (res.code === -1) {
        this.$message({
          type: 'info',
          message: res.msg
        })
        this.$refs.addStatus.clickAction()
      }
    },
    /**
     * @description 删除某行数据
     */
    async onTableDel (val) {
      this.openTip('是否确定删除该考勤状态？', '删除提示')
        .then(async () => {
          var res = await this.$request.delStatus({
            id: val.id
          })
          if (res.code === 0) {
            this.$message({
              type: 'warning',
              message: '删除成功!'
            })
            this.getStatusList(1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      this.getStatusList(1)
    },
    /**
     * @description 跳转至某一页选择内容
     */
    currPage (val) {
      this.searchParam.currPage = val
      this.getStatusList(this.searchParam.currPage)
    },
    /**
     * @description 获取考勤状态数据
     */
    async getStatusList (page) {
      this.loading = true
      this.searchParam.currPage = page
      const res = await this.$request.getStatus({
        ...this.searchParam
      })
      if (res.code === 0 && res.data.total) {
        if (res.data.total > 0) {
          this.count = res.data.total
          this.tableData = res.data.list
        } else {
          this.count = 0
          this.tableData = []
        }
      }
      this.loading = false
    }
  }
}

</script>

<style lang="scss" scoped>
</style>
