<template>
  <div class="manage-AttendanceGroup">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form
      :btn-tools="btnTools"
      @toolsBtn="toolsBtn"
      :btn-items="''"
      :form-options="formOptions"
    />
    <!-- 表格+分页 -->
    <attendance-table
      :table-data="tableData"
      :column-options="columnOptions"
      :search-param="searchParam"
      :count="count"
      @onTableDel="onTableDel"
      @onTableEdit="onTableEdit"
      @pageSize="pageSize"
      @currPage="currPage"
      v-loading="loading"
    />
    <!-- 模态框 -->
    <addGroup-modal
      :dialogVisible.sync="dialogVisible"
      :modalTitle="modalTitle"
      :rowData="rowData"
      :isChoseUser.sync="isChoseUser"
      @onModal="onModal"
    />
    <choseUser-modal :isChoseUser.sync="isChoseUser" :choseUsers.sync="rowData.users" @onModal1="onModal1" />
  </div>
</template>

<script>
// 通用组件 -- 1当前位置、2表单、3表格+分页
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'

// 业务组件 -- 1新增+编辑模态框、2选择人员模态框
import AddGroupModal from './components/addGroup'
import ChoseUserModal from './components/choseUser'

// js文件 -- 1传入组件内容、2深拷贝、3弹框
import { attendanceGroup } from '@/enum/attendance'
import deepCopy from '@/utils/deepCopy'
import { openTip } from '@/utils/messageBox'

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    AddGroupModal, // 新增+编辑模态框
    ChoseUserModal // 选择人员模态框
  },
  data () {
    return {
      rowData: {}, // 某行数据
      dialogVisible: false, // 控制新增+编辑模态框是否显示
      isChoseUser: false, // 控制选择人员模态框是否显示
      modalTitle: '', // 模态框标题
      formOptions: [], // 表单属性
      btnTools: attendanceGroup.btnTools, // 工具按钮属性
      columnOptions: attendanceGroup.columnOptions, // 列属性
      tableData: [], // 页面显示数据 -- 表格
      searchParam: {
        // 分页相关
        currPage: 1,
        pageSize: 10
      },
      count: 0, // 总的数据条数
      loading: false // 是否加载
    }
  },
  created () {
    this.getGroupList(1)
  },
  methods: {
    openTip, // 声明弹框事件
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      // console.log('点击添加考勤组按钮', val)
      this.modalTitle = '添加考勤组'
      this.rowData = {}
      this.dialogVisible = true
    },
    /**
     * @description 新增+编辑模态框返回内容
     */
    async onModal (val) {
      console.log('新增+编辑模态框返回内容', val)
      const res = await this.$request.addGroup({
        ...this.rowData
      })
      // console.log('res', res)
      if (res.code === 0) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        this.getAttendanceList(1)
      }
    },
    /**
     * @description 选择人员模态框返回内容
     */
    onModal1 (val) {
      // console.log('选择人员模态框', val)
      // this.rowData.users = val
      console.log('rowData', this.rowData)
    },
    /**
     * @description 点击删除触发事件
     */
    async onTableDel (val) {
      this.openTip('是否确定删除该考勤组？', '删除提示')
        .then(async () => {
          var res = await this.$request.delGroup({
            id: val.id
          })
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getGroupList(1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * @description 点击编辑触发事件
     */
    onTableEdit (val) {
      // console.log('点击编辑', val)
      var o
      if (typeof val === 'object') {
        o = deepCopy.copyObject(val)
      } else {
        o = val
      }
      this.rowData = o
      this.modalTitle = '编辑考勤组'
      this.dialogVisible = true
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      const currPage = parseInt(this.count / this.searchParam.pageSize) + 1
      this.getGroupList(currPage)
    },
    /**
     * @description 跳转至某一页选择内容
     */
    currPage (val) {
      this.searchParam.currPage = val
      this.getGroupList(this.searchParam.currPage)
    },
    /**
     * @description 获取考勤组数据
     */
    async getGroupList (page) {
      this.loading = true
      this.searchParam.currPage = page
      const res = await this.$request.getGroup({
        ...this.searchParam
      })
      // console.log('获取考勤组数据', res)
      if (res.code === 0) {
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
