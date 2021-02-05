<template>
  <div class="manage-AttendanceGroup">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form
      :btn-tools="btnTools"
      :btn-items="''"
      :form-options="[]"
      @toolsBtn="toolsBtn"
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
      :userIds.sync="userIds.length"
      :rowData="rowData"
      :isChoseUser.sync="isChoseUser"
      @onModal="onModal"
      ref="addGroup"
    />
    <choseUser-modal
      :isChoseUser.sync="isChoseUser"
      :choseUsers.sync="rowData.users"
      :modalTitle="modalTitle"
      :userIds.sync="userIds"
      @onModal1="onModal1"
      ref="choseUser"
    />
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

// js文件 -- 1传入组件内容、2弹框
import { attendanceGroup } from '@/enum/attendance'
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
      rowData: {}, // 当前行数据--传入模态框内容
      userIds: [], // 提交数据--用户id列表
      dialogVisible: false, // 控制新增+编辑模态框是否显示
      isChoseUser: false, // 控制选择人员模态框是否显示
      modalTitle: '', // 模态框标题
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
    /**
     * @description 声明弹框事件
     */
    openTip,
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      this.modalTitle = '添加考勤组'
      this.rowData = { users: [], type: 1, dayoff: '7' }
      this.dialogVisible = true
    },
    /**
     * @description 新增+编辑模态框返回内容
     */
    async onModal (val) {
      var obj = {
        name: this.rowData.name,
        userIds: this.userIds,
        type: this.rowData.type,
        dayoff: this.rowData.dayoff,
        ifDel: this.rowData.ifDel ? this.rowData.ifDel : 0
      }
      if (val === true) {
        obj.id = this.rowData.id
      }
      const res = await this.$request.addGroup({
        ...obj
      })
      if (res.code === 0) {
        this.dialogVisible = false
        var successTip = '编辑成功'
        if (this.modalTitle === '添加考勤组') {
          successTip = '添加成功'
        }
        this.$message({
          type: 'success',
          message: successTip
        })
        this.rowData = {}
        this.userIds = []
        this.$refs.addGroup.resetForm()
        this.getGroupList(1)
      } else if (res.code === -1) {
        this.$message({
          type: 'info',
          message: res.msg
        })
        this.$refs.addGroup.clickAction()
      } else {
        this.$refs.addGroup.clickAction()
      }
    },
    /**
     * @description 选择人员模态框返回内容
     */
    async onModal1 (val) {
      const id = this.rowData.id
      const res = await this.$request.isOtherGroup({
        id: id,
        userIds: val.userIds
      })
      var tip = '用户'
      for (var i = 0; i < res.data.userList.length; i++) {
        if (i > 0) {
          tip += '、'
        }
        tip += res.data.userList[i]
      }
      tip += '已存在其他考勤组，是否将用户加入本考勤组？'
      if (res.code === 0 && res.data.userList.length > 0) {
        this.openTip(tip, '提示')
          .then(() => {
            this.$refs.choseUser.closeUser()
            this.rowData.users = val.choseUsers
            this.userIds = val.userIds
          })
          .catch(() => {
            console.log('失败啦')
          })
      } else if (res.code === 0 && res.data.userList.length === 0) {
        this.userIds = val.userIds
        this.$refs.choseUser.closeUser()
      } else if (res.code === -1) {
        this.$message({
          type: 'info',
          message: res.msg
        })
      }
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
              type: 'warning',
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
      // this.rowData.users = []
      const obj = JSON.parse(JSON.stringify(val)) // 深拷贝
      obj.users = obj.users ? obj.users : []
      this.rowData = obj
      this.userIds = []
      for (var i = 0; i < this.rowData.peopleSize; i++) {
        this.userIds.push(this.rowData.users[i].id)
      }
      this.modalTitle = '编辑考勤组'
      this.dialogVisible = true
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      this.getGroupList(1)
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
      if (res.code === 0 && res.data.list && res.data.total) {
        const tableDataTemp = []
        for (var i = 0; i < res.data.list.length; i++) {
          const obj = {
            ...res.data.list[i],
            typeString: res.data.list[i].type === 0 ? '固定班制' : '大小周制'
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
</style>
