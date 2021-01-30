<template>
  <div class="manager-User">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form
      :btn-items="'search,reset'"
      :form-options="formOptions"
      @onSearch="onSearch"
      :btn-tools="btnTools"
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
    />
    <!-- 模态框 -->
    <add-modal
      :dialogVisible.sync="dialogVisible"
      :msgOptions="msgOptions"
      :modalTitle="modalTitle"
      :rowData="rowData"
      @onModal="onModal"
    />
    <importUser-modal
      :dialogVisible1.sync="dialogVisible1"
      @onModal1="onModal1"
    />
  </div>
</template>

<script>
// 通用组件 -- 当前位置、表单、表格+分页、添加模态框
import Current from "@/components/NowLocation/index";
import AttendanceForm from "@/components/QueryForm/index";
import AttendanceTable from "@/components/DataTable/index";
import AddModal from "@/components/ModalBox/addModal/index";

// 业务组件 -- 导入用户模态框
import ImportUserModal from "./components/importUser"

// js文件 -- 传入组件内容、深拷贝、弹框
import { managerUser } from "@/enum/attendance";
import deepCopy from "@/utils/deepCopy"
import { openDel } from "@/utils/messageBox"

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
      dialogVisible1: false,  // 导入用户模态框是否显示
      modalTitle: "", // 模态框标题
      formOptions: managerUser.formOptions, // 表单属性
      btnTools: managerUser.btnTools, // 工具按钮属性
      columnOptions: managerUser.columnOptions, // 列属性
      msgOptions: managerUser.msgOptions, // 模态框属性
      rowData: {},  // 某行数据
      tableData: [], // 页面显示数据 -- 表格
      searchParam: {  // 分页相关
        currPage: 1,
        pageSize: 10,
      },
      count: 0, // 总的数据条数
    };
  },
  created () {
    this.getUserList(1)
  },
  methods: {
    openDel,  // 声明弹框事件
    /**
     * @description 触发搜索
     */
    async onSearch (val) {
      // this.searchParam = val;
      console.log('搜索用户', val);
      if (val.keywords === '1') {
        var res = await this.$request.getUser({
          ...this.searchParam,
          id: val.content
        })
      } else if (val.keywords === '2') {
        var res = await this.$request.getUser({
          ...this.searchParam,
          username: val.content
        })
      } else if (val.keywords === '3') {
        var res = await this.$request.getUser({
          ...this.searchParam,
          telephone: val.content
        })
      } else {
        var res = await this.$request.getUser({
          ...this.searchParam
        })
      }
      if (res && res.code == 0) {
        // this.getAttendanceList(1)
        console.log('搜索用户success')
        this.count = res.data.total
        this.tableData = res.data.list
      }
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      if (val == "addUser") {
        this.rowData = {}
        this.modalTitle = "添加用户"
        this.dialogVisible = true;
      } else {
        this.dialogVisible1 = true;
      }
    },
    /**
     * @description 删除某行数据
     */
    async onTableDel (val) {
      // console.log(val);
      // this.openDel('是否确定删除该用户？')
      var res = await this.$request.delUser({
        id: val.id
      })
      if (res.code == 0) {
        console.log('删除success')
        this.getUserList(1)
      }
    },
    /**
     * @description 编辑某行数据
     */
    onTableEdit (val) {
      var o;
      if (typeof val === 'object') {
        o = deepCopy.copyObject(val);
      } else {
        o = val;
      }
      this.rowData = o
      this.modalTitle = "编辑用户"
      this.dialogVisible = true;
    },
    /**
     * @description 添加用户模态框返回内容
     */
    async onModal (val) {
      if (this.modalTitle == "编辑用户") {
        console.log('编辑val', val);
        const res = await this.$request.editUser({
          id: val.id,
          telephone: val.telephone,
          username: val.username
        })
        if (res.code == 0) {
          // this.getAttendanceList(1)
          console.log('编辑success')
          this.getUserList(1)
        }
      } else {
        const res = await this.$request.addUser({
          ...val
        })
        if (res.code == 0) {
          console.log('添加success')
          this.getUserList(1)
        }
      }
    },
    /**
     * @description 导入用户模态框返回内容
     */
    onModal1 (val) {
      console.log('导入用户',val);
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      const currPage = parseInt(this.count / this.searchParam.pageSize) + 1
      this.getUserList(currPage)
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
      this.searchParam.currPage = page
      const res = await this.$request.getUser({
        ...this.searchParam
      })
      console.log('获取用户数据', res)
      if (res.code == 0 && res.data.list && res.data.total) {
        // this.loading = false
        this.count = res.data.total
        this.tableData = res.data.list
      }
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
