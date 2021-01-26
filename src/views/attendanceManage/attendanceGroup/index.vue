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
    <addGroup-modal
      :dialogVisible.sync="dialogVisible"
      :modalTitle="modalTitle"
      :rowData="rowData"
      :isChoseUser.sync="isChoseUser"
      @onModal="onModal"
    />
    <choseUser-modal :isChoseUser.sync="isChoseUser" @onModal1="onModal1" />
  </div>
</template>

<script>
// 通用组件 -- 1当前位置、2表单、3表格+分页
import Current from "@/components/NowLocation/index";
import AttendanceForm from "@/components/QueryForm/index";
import AttendanceTable from "@/components/DataTable/index";

// 业务组件 -- 1新增+编辑模态框、2选择人员模态框
import AddGroupModal from "./components/addGroup";
import ChoseUserModal from "./components/choseUser";

// js文件 -- 传入组件内容
import { attendanceGroup } from "@/enum/attendance";

import deepCopy from "@/utils/deepCopy"
import { openDel, test } from "@/utils/messageBox"

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    // MyAttendanceModal,
    AddGroupModal,  // 新增+编辑模态框
    ChoseUserModal  // 选择人员模态框
  },
  data () {
    return {
      rowData: {},
      dialogVisible: false, // 控制新增+编辑模态框是否显示
      isChoseUser: false,  // 控制选择人员模态框是否显示
      modalTitle: "", // 模态框标题
      formOptions: [], // 表单属性
      btnTools: attendanceGroup.btnTools, // 工具按钮属性
      columnOptions: attendanceGroup.columnOptions, // 列属性
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          noDeleteIf: "true",
          day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
      ], // 页面显示数据 -- 表格
      searchParam: {  // 分页相关
        currentPage: 1,
        pageSize: 10,
      },
      count: 0, // 总的数据条数
    };
  },
  created () {
    // openDel()
  },
  methods: {
    openDel,
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      console.log(val);
      this.modalTitle = "添加考勤组";
      this.dialogVisible = true;
    },
    /**
     * @description 新增+编辑模态框返回内容
     */
    onModal (val) {
      console.log(val);
    },
    /**
     * @description 选择人员模态框返回内容
     */
    onModal1 (val) {
      console.log(val);
    },
    /**
     * @description 点击删除触发事件
     */
    onTableDel (val) {
      console.log(val);
      this.openDel('是否确定删除该考勤组？')
    },
    /**
     * @description 点击编辑触发事件
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
      this.modalTitle = "编辑考勤组"
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
