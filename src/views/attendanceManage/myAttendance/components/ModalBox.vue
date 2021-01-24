<template>
  <div class="myAttendance-modal">
    <el-dialog title="添加考勤记录" :visible.sync="dialogVisible" width="520px">
      <span>
        <!-- 这是一段信息 -->
        <el-form
          :model="attendenceRecord"
          :rules="rules"
          ref="attendenceRecord"
          label-width="120px"
          class="demo-attendenceRecord"
        >
          <el-form-item label="用户姓名" prop="name">
            <el-select
              v-model="attendenceRecord.name"
              placeholder="请选择用户姓名"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="考勤时间" prop="date" required>
            <el-date-picker
              v-model="attendenceRecord.date"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </span>
      <span class="tipText">注：本次的打卡时间不得早于之前的打卡时间</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('attendenceRecord')"
          >添 加</el-button
        >
        <el-button @click="resetForm('attendenceRecord')">取 消</el-button>
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
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      attendenceRecord: { name: "", date: "" },
      rules: {
        // 校验规则
        name: [
          { required: true, message: "请选择用户姓名", trigger: "change" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
      pickerOptions: {
        // 日期时间选择器
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("this.attendenceRecord", this.attendenceRecord);
          // console.log('formName',formName);
          this.$emit("onModal", this.attendenceRecord);
          this.$emit("onDialogVisible", false);
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      // this.dialogVisible = false;
      this.$emit("onDialogVisible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
.tipText {
  color: red;
  // text-align: center;
  margin-left: 120px;
}
</style>