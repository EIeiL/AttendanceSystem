<template>
  <div class="managerUser-modal">
    <el-dialog :title="modalTitle" :visible.sync="dialogVisible" width="520px">
      <span>
        <!-- 这是一段信息 -->
        <el-form
          :model="user"
          :rules="rules"
          ref="user"
          label-width="120px"
          class="demo-user"
        >
          <span v-if="modalTitle == '添加用户'">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="user.phone"></el-input>
            </el-form-item>
          </span>
          <span v-if="modalTitle == '导入用户'">
            <el-form-item label="选择文件" prop="name">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div> -->
              </el-upload>
            </el-form-item>
          </span>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('user')">添 加</el-button>
        <el-button @click="resetForm('user')">取 消</el-button>
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
      user: { name: "", phone: "" },
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
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
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
          console.log("this.user", this.user);
          // console.log('formName',formName);
          this.$emit("onModal", this.user);
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
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