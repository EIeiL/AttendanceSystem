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
// 通用组件 -- 当前位置、表单、表格+分页
import Current from "@/components/NowLocation/index";
import AttendanceForm from "@/components/QueryForm/index";
import AttendanceTable from "@/components/DataTable/index";
import AddModal from "@/components/ModalBox/addModal/index";

import ImportUserModal from "./components/importUser"

// js文件 -- 传入组件内容
import { managerUser } from "@/enum/attendance";

import deepCopy from "@/utils/deepCopy"
import { openDel } from "@/utils/messageBox"

const msgOptions = [
  {
    label: "用户姓名",
    prop: "name",
    element: "el-input",
    placeholder: "请输入用户姓名",
    rules: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
    ]
  }, {
    label: "联系电话",
    prop: "phone",
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
    AddModal,
    ImportUserModal
  },
  data () {
    return {
      dialogVisible: false,
      dialogVisible1: false,
      msgOptions: msgOptions,
      modalTitle: "",
      formOptions: managerUser.formOptions, // 表单属性
      btnTools: managerUser.btnTools, // 工具按钮属性
      columnOptions: managerUser.columnOptions, // 列属性
      rowData: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ], // 页面显示数据 -- 表格
      searchParam: {
        // 分页相关
        currentPage: 1,
        pageSize: 10,
      },
      count: 0, // 总的数据条数
    };
  },
  methods: {
    openDel,
    /**
     * @description 触发搜索
     */
    onSearch (val) {
      this.searchParam = val;
      // console.log(this.searchParam);
      // this.getAdvList()
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      console.log(val);
      if (val == "addUser") {
        this.modalTitle = "添加用户"
        this.dialogVisible = true;

      } else {
        this.modalTitle = "导入用户"
        this.dialogVisible1 = true;
      }
    },
    onTableDel (val) {
      console.log(val);
      // this.searchParam = val;
      // console.log(this.searchParam);
      // this.getAdvList()
      this.openDel('是否确定删除该用户？')
    },
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
    onModal (val) {
      console.log(val);
      console.log('编辑之后', val);
      if (this.modalTitle == "编辑用户") {
        this.rowData = val
      }
    },
    onModal1 (val) {
      console.log(val);
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
