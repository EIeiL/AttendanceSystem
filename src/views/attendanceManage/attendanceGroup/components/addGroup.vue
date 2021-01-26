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
          :model="group"
          :rules="rules"
          ref="group"
          label-width="150px"
          class="demo-group"
        >
          <el-form-item label="考勤组名称：" prop="name">
            <el-input v-model="group.name"></el-input>
          </el-form-item>
          <el-form-item label="参与考勤人员：" prop="name">
            <el-button size="small" @click="choseUser">请选择 > </el-button>
          </el-form-item>
          <el-form-item label="考勤组名称：" prop="day">
            <el-radio-group v-model="group.day">
              <el-radio
                label="固定班制（每天考勤时间一样，适用于固定上班时间制的员工）"
              ></el-radio>
              <div style="height: 6px"></div>
              <el-radio label="大小周制（适用于大小周制的员工）"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="考勤时间段：" prop="day">
            <span>9:00-12:30，14:00-18:00</span>
          </el-form-item>
          <el-form-item
            label="休息日选择："
            prop="day"
            class="del-marginBottom"
          >
            <el-checkbox-group v-model="day">
              <el-checkbox label="周一" disabled></el-checkbox>
              <el-checkbox label="周二" disabled></el-checkbox>
              <el-checkbox label="周三" disabled></el-checkbox>
              <el-checkbox label="周四" disabled></el-checkbox>
              <el-checkbox label="周五" disabled></el-checkbox>
              <el-checkbox label="周六"></el-checkbox>
              <el-checkbox label="周日"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-calendar v-model="value" class="attendance-calendar">
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
      default: false,
    },
    isChoseUser: {
      // 控制模态框是否显示
      type: Boolean,
      default: false,
    },
    modalTitle: {
      type: String,
      default () {
        return "添加用户";
      },
    },
    rowData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  watch: {
    'rowData': {
      handler (val) {
        console.log('val', val);
        this.group = val
      },
      deep: true
    }
  },
  data () {
    return {
      timer: null,
      loading: false,
      day: ['周一', '周六', '周日'],
      group: { day: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
      rules: {
        // 校验规则
        day: [{ required: true, message: " ", trigger: "blur" },],
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
    submitForm () {
      this.$refs["group"].validate((valid) => {
        if (valid) {
          // console.log("this.group", this.group);
          this.$emit("onModal", this.group);
          this.$emit("update:dialogVisible", false);
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
      this.$refs["group"].resetFields();
      // this.dialogVisible = false;
      this.$emit("update:dialogVisible", false);
    },
    /**
     * 抽屉加入
     */
    handleClose (done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => { });
    },
    cancelForm () {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    choseUser () {
      console.log('123改变isChoseUser');
      this.$emit("update:isChoseUser", true);
      // console.log('改变dialogVisible1',dialogVisible1);
    }
  }

};
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
</style>