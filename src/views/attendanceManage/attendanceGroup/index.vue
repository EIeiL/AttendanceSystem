<template>
  <div class="manage-AttendanceGroup">
    <!-- 当前位置 -->
    <current />
    <!-- 表单 -->
    <attendance-form :btn-tools="btnTools" @toolsBtn="toolsBtn" :btn-items="''" :form-options="formOptions" />
    <!-- 表格+分页 -->
    <attendance-table :table-data="tableData" :column-options="columnOptions" :search-param="searchParam"
      :count="count" />
  </div>
</template>

<script>
  // 通用组件 -- 当前位置、表单、表格+分页
  import Current from '@/components/NowLocation/index'
  import AttendanceForm from '@/components/QueryForm/index'
  import AttendanceTable from '@/components/DataTable/index'

  // js文件 -- 传入组件内容
  import {
    attendanceGroup
  } from '@/enum/attendance'

  export default {
    components: {
      Current, // 当前位置
      AttendanceForm, // 表单
      AttendanceTable // 表格+分页
    },
    data() {
      return {
        formOptions: [], // 表单属性
        btnTools: attendanceGroup.btnTools, // 工具按钮属性
        columnOptions: attendanceGroup.columnOptions, // 列属性
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          noDeleteIf: 'true'
        }], // 页面显示数据 -- 表格
        searchParam: { // 分页相关
          currentPage: 1,
          pageSize: 10
        },
        count: 0 // 总的数据条数
      }
    },
    methods: {
      /**
       * @description 工具按钮返回内容
       */
      toolsBtn(val) {
        console.log(val);
      },
    },
  }

</script>

<style lang="scss" scoped>
</style>
