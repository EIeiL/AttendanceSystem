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
          <el-form-item label="选择文件:" prop="file">
            <el-upload
              class="upload-demo"
              ref="upload"
              :limit="999"
              :action="doUpload"
              :on-success="getRes"
              :file-list="fileList"
              :auto-upload="false"
              :on-change="changeBtn"
              :show-file-list="false"
            >
              <el-button slot="trigger" size="small">{{ btnName }}</el-button>
              <div slot="tip" class="el-upload__tip">只能上传xls文件</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpload" :loading="loading">{{
          loading ? "提交中 ..." : "确 定"
        }}</el-button>
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
      loading: false,
      rules: { // 校验规则
        file: [
          { required: true, message: '请选择文件', trigger: 'blur' }
        ]
      },
      fileList: [], // 上传文件列表
      btnName: '选择文件'
    }
  },
  methods: {
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      this.fileList = []
      this.$emit('update:dialogVisible1', false)
      this.btnName = '选择文件'
      this.clickAction()
    },
    /**
     * @description 停止转动
     */
    clickAction () {
      this.loading = false
    },
    /**
     * @description 是否在选取文件后立即进行上传
     */
    submitUpload () {
      this.loading = true
      const uploadFiles = this.$refs.upload.uploadFiles
      this.$refs.upload.uploadFiles = [uploadFiles[uploadFiles.length - 1]]
      this.$refs.upload.submit()
    },
    /**
     * @description 文件列表移除文件时的钩子
     */
    handleRemove (file, fileList) {
      this.fileList = []
      this.btnName = '选择文件'
    },
    /**
     * @description 文件状态改变时的钩子
     */
    changeBtn (file) {
      this.btnName = file.name
    },
    /**
     * @description 文件上传成功时的钩子
     */
    getRes (response, file, fileList) {
      this.$emit('onModal1', response)
      this.btnName = '选择文件'
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
</style>
