<template>
  <div class="add-modal">
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      width="520px"
      :before-close="resetForm"
    >
      <el-form
        :model="formInline"
        :inline="true"
        ref="formInline"
        label-width="120px"
        class="demo-formInline"
      >
        <span v-for="(item, index) in msgOptions" :key="index">
          <el-form-item
            :key="item.prop"
            :prop="item.prop"
            :label="item.label ? item.label + '：' : ''"
            :rules="item.rules"
          >
            <formItem v-model="formInline[item.prop]" :item-options="item" />
          </el-form-item>
        </span>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm" :loading="loading">{{
          loading ? "提交中 ..." : "确 定"
        }}</el-button>
        <el-button @click="resetForm">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import formItem from '@/components/QueryForm/formItems/index'
export default {
  components: {
    formItem
  },
  props: {
    dialogVisible: { // 控制模态框是否显示
      type: Boolean,
      default: false
    },
    msgOptions: { // 表单属性
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    modalTitle: {
      type: String,
      default: '添加'
    },
    rowData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      formInline: {},
      loading: false
    }
  },
  watch: {
    'rowData': {
      handler (val) {
        this.formInline = val
      },
      deep: true
    }
  },
  // model:{
  //   prop: 'modelValue',
  //   event: 'selectData'
  // },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      this.loading = true
      this.$refs['formInline'].validate((valid) => {
        if (valid) {
          this.$emit('onModal', this.formInline)
        } else {
          this.loading = false
        }
      })
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      this.$emit('update:dialogVisible', false)
      this.$refs['formInline'].resetFields()
      this.clickAction()
    },
    /**
     * @description 停止转动
     */
    clickAction () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
</style>
