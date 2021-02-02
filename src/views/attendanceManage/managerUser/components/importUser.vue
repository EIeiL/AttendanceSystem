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
          <el-form-item label="选择文件" prop="file">
            <el-upload
              class="upload-demo"
              ref="upload"
              :limit="1"
              :action="doUpload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="getRes"
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
              <div slot="tip" class="el-upload__tip">
                只能上传xls文件
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload">添 加</el-button>
        <el-button @click="resetForm">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible1: { // 控制模态框是否显示
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      doUpload: '/attendance/users/importUser', // 上传文件接口
      rules: { // 校验规则
        file: [
          { required: true, message: '请选择文件', trigger: 'blur' }
        ]
      },
      fileList: [] // 上传文件列表
    }
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      this.$refs['fileList'].validate((valid) => {
        if (valid) {
          this.$emit('onModal1', this.fileList)
          this.$emit('update:dialogVisible1', false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      this.fileList = []
      this.$emit('update:dialogVisible1', false)
    },
    /**
     * @description 是否在选取文件后立即进行上传
     */
    async submitUpload () {
      await this.$refs.upload.submit()
      // var res = this.$refs.upload.submit()
      // console.log(res, 'res')
      // this.fileList = []
      // this.$emit('update:dialogVisible1', false)
    },
    /**
     * @description 文件列表移除文件时的钩子
     */
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    /**
     * @description 点击文件列表中已上传的文件时的钩子
     */
    handlePreview (file) {
      console.log(file)
    },
    getRes (response, file, fileList) {
      console.log('response', response)
      this.$emit('onModal1', response)
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
</style>
