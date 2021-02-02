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
              @input="getUserList"
            ></el-input>
          </span>
          <span class="form-left" v-loading="loading">
            <el-checkbox-group
              v-model="checkd"
              v-for="(item, index) in counts"
              :key="index"
              @change="changeChecked"
            >
              <el-checkbox :label="item.id" >{{item.username}}</el-checkbox>
            </el-checkbox-group>
          </span>
          <div></div>
          <span class="form-right"
            ><el-form-item>
              <div class="people-title">已选人员:</div>
              <div>
                <el-button
                  class="people-button"
                  v-for="(item, index) in checkUserList"
                  :key="index"
                  @click="delUser(index)"
                >
                  {{ item.username }} <span class="red-icon">X</span>
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
      default: false
    },
    choseUsers: {
      // 控制模态框是否显示
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      count: 0,
      counts: [], // 所有人员名单
      search: '', // 输入框内容
      checkd: [], // 选中人员名单
      loading: false,
      chose: {}, // 表单绑定 目前无用
      checkUserList: []// 选中人员名单
    }
  },
  watch: {
    'choseUsers': {
      handler (val) {
        this.checkd = []
        for (var i = 0; i < this.choseUsers.length; i++) {
          this.checkd.push(this.choseUsers[i].id)
        }
        // this.checkd = this.choseUsers
      },
      deep: true
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    /**
     * @description 复选框选中触发事件
     */
    changeChecked (val) {
      const list = this.counts.filter(item => {
        return val.includes(item.id)
      })
      this.checkUserList = list
    },
    /**
     * @description 加载姓名列表
     */
    load () {
      if (this.count < this.counts.length) {
        this.count += 1
      }
    },
    /**
     * @description 获取用户列表
     */
    async getUserList () {
      this.loading = true
      const res = await this.$request.getMyUser({
        username: this.search
      })
      // console.log('res', res)
      if (res.code === 0) {
        this.counts = []
        if (res.data.length > 0) {
          // for (var i = 0; i < res.data.length; i++) {
          //   this.counts.push(res.data[i].username)
          // }
          this.counts = res.data
        }
      }
      this.loading = false
    },
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      // let ids = []
      // this.checkUserList.forEach(item => {
      //   ids.push(item.id)
      // })
      const checkUserList = JSON.parse(JSON.stringify(this.checkUserList))
      this.$emit('update:choseUsers', checkUserList)
      this.$emit('update:userIds', this.checkd)
      this.$emit('onModal1')
      this.search = ''
      this.resetForm()
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      // this.$refs["chose"].resetFields();
      this.search = ''
      // this.checkd = []
      this.$emit('update:isChoseUser', false)
    },
    /**
     * @description 删除选中人员
     */
    delUser (index) {
      // console.log("删除人员：", val);
      this.checkUserList.splice(index, 1)
      let ids = []
      this.checkUserList.forEach(item => {
        ids.push(item.id)
      })
      this.checkd = ids
    }
  }
}
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
    .el-checkbox {
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
