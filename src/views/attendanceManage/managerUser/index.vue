<template>
  <div class="manager-User">
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
      @onTableEdit="onTableEdit"
      @pageSize="pageSize"
      @currPage="currPage"
      v-loading="loading"
    />
    <!-- 模态框 -->
    <add-modal
      :dialogVisible.sync="dialogVisible"
      :msgOptions="msgOptions"
      :modalTitle="modalTitle"
      :rowData="rowData"
      @onModal="onModal"
      ref="add"
    />
    <importUser-modal
      :dialogVisible1.sync="dialogVisible1"
      @onModal1="onModal1"
      ref="importUser"
    />
  </div>
</template>

<script>
// 通用组件 -- 1当前位置、2表单、3表格+分页、4添加模态框
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'
import AddModal from '@/components/ModalBox/addModal/index'

// 业务组件 -- 1导入用户模态框
import ImportUserModal from './components/importUser'

// js文件 -- 1传入组件内容、2弹框
import { managerUser } from '@/enum/attendance'
import { openTip } from '@/utils/messageBox'

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    AddModal, // 模态框 -- 添加用户
    ImportUserModal // 模态框 -- 导入用户
  },
  data () {
    return {
      dialogVisible: false, // 添加用户模态框是否显示
      dialogVisible1: false, // 导入用户模态框是否显示
      modalTitle: '', // 模态框标题
      formOptions: managerUser.formOptions, // 表单属性
      btnTools: managerUser.btnTools, // 工具按钮属性
      columnOptions: managerUser.columnOptions, // 列属性
      msgOptions: managerUser.msgOptions, // 模态框属性
      rowData: {}, // 某行数据
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
    this.getUserList(1)
  },
  methods: {
    /**
     * @description 声明弹框事件
     */
    openTip,
    /**
     * @description 触发搜索
     */
    async onSearch (val) {
      this.loading = true
      var res = ''
      if (val.keywords === '1') {
        res = await this.$request.getUser({
          ...this.searchParam,
          queryId: val.content
        })
      } else if (val.keywords === '2') {
        res = await this.$request.getUser({
          ...this.searchParam,
          username: val.content
        })
      } else if (val.keywords === '3') {
        res = await this.$request.getUser({
          ...this.searchParam,
          telephone: val.content
        })
      } else if (val.content) { // 输入框有内容但未选择类型
        this.$message({
          type: 'info',
          message: '请选择匹配字段'
        })
      } else { // 输入框无内容
        res = await this.$request.getUser({
          ...this.searchParam
        })
      }
      if (res !== '' && res.code === 0 && res.data.total) {
        if (res.data.total > 0) {
          this.count = res.data.total
          this.tableData = res.data.list
        } else {
          this.count = 0
          this.tableData = []
        }
      }
      this.loading = false
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      if (val === 'addUser') {
        this.rowData = {}
        this.modalTitle = '添加用户'
        this.dialogVisible = true
      } else {
        this.dialogVisible1 = true
      }
    },
    /**
     * @description 添加用户模态框返回内容
     */
    async onModal (val) {
      if (this.modalTitle === '编辑用户') {
        const res = await this.$request.editUser({
          id: val.id,
          telephone: val.telephone,
          username: val.username
        })
        if (res.code === 0) {
          this.$message({
            type: 'info',
            message: '编辑成功!'
          })
          this.$refs.add.resetForm()
          this.getUserList(1)
        } else {
          this.$message({
            type: 'info',
            message: res.msg
          })
          this.$refs.add.clickAction()
        }
      } else {
        const res = await this.$request.addUser({
          ...val
        })
        if (res.code === 0) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.$refs.add.resetForm()
          this.getUserList(1)
        } else {
          this.$message({
            type: 'info',
            message: '该姓名已存在，请修改'
          })
          this.$refs.add.clickAction()
        }
      }
    },
    /**
     * @description 导入用户模态框返回内容
     */
    onModal1 (val) {
      if (val.code && val.code === 0) {
        var successCount = 0
        var errorCount = 0
        if (val.data) {
          successCount = val.data.successCount
          errorCount = val.data.errorCount
        }
        this.$message({
          type: 'info',
          message: '导入成功' + successCount + '条，导入失败' + errorCount + '条'
        })
        this.$refs.importUser.resetForm()
        this.getUserList(1)
      } else if (val.code && val.code === -1) {
        this.$message({
          type: 'info',
          message: val.msg
        })
        this.$refs.importUser.clickAction()
      } else {
        this.$message({
          type: 'warning',
          message: '导入失败'
        })
        this.$refs.importUser.clickAction()
      }
    },

    /**
     * @description 删除某行数据
     */
    async onTableDel (val) {
      this.openTip('是否确定删除该用户', '删除提示')
        .then(async () => {
          var res = await this.$request.delUser({
            id: val.id
          })
          if (res.code === 0) {
            this.$message({
              type: 'warning',
              message: '删除成功!'
            })
            this.getUserList(1)
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    /**
     * @description 编辑某行数据
     */
    onTableEdit (val) {
      // var o
      // if (typeof val === 'object') {
      //   o = deepCopy.copyObject(val)
      // } else {
      //   o = val
      // }
      const obj = JSON.parse(JSON.stringify(val))
      this.rowData = obj
      this.modalTitle = '编辑用户'
      this.dialogVisible = true
    },

    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      this.getUserList(1)
    },
    /**
     * @description 跳转至某一页选择内容
     */
    currPage (val) {
      this.searchParam.currPage = val
      this.getUserList(this.searchParam.currPage)
    },
    /**
     * @description 获取用户数据
     */
    async getUserList (page) {
      this.loading = true
      this.searchParam.currPage = page
      const res = await this.$request.getUser({
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
