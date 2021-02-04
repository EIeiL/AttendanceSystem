<template>
  <div class="addStatus-modal">
    <el-dialog
      :title="modalTitle"
      :visible.sync="dialogVisible"
      width="500px"
      :before-close="resetForm"
    >
      <span>
        <!-- 这是一段信息 -->
        <el-form
          :model="formItem"
          :rules="rules"
          ref="formItem"
          label-width="100px"
          class="demo-status"
        >
          <el-form-item label="状态名称:" prop="value">
            <el-select
              v-model="formItem.value"
              placeholder="请选择"
              @change="changeNum"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="规则设置:"
            :prop="num === '迟到'?'timeLate':'time'"
            ref="timeItem"
          >
            <span v-show="num === '签到正常' || num === '早退'"
              >在<el-time-picker
                v-model="formItem.time"
                :picker-options="{
                  selectableRange: '08:30:00 - 20:30:00',
                }"
                format="HH:mm:ss"
                valueFormat="HH:mm:ss"
                placeholder="  时间段"
              >
              </el-time-picker
              >之前打卡</span
            >
            <span v-show="num === '迟到转事假' || num === '签退正常'"
              >在<el-time-picker
                v-model="formItem.time"
                :picker-options="{
                  selectableRange: '08:30:00 - 20:30:00',
                }"
                format="HH:mm:ss"
                valueFormat="HH:mm:ss"
                placeholder="  时间段"
              >
              </el-time-picker
              >以后打卡</span
            >
            <span v-show="num === '迟到'"
              >在<el-time-picker
                is-range
                v-model="formItem.timeLate"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围"
                format="HH:mm:ss"
                valueFormat="HH:mm:ss"
              ></el-time-picker
              >之间打卡</span
            >
            <span v-show="num === '缺卡'">无打卡记录</span>
            <span else></span>
          </el-form-item>
        </el-form>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">添 加</el-button>
        <el-button @click="resetForm">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      // 控制模态框是否显示
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String,
      default () {
        return '添加考勤记录'
      }
    }
  },
  data () {
    return {
      options: [{
        value: '签到正常',
        label: '签到正常'
      }, {
        value: '迟到',
        label: '迟到'
      }, {
        value: '早退',
        label: '早退'
      }, {
        value: '迟到转事假',
        label: '迟到转事假'
      }, {
        value: '签退正常',
        label: '签退正常'
      }, {
        value: '缺卡',
        label: '缺卡'
      }],
      num: '',
      formItem: {
        value: '',
        time: ''
      },
      rules: {
        // 校验规则
        value: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        time: [{ required: true, message: '请选择', trigger: 'blur' }]
      }
    }
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      this.$refs['formItem'].validate((valid) => {
        if (valid) {
          if (this.num === '迟到') {
            this.formItem.time = this.formItem.timeLate[0] + '-' + this.formItem.timeLate[1]
          }
          delete this.formItem.timeLate
          const form = JSON.parse(JSON.stringify(this.formItem))
          console.log('form', form)
          this.$emit('onModal', form)
          // this.resetForm()
          // this.formItem = { value: '', time: '' }
        }
      })
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    async resetForm () {
      this.num = ''
      await this.$refs['formItem'].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    /**
     * @description 下拉框value值改变触发事件
     */
    changeNum (val) {
      this.formItem.time = ''
      this.num = val
      if (this.num === '缺卡') {
        this.rules.time = []
      } else if (this.num === '迟到') {
        delete this.rules.time
        delete this.formItem.time
        this.rules.timeLate = [{ required: true, message: '请选择11111', trigger: 'blur' }]
        this.rules.time = null
      } else {
        this.rules.timeLate = null
        this.rules.time = [{ required: true, message: '请输入时间', trigger: 'blur' }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-date-editor.el-input {
  width: 95px;
  margin-left: 3px;
  margin-right: 3px;
}
>>> .el-icon-time {
  display: none;
}
>>> .el-input--prefix .el-input__inner {
  padding-left: 10px;
}
>>> .el-input--suffix .el-input__inner {
  padding-right: 10px;
}
>>> .el-range-editor.el-input__inner {
  width: 200px;
}
</style>
