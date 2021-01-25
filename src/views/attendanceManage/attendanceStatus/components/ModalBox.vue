<template>
  <div class="attendanceStatus-modal">
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
          <el-form-item label="状态名称" prop="name">
            <el-select v-model="status.name" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规则设置" required>
            <span v-if="false">在之前打卡</span>
            <span v-if="false">在以后打卡</span>
            <span v-if="false">在至之间打卡</span>
            <span>无打卡记录</span>
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
      default() {
        return "添加考勤记录";
      },
    },
  },
  data() {
    return {
      status: { name: "", phone: "" },
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
    submitForm() {
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
    resetForm() {
      this.$refs["status"].resetFields();
      // this.dialogVisible = false;
      this.$emit("update:dialogVisible", false);
    },
  },
};
</script>

<style>
</style>