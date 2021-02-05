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
      ref="add"
    />
  </div>
</template>

<script>
// 通用组件 -- 1当前位置、2表单、3表格+分页、4添加模态框
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'
import AddModal from '@/components/ModalBox/addModal/index'

// js文件 -- 1传入组件内容、2日期格式化
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
      if (res.code === 0) {
        this.$message({
          type: 'sucess',
          message: '添加成功!'
        })
        this.$refs.add.resetForm()
        this.getAttendanceList(1)
      } else if (res.code === -1) {
        this.$message({
          type: 'info',
          message: res.msg
        })
        this.$refs.add.clickAction()
      }
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      this.getAttendanceList(1)
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
      if (res.code === 0 && res.data) {
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
      if (res.code === 0 && res.data.list) {
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
      if (res.code === 0 && res.data.list && res.data.total) {
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
</style>
