<template>
  <div class="manage-AttendanceStatus">
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
    <addStatus-modal
      :dialogVisible.sync="dialogVisible"
      :msgOptions="msgOptions"
      :modalTitle="modalTitle"
      @onModal="onModal"
    />
  </div>
</template>

<script>
// 通用组件 -- 当前位置、表单、表格+分页
import Current from '@/components/NowLocation/index'
import AttendanceForm from '@/components/QueryForm/index'
import AttendanceTable from '@/components/DataTable/index'

// 业务组件 -- 添加状态模态框
import AddStatusModal from "./components/addStatus";

// js文件 -- 传入组件内容、深拷贝、弹框
import { attendanceStatus } from '@/enum/attendance'
import deepCopy from "@/utils/deepCopy"
import { openDel } from "@/utils/messageBox"

const msgOptions = [
  {
    label: "用户姓名",
    prop: "name",
    element: "el-select",
    placeholder: "请选择用户姓名",
    rules: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
    ],
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
    label: "考勤类型",
    prop: "type",
    element: "el-radio-group",
    rules: [
      { required: true, message: "请选择考勤类型", trigger: "blur" },
    ],
    options: [
      {
        label: "张三张三张三张三张三张三张三张三",
        value: "张三张三张三张三张三张三张三张三",
      },
      {
        label: "李四张三张三张三张三张三张三张三",
        value: "李四张三张三张三张三张三张三张三",
      }
    ],
  },
  {
    label: "休息日选择",
    prop: "day",
    element: "el-checkbox-group",
    rules: [
      { required: true, message: "请选择休息日", trigger: "blur" },
    ],
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
    element: "el-time-select",
    rules: [
      { required: true, message: "请输入活动名称", trigger: "blur" },
    ],
  }
];

export default {
  components: {
    Current, // 当前位置
    AttendanceForm, // 表单
    AttendanceTable, // 表格+分页
    AddStatusModal  // 添加状态模态框
  },
  data () {
    return {
      dialogVisible: false,  // 模态框是否显示
      msgOptions: msgOptions, // 模态框属性
      modalTitle: "", // 模态框标题
      formOptions: attendanceStatus.formOptions, // 表单属性
      btnTools: attendanceStatus.btnTools, // 工具按钮属性
      columnOptions: attendanceStatus.columnOptions, // 列属性
      tableData: [], // 页面显示数据 -- 表格
      searchParam: { // 分页相关
        currPage: 1,
        pageSize: 10
      },
      count: 0 // 总的数据条数
    }
  },
  created () {
    this.getStatusList(1)
  },
  methods: {
    openDel,  // 声明弹框事件
    /**
     * @description 触发搜索
     */
    onSearch (val) {
      this.searchParam = val
      console.log('搜索考勤状态',this.searchParam);
      // this.getAdvList()
    },
    /**
     * @description 工具按钮返回内容
     */
    toolsBtn (val) {
      console.log('添加考勤状态',val);
      this.modalTitle = "添加状态";
      this.dialogVisible = true;
    },
    /**
     * @description 模态框返回内容
     */
    onModal (val) {
      console.log('添加考勤状态模态框返回',val);
    },
    /**
     * @description 删除某行数据
     */
    async onTableDel (val) {
      // this.openDel('是否确定删除该考勤状态？')
      var res = await this.$request.delStatus({
        id: val.id
      })
      console.log('删除考勤状态',res);
      if (res.code == 0) {
        console.log('删除success')
        this.getStatusList(1)
      }
    },
    /**
     * @description 选择每页数据条数返回内容
     */
    pageSize (val) {
      this.searchParam.pageSize = val
      const currPage = parseInt(this.count / this.searchParam.pageSize) + 1
      this.getStatusList(currPage)
    },
    /**
     * @description 跳转至某一页选择内容
     */
    currPage (val) {
      this.searchParam.currPage = val
      this.getStatusList(this.searchParam.currPage)
    },
    /**
     * @description 获取考勤状态数据
     */
    async getStatusList (page) { // 获取数据列表
      this.searchParam.currPage = page
      const res = await this.$request.getStatus({
        ...this.searchParam
      })
      console.log('获取考勤状态数据', res)
      if (res.code == 0 && res.data.list && res.data.total) {
        // this.loading = false
        this.count = res.data.total
        this.tableData = res.data.list
      }
    },
    /**
     * @description 还没用
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
      this.modalTitle = "编辑考勤状态"
      this.dialogVisible = true;
    },
  }
}

</script>

<style lang="scss" scoped>
</style>
