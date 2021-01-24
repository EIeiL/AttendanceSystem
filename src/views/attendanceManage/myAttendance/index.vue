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
    />
    <!-- 表格+分页 -->
    <attendance-table
      :table-data="tableData"
      :column-options="columnOptions"
      :search-param="searchParam"
      :count="count"
    />
    <myAttendance-modal
      :dialogVisible="dialogVisible"
      @onDialogVisible="onDialogVisible"
      @onModal="onModal"
    />
  </div>
</template>

<script>
// 通用组件 -- 当前位置、表单、表格+分页
import Current from "@/components/NowLocation/index";
import AttendanceForm from "@/components/QueryForm/index";
import AttendanceTable from "@/components/DataTable/index";
import MyAttendanceModal from "./components/ModalBox";

// js文件 -- 传入组件内容
import { myAttendance } from "@/enum/attendance";

const msgOptions = [
  {
    label: "用户姓名",
    prop: "name",
    element: "el-select",
    placeholder: "请选择用户姓名",

    options: [
      {
        label: "张三",
        value: "张三",
      },
      {
        label: "李四",
        value: "李四",
      }
    ],
  },
  {
    label: "考勤时间",
    prop: "time",
    element: "el-date-picker"
  }
];
export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    MyAttendanceModal,
  },
  data() {
    return {
      dialogVisible: false,
      formOptions: myAttendance.formOptions, // 表单属性
      btnTools: myAttendance.btnTools, // 工具按钮属性
      columnOptions: myAttendance.columnOptions, // 列属性
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          noDeleteIf: true,
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
    /**
     * @description 触发搜索
     */
    onSearch(val) {
      this.searchParam = val;
      // console.log(this.searchParam);
      // this.getAdvList()
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn(val) {
      console.log(val);
      this.dialogVisible = true;
    },
    onModal(val) {
      console.log(val);
    },
    onDialogVisible(val) {
      this.dialogVisible = val;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
