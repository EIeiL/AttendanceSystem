<template>
  <div class="attendance-table">
    <!-- 表格内容 -->
    <el-table
      class="mytable"
      :data="tableData"
      style="width: 90%"
      :default-sort="{ prop: 'date', order: 'descending' }"
      :header-cell-style="tableHeaderColor"
      border
    >
      <el-table-column
        v-for="(item, index) in columnOptions"
        :key="index"
        fixed="right"
        :prop="item.operate ? '' : item.prop"
        :label="item.label"
        :sortable="item.sortable"
      >
        <template slot-scope="scope">
          <div
            v-if="
              item.operate.includes('edit') || item.operate.includes('delete')
            "
          >
            <el-button
              @click="onEdit(scope.row)"
              type="text"
              size="small"
              v-if="item.operate.includes('edit')"
            >
              编辑</el-button
            >
            <el-button
              @click="onDelete(scope.row)"
              type="text"
              size="small"
              class="delColor"
              v-if="
                item.operate.includes('delete') &&
                (item.judgeIf ? !scope.row.ifDel : true)
              "
              >删除</el-button
            >
          </div>
          <div v-else>
            {{ scope.row[item.prop] }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParam.currPage"
        :total="count"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="searchParam.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /**
       * 表格列属性配置
       * 示例：
       * [{
       *   label: '用户名', // label文字
       *   prop: 'username', // 字段名
       *   sortable: true,  // 是否排序
       *   operate: '', // 操作内容
       *   judgeIf: true  // 是否判断具体操作显示
       * }]
       */
    columnOptions: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    searchParam: { // 分页相关数据 - 当前页、每页多少条
      type: Object,
      required: true,
      default () {
        return {}
      }
    },
    count: { // 数据总条数
      type: Number,
      required: true,
      default () {
        return 0
      }
    },
    tableData: { // 表格显示数据
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return { }
  },
  methods: {
    /**
       * @description 编辑某行数据
       */
    onEdit (row) {
      // console.log(row)
      this.$emit('onTableEdit', row)
    },
    /**
       * @description 删除某行数据
       */
    onDelete (row) {
      // console.log(row)
      this.$emit('onTableDel', row)
    },
    /**
       * @description 选择每页多少条
       */
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`);
      this.searchParam.pageSize = val
      this.loading = true
      this.$emit('pageSize', this.searchParam.pageSize)
      // console.log('table',this.tableData);
      // this.getListData(1)
    },
    /**
       * @description 输入页数跳转
       */
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.loading = true
      this.$emit('currPage', val)
      // this.getListData(val)
    },
    /**
       * @description 修改table header的背景色
       */
    tableHeaderColor ({
      row,
      column,
      rowIndex,
      columnIndex
    }) {
      if (rowIndex === 0) {
        return 'background: rgb(242, 242, 242);color: rgb(124, 124, 124)'
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.mytable {
  margin-left: 15px;
}

>>> .el-table .cell {
  text-align: center;
}

.delColor {
  color: red;
}

.block {
  margin-left: 15px;
  margin-top: 20px;
}
</style>
