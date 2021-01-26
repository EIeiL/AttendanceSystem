<template>
  <div class="choseUser-modal">
    <el-dialog
      title="选择用户"
      :visible.sync="isChoseUser"
      width="600px"
      height="300px"
      :before-close="resetForm"
    >
      <span>
        <!-- 这是一段信息 -->
        <el-form :model="status" ref="status" class="demo-status">
          <span class="people-search">
            <el-input v-model="search"></el-input>
          </span>
          <span class="form-left">
            <el-checkbox-group v-model="checkd"
              ><ul class="infinite-list" v-infinite-scroll="load">
                <li v-for="i in counts" class="infinite-list-item">
                  <el-checkbox :label="i"></el-checkbox>
                </li></ul
            ></el-checkbox-group>
          </span>
          <div></div>
          <span class="form-right"
            ><el-form-item>
              <div class="people-title">已选人员:</div>
              <div>
                <el-button class="people-button" v-for="i in checkd"
                  >{{ i }} <span class="red-icon">X</span></el-button
                >
              </div>
            </el-form-item></span
          >
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
    isChoseUser: {
      // 控制模态框是否显示
      type: Boolean,
      default: false,
    }
  },
  data () {
    return {
      count: 0,
      counts: [],
      checkd: [3, 6, 5],
      search: '',
      status: { people: [] },
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
    load () {
      if (this.count < 100) {
        this.count += 2
        this.counts.push(this.count)
      }
    },
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      console.log(this.counts);
      this.$refs["status"].validate((valid) => {
        if (valid) {
          // console.log("this.group", this.group);
          this.$emit("onModal", this.status);
          this.$emit("update:isChoseUser", false);
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
      this.$emit("update:isChoseUser", false);
    },
    delUser (val) {
      console.log('ssss', val);
      this.checkd.splice(val, 1);
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.demo-status {
  display: flex;
  flex-direction: row;
  .people-search {
    position: fixed;
    z-index: 1;
    >>> .el-input {
      width: 250px;
    }
  }
  .form-left {
    z-index: 0;
    margin-top: 20px;
    padding-top: 35px;
    border-right: 1px solid #999;
    width: 320px;
    height: 260px;
    overflow: auto;
  }
  .form-right {
    width: 300px;
    padding-left: 12px;
    .people-button {
      margin-left: 10px;
      margin-top: 8px;
      font-weight: bold;
      background-color: #ddd;
      padding: 8px;
      .red-icon {
        margin-left: 6px;
        color: red;
      }
    }
  }
}
>>> .el-dialog__footer {
  border-top: 1px solid #ccc;
}
</style>