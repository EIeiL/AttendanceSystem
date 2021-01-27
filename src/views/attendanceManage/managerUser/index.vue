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

const msgOptions = [
  {
    label: "用户姓名",
    prop: "username",
    element: "el-input",
    placeholder: "请输入用户姓名",
    rules: [
      { required: true, message: "请输入用户项目", trigger: "blur" },
    ]
  }, {
    label: "联系电话",
    prop: "telephone",
    element: "el-input",
    placeholder: "请输入联系电话",
    rules: [
      { required: true, message: "请输入联系电话", trigger: "blur" },
    ]
  }
]


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
      msgOptions: msgOptions,
      modalTitle: "", // 模态框标题
      formOptions: managerUser.formOptions, // 表单属性
      btnTools: managerUser.btnTools, // 工具按钮属性
      columnOptions: managerUser.columnOptions, // 列属性
      rowData: {},  // 某行数据
      tableData: [], // 页面显示数据 -- 表格
      searchParam: {  // 分页相关
        currentPage: 1,
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
    onSearch (val) {
      this.searchParam = val;
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      // console.log(val);
      if (val == "addUser") {
        this.modalTitle = "添加用户"
        this.dialogVisible = true;
      } else {
        this.dialogVisible1 = true;
      }
    },
    /**
     * @description 删除某行数据
     */
    onTableDel (val) {
      console.log(val);
      // this.searchParam = val;
      // console.log(this.searchParam);
      // this.getAdvList()
      this.openDel('是否确定删除该用户？')
    },
    /**
     * @description 编辑某行数据
     */
    onTableEdit (val) {
      console.log('编辑', val);
      // this.rowData = JSON.parse(val)
      var o;
      if (typeof val === 'object') {
        o = deepCopy.copyObject(val);
      } else {
        o = val;
      }
      this.rowData = o
      // console.log(this.rowData);
      this.modalTitle = "编辑用户"
      this.dialogVisible = true;
    },
    /**
     * @description 添加用户模态框返回内容
     */
    onModal (val) {
      console.log(val);
      console.log('编辑之后', val);
      if (this.modalTitle == "编辑用户") {
        this.rowData = val
      }
    },
    /**
     * @description 导入用户模态框返回内容
     */
    onModal1 (val) {
      console.log(val);
    },
    /**
     * @description 获取用户数据
     */
    async getUserList (page) {
      this.searchParam.currPage = page
      console.log('123');
      const res = await this.$request.getUser({
        ...this.searchParam
      })
      console.log('res', res)
      if (res.code == 0) {
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
