<template>
  <div class="my-attendance">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form
      :btn-items="'search,reset'"
      :btn-tools="btnTools"
      :form-options="formOptions"
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
      @pageSize="pageSize"
      @currPage="currPage"
      v-loading="loading"
    />
    <!-- 模态框 -->
    <add-modal
      :dialogVisible.sync="dialogVisible"
      :msgOptions="msgOptions"
      :modalTitle="modalTitle"
      @onModal="onModal"
    />
  </div>
</template>

<script>
// 通用组件 -- 当前位置、表单、表格+分页、添加模态框
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'
import AddModal from '@/components/ModalBox/addModal/index'

// js文件 -- 传入组件内容、日期格式化
import { myAttendance } from '@/enum/attendance'
import formatDate from '@/utils/formatDate'

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    AddModal // 模态框
  },
  data () {
    return {
      modalTitle: '添加考勤记录', // 模态框标题
      dialogVisible: false, // 模态框是否显示
      formOptions: myAttendance.formOptions, // 表单属性
      btnTools: myAttendance.btnTools, // 工具按钮属性
      columnOptions: myAttendance.columnOptions, // 列属性
      msgOptions: myAttendance.modalOptions, // 模态框属性
      tableData: [], // 页面显示数据 -- 表格
      userData: [], // 模态框下拉框数据 -- 用户选择
      statusData: [], // 搜索表单下拉框数据 -- 状态选择
      searchParam: { // 分页相关
        currPage: 1,
        pageSize: 10
      },
      count: 0, // 总的数据条数
      loading: false // 是否加载
    }
  },
  created () {
    this.getAttendanceList(1)
    this.getStatusList()
    this.getUserList()
  },
  methods: {
    /**
     * @description 触发搜索
     */
    onSearch (val) {
      if (val.query) {
        this.searchParam.query = val.query
      } else {
        this.searchParam.query = ''
      }
      if (val.queryStatus) {
        this.searchParam.queryStatus = val.queryStatus
      } else {
        this.searchParam.queryStatus = ''
      }
      if (val.queryTime) {
        this.searchParam.queryStartTime = val.queryTime[0]
        this.searchParam.queryEndTime = val.queryTime[1]
      } else {
        this.searchParam.queryStartTime = ''
        this.searchParam.queryEndTime = ''
      }
      this.getAttendanceList(1)
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      this.dialogVisible = true
    },
    /**
     * @description 模态框返回内容（点击确定按钮触发）
     */
    async onModal (val) {
      const res = await this.$request.addMyattendance({
        ...val
      })
      // console.log('res', res)
      if (res.code === 0) {
        this.getAttendanceList(1)
      }
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      const currPage = parseInt(this.count / this.searchParam.pageSize) + 1
      this.getAttendanceList(currPage)
    },
    /**
     * @description 跳转至某一页选择内容
     */
    currPage (val) {
      this.searchParam.currPage = val
      this.getAttendanceList(this.searchParam.currPage)
    },
    /**
     * @description 获取用户数据
     */
    async getUserList () {
      const res = await this.$request.getMyUser({
      })
      // console.log('用户res', res)
      if (res.code === 0) {
        for (var i = 0; i < res.data.length; i++) {
          const user = {
            label: res.data[i].username,
            value: res.data[i].id
          }
          this.$set(this.msgOptions[0].options, i, user)
        }
      }
    },
    /**
     * @description 获取状态数据
     */
    async getStatusList () {
      const res = await this.$request.getStatus({
      })
      // console.log('状态res', res)
      if (res.code === 0) {
        // console.log('打印状态信息', res.data.list)
        for (var i = 0; i < res.data.list.length; i++) {
          const status = {
            label: res.data.list[i].name,
            value: res.data.list[i].name
          }
          this.$set(this.formOptions[0].options, i, status)
        }
      }
    },
    /**
     * @description 获取考勤数据
     */
    async getAttendanceList (page) {
      this.loading = true
      this.searchParam.currPage = page
      const res = await this.$request.getMyattendance({
        ...this.searchParam
      })
      // console.log('考勤res', res)
      if (res.code === 0) {
        const tableDataTemp = []
        for (var i = 0; i < res.data.list.length; i++) {
          const obj = {
            userName: res.data.list[i].userName,
            signTime: formatDate.formatDate(res.data.list[i].signInTime),
            signInStatusName: res.data.list[i].signInStatusName,
            signOutStatusName: res.data.list[i].signOutStatusName
          }
          this.$set(tableDataTemp, i, obj)
        }
        if (res.data.total > 0) {
          this.count = res.data.total
          this.tableData = tableDataTemp
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
>>> .tipText {
  // 我的考勤
  color: red;
  margin-left: 120px;
}
>>> .el-dialog__body {
  // 我的考勤
  padding-bottom: 0px;
}
>>> .del-nowDate .el-picker__footer .el-button--text {
  display: none;
}
</style>
