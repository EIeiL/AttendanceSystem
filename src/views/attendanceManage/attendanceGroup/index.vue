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
    />
    <!-- 模态框 -->
    <!-- <myAttendance-modal
      :dialogVisible.sync="dialogVisible"
      :msgOptions="msgOptions"
      :modalTitle="modalTitle"
      @onModal="onModal"
    /> -->
    <managerUser-modal
      :dialogVisible.sync="dialogVisible"
      :modalTitle="modalTitle"
      :rowData="rowData"
      @onModal="onModal"
    />
  </div>
</template>

<script>
// 通用组件 -- 当前位置、表单、表格+分页
import Current from "@/components/NowLocation/index";
import AttendanceForm from "@/components/QueryForm/index";
import AttendanceTable from "@/components/DataTable/index";
// import MyAttendanceModal from "@/views/attendanceManage/myAttendance/components/ModalBox";
import ManagerUserModal from "./components/ModalBox";

// js文件 -- 传入组件内容
import { attendanceGroup } from "@/enum/attendance";

const msgOptions = [
  {
    label: "用户姓名",
    prop: "name",
    element: "el-select",
    placeholder: "请选择用户姓名",
    rules: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
    options: [
      {
        label: "张三",
        value: "张三",
      },
      {
        label: "李四",
        value: "李四",
      },
    ],
  },
  {
    label: "考勤类型",
    prop: "type",
    element: "el-radio-group",
    rules: [{ required: true, message: "请选择考勤类型", trigger: "blur" }],
    options: [
      {
        label: "张三张三张三张三张三张三张三张三",
        value: "张三张三张三张三张三张三张三张三",
      },
      {
        label: "李四张三张三张三张三张三张三张三",
        value: "李四张三张三张三张三张三张三张三",
      },
    ],
  },
  {
    label: "休息日选择",
    prop: "day",
    element: "el-checkbox-group",
    rules: [{ required: true, message: "请选择休息日", trigger: "blur" }],
    options: [
      {
        label: "张三",
        value: "张三",
      },

      {
        label: "李四",
        value: "李四",
      },
    ],
  },
  {
    label: "考勤时间",
    prop: "time",
    element: "el-time-select",
    rules: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
  },
];

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    // MyAttendanceModal,
    ManagerUserModal,
  },
  data() {
    return {
      dialogVisible: false,
      msgOptions: msgOptions,
      modalTitle: "",
      formOptions: [], // 表单属性
      btnTools: attendanceGroup.btnTools, // 工具按钮属性
      columnOptions: attendanceGroup.columnOptions, // 列属性
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
          noDeleteIf: "true",
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
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn(val) {
      console.log(val);
      this.modalTitle = "添加考勤组";
      this.dialogVisible = true;
    },
    onModal(val) {
      console.log(val);
    },
    onTableDel (val) {
      console.log(val);
      // this.searchParam = val;
      // console.log(this.searchParam);
      // this.getAdvList()
    },
    onTableEdit (val) {
      console.log('编辑', val);
      this.rowData = val
      console.log(this.rowData);
      this.modalTitle = "编辑考勤组"
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
