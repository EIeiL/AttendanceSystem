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
        <el-form :model="chose" ref="chose" class="demo-chose">
          <span class="people-search">
            <el-input
              v-model="search"
              placeholder="输入关键字进行搜索"
            ></el-input>
          </span>
          <span class="form-left">
            <el-checkbox-group
              v-model="checkd"
              v-for="(item, index) in users"
              :key="index"
            >
              <el-checkbox :label="item.username"></el-checkbox>
            </el-checkbox-group>
          </span>
          <div></div>
          <span class="form-right"
            ><el-form-item>
              <div class="people-title">已选人员:</div>
              <div>
                <el-button
                  class="people-button"
                  v-for="(item, index) in checkd"
                  :key="index"
                  @click="delUser"
                >
                  {{ item }} <span class="red-icon">X</span>
                </el-button>
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
    },
  },
  data() {
    return {
      count: 0,
      counts: [], // 所有人员名单
      users: [],
      search: "", // 输入框内容
      checkd: [], // 选中人员名单
      chose: {}, // 表单绑定 目前无用
    };
  },
  watch: {
    search: {
      handler(val) {
        this.users = [];
        for (var i = 0; i < this.counts.length; i++) {
          if (this.search == this.counts[i].username) {
            this.users.push(this.counts[i]);
          }
        }
      },
      // deep: true
    },
  },
  created() {
    this.getUserList();
  },
  methods: {
    /**
     * @description 加载姓名列表
     */
    load() {
      if (this.count < this.counts.length) {
        this.count += 1;
      }
    },
    /**
     * @description 获取用户列表
     */
    async getUserList() {
      const res = await this.$request.getMyUser({});
      // console.log('res', res)
      if (res.code == 0 && res.data.length > 0) {
        this.counts = res.data;
        this.users = this.counts;
      }
    },
    /**
     * @description 添加按钮触发事件
     */
    submitForm() {
      this.$emit("onModal1", this.checkd);
      this.resetForm();
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm() {
      // this.$refs["chose"].resetFields();
      this.search = "";
      this.checkd = [];
      this.$emit("update:isChoseUser", false);
    },
    /**
     * @description 删除选中人员
     */
    delUser(val) {
      // console.log("删除人员：", val);
      this.checkd.splice(val, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
>>> .el-dialog__header {
  border-bottom: 1px solid #ccc;
}
.demo-chose {
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
    .el-checkbox{
      font-size: 18px;
    }
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