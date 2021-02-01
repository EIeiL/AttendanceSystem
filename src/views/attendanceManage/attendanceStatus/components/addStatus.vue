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
          <el-form-item label="规则设置:" prop="time" ref="timeItem">
            <span v-if="num === '签到正常' || num === '早退'"
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
            <span v-if="num === '迟到转事假' || num === '签退正常'"
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
            <span v-if="num === '迟到'"
              >在<el-time-picker
                placeholder="开始时间段"
                v-model="startTime"
                format="HH:mm:ss"
                valueFormat="HH:mm:ss"
                :picker-options="{
                  selectableRange: '08:30:00 - 20:30:00',
                }"
              >
              </el-time-picker
              >至
              <el-time-picker
                placeholder="结束时间段"
                v-model="endTime"
                format="HH:mm:ss"
                valueFormat="HH:mm:ss"
                :picker-options="{
                  selectableRange: '08:30:00 - 20:30:00',
                }"
              >
              </el-time-picker
              >之间打卡</span
            >
            <span v-if="num === '缺卡'">无打卡记录</span>
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
      startTime: '',
      endTime: '',
      formItem: { value: '', time: '' },
      rules: {
        // 校验规则
        value: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        time: []
      }
    }
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      if (this.formItem.time === '' && this.num !== '缺卡') {
        this.formItem.time = this.startTime + '-' + this.endTime
      }
      this.$refs['formItem'].validate((valid) => {
        if (valid) {
          // console.log('this.formItem', this.formItem)
          const form = JSON.parse(JSON.stringify(this.formItem))
          console.log('form', form)
          this.$emit('onModal', form)
          this.resetForm()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    async resetForm () {
      await this.$refs['formItem'].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    /**
     * @description 下拉框value值改变触发事件
     */
    changeNum (val) {
      this.num = val
      if (this.num === '缺卡') {
        this.rules.time = []
      } else {
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
</style>
