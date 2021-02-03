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
      :userIds.sync="userIds.length"
      :rowData="rowData"
      :isChoseUser.sync="isChoseUser"
      @onModal="onModal"
    />
    <choseUser-modal
      :isChoseUser.sync="isChoseUser"
      :choseUsers.sync="rowData.users"
      :modalTitle="modalTitle"
      :userIds.sync="userIds"
      @onModal1="onModal1"
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

// js文件 -- 1传入组件内容、2深拷贝、3弹框
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
      rowData: {}, // 某行数据
      userIds: [], // 提交数据，用户id列表
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
      this.rowData = {users: [], type: 1}
      this.dialogVisible = true
    },
    /**
     * @description 新增+编辑模态框返回内容
     */
    async onModal (val) {
      console.log('新增+编辑模态框返回内容', val)
      console.log('this.userIds', this.userIds)
      // console.log('this.rowData', this.rowData)
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
      console.log('obj', obj)
      const res = await this.$request.addGroup({
        // ...this.rowData
        ...obj
      })
      // console.log('res', res)
      if (res.code === 0) {
        this.dialogVisible = false
        var successTip
        if (this.modalTitle === '添加考勤组') {
          successTip = '添加成功'
        } else {
          successTip = '编辑成功'
        }
        this.$message({
          type: 'success',
          message: successTip
        })
        this.rowData = {}
        this.userIds = []
        this.getGroupList(1)
      }
    },
    /**
     * @description 选择人员模态框返回内容
     */
    async onModal1 (val) {
      // console.log('选择人员模态框', val)
      // this.rowData.users = val
      const id = this.rowData.id
      const res = await this.$request.isOtherGroup({
        id: id,
        userIds: this.userIds
      })
      // console.log('获取考勤状态数据', res)
      var tip = '用户'
      // var tipGroup = ''
      for (var i = 0; i < res.data.userList.length; i++) {
        if (i > 0) {
          tip += '、'
          // tipGroup += '、'
        }
        tip += res.data.userList[i]
        // tipGroup += res.data.groupList[i]
      }
      tip += '已存在其他考勤组，是否将用户加入本考勤组？'
      if (res.code === 0 && res.data.userList.length > 0) {
        this.openTip(tip, '提示')
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
      // console.log('点击编辑', val)
      this.rowData.users = []
      const obj = JSON.parse(JSON.stringify(val))
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
