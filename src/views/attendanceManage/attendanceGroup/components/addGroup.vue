<template>
  <div class="addGroup-modal">
    <el-drawer
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :before-close="resetForm"
      direction="rtl"
      size="800px"
    >
      <div class="demo-drawer__content">
        <el-form
          :model="rowData"
          :rules="rules"
          ref="rowData"
          label-width="150px"
          class="demo-rowData"
        >
          <el-form-item label="考勤组名称：" prop="name">
            <el-input v-model="rowData.name"></el-input>
          </el-form-item>
          <el-form-item label="参与考勤人员：">
            <el-button size="small" v-if="userIds > 0" @click="choseUser"
              >共 {{ userIds }} 人
            </el-button>
            <el-button size="small" v-else @click="choseUser"
              >请选择 >
            </el-button>
          </el-form-item>
          <el-form-item label="考勤组名称：" prop="day">
            <el-radio-group
              v-model="rowData.type"
              @change="dayArr = rowData.type === 0 ? [6, 7] : [7]"
            >
              <el-radio :label="0" value="0"
                >固定班制（每天考勤时间一样，适用于固定上班时间制的员工）</el-radio
              >
              <div style="height: 6px"></div>
              <el-radio :label="1" value="1"
                >大小周制（适用于大小周制的员工）</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考勤时间段：">
            <span>9:00-12:30，14:00-18:00</span>
          </el-form-item>
          <el-form-item
            label="休息日选择："
            prop="day"
            class="del-marginBottom"
          >
            <el-checkbox-group
              v-model="dayArr"
              prop="day"
            >
              <el-checkbox :label="1" disabled>周一</el-checkbox>
              <el-checkbox :label="2" disabled>周二</el-checkbox>
              <el-checkbox :label="3" disabled>周三</el-checkbox>
              <el-checkbox :label="4" disabled>周四</el-checkbox>
              <el-checkbox :label="5" disabled>周五</el-checkbox>
              <el-checkbox :label="6" disabled v-if="rowData.type === 0"
                >周六</el-checkbox
              >
              <el-checkbox :label="6" v-else>周六</el-checkbox>
              <el-checkbox :label="7" disabled v-if="rowData.type === 0"
                >周日</el-checkbox
              >
              <el-checkbox :label="7" v-else>周日</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-calendar v-model="value" class="attendance-calendar">
            <template slot="dateCell" slot-scope="{ date, data }">
              <p :class="dealMyDate(data) ? 'is-selected' : ''">
                {{ data.day.split("-").slice(2).join("-") }}
                <br />
                {{ (dayTitle = dealMyDate(data) ? "放假" : "上班") }}
              </p>
            </template>
          </el-calendar>
          <el-form-item label="考勤状态设置：" prop="day">
            <span>根据已设置好的考勤状态执行。</span>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <!-- <el-button
            type="primary"
            @click="$refs.drawer.closeDrawer()"
            :loading="loading"
            >{{ loading ? "提交中 ..." : "添 加" }}</el-button
          > -->
          <el-button type="primary" @click="submitForm">添 加</el-button>
          <el-button @click="resetForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    dialogVisible: {
      // 控制模态框是否显示
      type: Boolean,
      default: false
    },
    isChoseUser: {
      // 控制模态框是否显示
      type: Boolean,
      default: false
    },
    modalTitle: {
      type: String,
      default () {
        return '添加用户'
      }
    },
    rowData: {
      type: Object,
      default () {
        return {}
      }
    },
    userIds: {
      type: Number,
      default: 0
    }
  },
  watch: {
    rowData: {
      handler (val) {
        console.log('val', val)
        this.group = val
        this.dayArr = [6]
        if (this.rowData.dayoff) {
          const day = this.rowData.dayoff.split(',')
          for (var i = 0; i < day.length; i++) {
            this.dayArr.push(day[i] - 0)
          }
          // console.log('this.day', this.day)
        }
      },
      deep: true
    }
  },
  data () {
    return {
      timer: null,
      loading: false,
      dayArr: [6],
      group: { day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      rules: {
        // 校验规则
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      value: new Date(),
      dayTitle: ''
    }
  },
  methods: {
    /**
     * @description 添加按钮触发事件
     */
    submitForm () {
      this.$refs['rowData'].validate((valid) => {
        if (valid) {
          console.log('this.group', this.group)
          this.rowData.dayoff = ''
          this.rowData.users = []
          for (var i = 0; i < this.dayArr.length; i++) {
            if (i > 0) {
              this.rowData.dayoff += ','
            }
            this.rowData.dayoff += this.dayArr[i]
          }
          if (this.modalTitle === '添加用户') {
            this.$emit('onModal', false)
          } else {
            this.$emit('onModal', true)
          }
          this.$emit('update:dialogVisible', false)
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
      this.$refs['rowData'].resetFields()
      this.$emit('update:dialogVisible', false)
    },
    /**
     * 抽屉加入
     */
    handleClose (done) {
      if (this.loading) {
        return
      }
      this.$confirm('确定要提交表单吗？')
        .then((_) => {
          this.loading = true
          this.timer = setTimeout(() => {
            done()
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false
            }, 400)
          }, 2000)
        })
        .catch((_) => { })
    },
    cancelForm () {
      this.loading = false
      this.dialog = false
      clearTimeout(this.timer)
    },
    choseUser () {
      console.log('改变isChoseUser')
      this.$emit('update:isChoseUser', true)
    },
    /**
     * @description 休息日判断
     */
    dealMyDate (data) {
      // console.log('day.type', data.type)
      console.log('this.dayArr', this.dayArr)
      const weekNum = this.getWeek(data.day)
      let res = ''
      if (this.rowData.type === 0 && (weekNum === '周六' || weekNum === '周日') && data.type === 'current-month') {
        res = 1
      } else if (this.dayArr === [6] && data.type === 'current-month') {
        if (weekNum === '周六') {
          res = 2
        } else if (weekNum === '周日') {
          const abc = data.day.split('-').slice(2).join('-')
          const bcd = abc - 0
          if (bcd % 2 !== 0) {
            res = 3
          }
        }
      } else if (this.dayArr === [7] && data.type === 'current-month') {
        if (weekNum === '周日') {
          res = 2
          // break
        } else if (weekNum === '周六') {
          const abc = data.day.split('-').slice(2).join('-')
          const bcd = abc - 0
          if (bcd % 2 === 0) {
            res = 3
          }
        }
      }
      return res
    },
    /**
       * 根据日期字符串获取星期几
       * @param dateString 日期字符串（如：2020-05-02）
       * @returns {String}
       */
    getWeek (dateString) {
      var dateArray = dateString.split('-')
      var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2])
      return '周' + '日一二三四五六'.charAt(date.getDay())
    }
  }
}
</script>

<style lang="scss" scoped>
>>> .el-input__inner {
  width: 300px;
}
>>> .el-drawer .rtl {
  width: 800px;
}
>>> .el-drawer__header > :first-child {
  font-size: 18px;
}
>>> .el-calendar-table .el-calendar-day {
  padding: 6px;
  height: 65px;
  width: 6px;
}
>>> .el-form-item {
  margin-bottom: 15px;
}
>>> .el-calendar__body {
  padding: 12px 20px 20px;
}
.del-marginBottom {
  margin-bottom: 0px;
}
.attendance-calendar {
  border: 1px solid #eee;
  width: 700px;
  margin-left: 42px;
}
.demo-drawer__footer {
  margin-left: 620px;
}
.is-selected {
  // color: #1989fa;
  background-color: #f2f8fe;
  width: 94px;
  height: 65px;
  float: left;
}
>>> .el-calendar-table .el-calendar-day {
  padding: 0px;
  p {
    display: inline-block;
    width: 94px;
    height: 65px;
  }
}
</style>
