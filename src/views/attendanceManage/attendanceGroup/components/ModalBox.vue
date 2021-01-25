<template>
  <div class="managerUser-modal">
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="900px">
      <span>
        <!-- 这是一段信息 -->
        <el-form
          :model="group"
          :rules="rules"
          ref="group"
          label-width="120px"
          class="demo-group"
          :before-close="resetForm('user')"
        >
          <el-form-item label="考勤组名称" prop="name">
            <el-input v-model="group.name"></el-input>
          </el-form-item>
          <el-form-item label="参与考勤人员" prop="name">
            <el-button size="small" type="primary">共0人</el-button>
          </el-form-item>
          <el-form-item label="考勤组名称" prop="name">
            <el-radio-group v-model="group.name">
              <el-radio
                label="固定班制（每天考勤时间一样，适用于固定上班时间制的员工）"
              ></el-radio><div></div>
              <el-radio label="大小周制（适用于大小周制的员工）"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考勤时间段" prop="name">
            <span>9:00-12:30，14:00-18:00</span>
          </el-form-item>
          <el-form-item label="休息日选择" prop="name">
            <el-checkbox-group v-model="group.name">
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
              <el-checkbox label="周一" name="type"></el-checkbox>
            </el-checkbox-group>
            
          </el-form-item><el-calendar v-model="value" class="attendance-calendar">
             </el-calendar>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('group')">添 加</el-button>
        <el-button @click="resetForm('group')">取 消</el-button>
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
    modalTitle: {
      type: String,
      default() {
        return "添加用户";
      },
    },
  },
  data() {
    return {
      group: { name: "", phone: "" },
      rules: {
        // 校验规则
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("this.group", this.group);
          // console.log('formName',formName);
          this.$emit("onModal", this.group);
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
.attendance-calendar{
  border: 1px solid #eee;
}
</style>