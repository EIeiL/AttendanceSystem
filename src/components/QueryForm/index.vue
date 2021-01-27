<template>
  <el-form
    ref="formRef"
    :inline="true"
    :model="formInline"
    class="demo-form-inline form-padding attendance-form"
  >
    <!-- 表单内容 -->
    <span v-for="(item, index) in formOptions" :key="index">
      <el-form-item
        :key="item.prop"
        :prop="item.prop"
        :label="item.label ? item.label + '：' : ''"
        :rules="item.rules"
      >
        <formItem v-model="formInline[item.prop]" :item-options="item" />
      </el-form-item>
    </span>

    <!-- 按钮组 -->
    <el-form-item v-if="btnItems.includes('search')">
      <el-button type="primary" @click="onSearch">搜索</el-button>
    </el-form-item>
    <el-form-item v-if="btnItems.includes('reset')">
      <el-button type="warning" @click="onReset">重置</el-button>
    </el-form-item>

    <!-- 工具按钮 -->
    <div class="table-tools">
      <el-form-item v-for="(item, index) in btnTools" :key="index">
        <el-button
          type="primary"
          class="system-bgcolor"
          @click="onSubmit(item.prop)"
          :prop="item.prop"
          >{{ item.text }}
        </el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import formItem from './formItems/index'

export default {

  components: {
    formItem
  },

  props: {
    /**
     * 表单配置
     * 示例：
     * [{
     *   label: '用户名', // label文字
     *   prop: 'username', // 字段名
     *   element: 'el-input', // 指定elementui组件
     *   initValue: '阿黄', // 字段初始值
     *   placeholder: '请输入用户名', // elementui组件属性
     *   rules: [{ required: true, message: '必填项', trigger: 'blur' }], // elementui组件属性
     *   events: { // elementui组件方法
     *     input (val) {
     *       console.log(val)
     *     },
     *     ...... // 可添加任意elementui组件支持的方法
     *   }
     *   ...... // 可添加任意elementui组件支持的属性
     * }]
     */
    formOptions: {
      type: Array,
      required: true,
      default () {
        return []
      }
    },
    btnItems: { // 提交按钮项，多个的话用逗号分隔 -- 'search,reset'
      type: String,
      default () {
        return 'search'
      }
    },
    btnTools: { // 工具按钮配置
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },

  data () {
    return {
      formInline: {},
    }
  },

  methods: {
    /**
     * @description 校验
     */
    onValidate (callback) {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          callback()
        }
      })
    },
    /**
     * @description 搜索
     */
    onSearch () {

      this.onValidate(() => {
        
        this.$emit('onSearch', this.formInline)
        // console.log(this.formInline);
      })
    },
    /**
     * @description 重置
     */
    onReset () {
      // console.log(this.$refs['formRef'].resetFields());
      this.$refs.formRef.resetFields()
    },
    /**
     * @description 添加初始值
     */
    addInitValue () {
      const obj = {}
      this.formOptions.forEach(v => {
        if (v.initValue !== undefined) {
          obj[v.prop] = v.initValue
        }
      })
      this.formInline = obj
    },
    /**
     * @description  工具按钮返回值
     */
    onSubmit (val) {
      // console.log(val);
      this.onValidate(() => {
        this.$emit('toolsBtn', val)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.form-padding {
  padding: 15px 15px 0px 15px;
}

>>> .el-button--primary {
  color: #fff;
  background: #3b79b6;
  border-color: #3b79b6;

  &:hover {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }

  &:active {
    background: #3b79b6;
    border-color: #3b79b6;
    color: #fff;
  }
}
</style>
