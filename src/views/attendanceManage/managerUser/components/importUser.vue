<template>
  <div class="importUser-modal">
    <el-dialog
      title="导入用户"
      :visible.sync="dialogVisible1"
      width="520px"
      :before-close="resetForm"
    >
      <span>
        <!-- 这是一段信息 -->
        <el-form
          ref="fileList"
          label-width="120px"
          class="demo-fileList"
          :rules="rules"
        >
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
    dialogVisible1: {
      // 控制模态框是否显示
      type: Boolean,
      default () {
        return false;
      },
    }
  },
  data () {
    return {
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
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
    submitForm () {
      this.$refs['fileList'].validate((valid) => {
        if (valid) {
          // alert("submit!");
          console.log("this.user", this.fileList);
          // console.log('formName',formName);
          this.$emit("onModal1", this.fileList);
          this.$emit("update:dialogVisible1", false);
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
    resetForm (formName) {
      this.$refs['fileList'].resetFields();
      // this.dialogVisible = false;
      this.$emit("update:dialogVisible1", false);
    },


    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
</style>