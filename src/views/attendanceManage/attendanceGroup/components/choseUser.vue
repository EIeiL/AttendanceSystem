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
              <el-checkbox :label="item.id">{{ item.username }}</el-checkbox>
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
    isChoseUser: {// 控制模态框是否显示
      type: Boolean,
      default: false
    },
    choseUsers: {// 控制模态框是否显示
      type: Array,
      default () {
        return []
      }
    },
    modalTitle: {// 控制模态框是否显示
      type: String,
      default: '添加考勤组'
    }
  },
  data () {
    return {
      count: 0, // 加载相关
      counts: [], // 所有人员名单
      search: '', // 输入框内容
      checkd: [], // 选中人员名单
      loading: false,
      chose: {}, // 表单绑定 目前无用
      checkUserList: [], // 选中人员名单
      checkdInit: [], // 初始选中
      users: []
    }
  },
  watch: {
    'choseUsers': {
      handler (val) {
        this.checkd = []
        this.checkdInit = []
        this.checkUserList = []
        for (var i = 0; i < this.choseUsers.length; i++) {
          this.checkd.push(this.choseUsers[i].id)
          this.checkUserList.push(this.choseUsers[i])
        }
        this.checkdInit = this.checkd
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
      const list = this.users.filter(item => {
        return val.includes(item.id)
      })

      const arr1 = list.length > this.checkUserList.length ? list : this.checkUserList
      const arr2 = list.length > this.checkUserList.length ? this.checkUserList : list

      for (var i = 0; i < arr1.length; i++) {
        var isRepetition = 0
        for (var j = 0; j < arr2.length; j++) {
          if (arr1[i].id === arr2[j].id) {
            isRepetition = 1
          }
        }
        if (isRepetition === 0) {
          if (list.length > this.checkUserList.length) {
            this.checkUserList.push(list[i])
          } else {
            this.checkUserList.splice(i, 1)
          }
        }
      }

      // if (list.length > this.checkUserList.length) {
      //   for (var i = 0; i < list.length; i++) {
      //     var isRepetition = 0
      //     for (var j = 0; j < this.checkUserList.length; j++) {
      //       if (list[i].id === this.checkUserList[j].id) {
      //         isRepetition = 1
      //       }
      //     }
      //     if (isRepetition === 0) {
      //       this.checkUserList.push(list[i])
      //     }
      //   }
      // } else {
      //   for (var i1 = 0; i1 < this.checkUserList.length; i1++) {
      //     var isRepetition1 = 0
      //     for (var j1 = 0; j1 < list.length; j1++) {
      //       if (list[j1].id === this.checkUserList[i1].id) {
      //         isRepetition1 = 1
      //       }
      //     }
      //     if (isRepetition1 === 0) {
      //       this.checkUserList.splice(i1, 1)
      //     }
      //   }
      // }
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
      if (res.code === 0) {
        this.counts = []
        if (res.data.length > 0) {
          this.counts = res.data
        }
      }
      if (this.search === '') {
        this.users = this.counts
      }
      this.loading = false
    },
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      const checkUserList = JSON.parse(JSON.stringify(this.checkUserList))
      const obj = {
        choseUsers: checkUserList,
        userIds: this.checkd
      }
      this.$emit('onModal1', obj)
    },
    /**
     * @description 取消/关闭按钮触发事件
     */
    resetForm () {
      this.checkd = this.checkdInit
      this.checkUserList = this.choseUsers
      this.closeUser()
    },
    /**
     * @description 隐藏模态框触发事件
     */
    closeUser () {
      this.$emit('update:isChoseUser', false)
      this.search = ''
      this.getUserList()
    },

    /**
     * @description 删除选中人员
     */
    delUser (index) {
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
