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
          :model="status"
          :rules="rules"
          ref="status"
          label-width="100px"
          class="demo-status"
        >
          <el-form-item label="状态名称:" prop="name">
            <el-select v-model="value1" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则设置:" prop="time" required>
            <span v-if="num == 0"
              >在<el-time-select
                v-model="status.time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                placeholder="  时间段"
              >
              </el-time-select
              >之前打卡</span
            >
            <span v-if="num == 1"
              >在<el-time-select
                v-model="status.time"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
                placeholder="  时间段"
              >
              </el-time-select
              >以后打卡</span
            >
            <span v-if="num == 2"
              >在<el-time-select
                placeholder="开始时间段"
                v-model="startTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                }"
              >
              </el-time-select
              >至
              <el-time-select
                placeholder="结束时间段"
                v-model="endTime"
                :picker-options="{
                  start: '08:30',
                  step: '00:15',
                  end: '18:30',
                  minTime: startTime,
                }"
              >
              </el-time-select
              >之间打卡</span
            >
            <span v-if="num == 3">无打卡记录</span>
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
      default: false,
    },
    modalTitle: {
      type: String,
      default () {
        return "添加考勤记录";
      },
    },
  },
  data () {
    return {
      value: {},
      value1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      num: 2,
      startTime: '',
      endTime: '',
      status: { name: "", phone: "", time: "" },
      rules: {
        // 校验规则
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      value: new Date(),
    };
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      this.$refs["status"].validate((valid) => {
        if (valid) {
          // console.log("this.group", this.group);
          this.$emit("onModal", this.status);
          this.$emit("update:dialogVisible", false);
          // this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      this.$refs["status"].resetFields();
      // this.dialogVisible = false;
      this.$emit("update:dialogVisible", false);
    },
  },
};
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