<template>
  <el-aside class="aside-nav" width="210px">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      @select="handleSelect"
    >
      <el-menu-item index="1" class="sidemenu-font">
        <span slot="title">我的考勤</span>
      </el-menu-item>
      <el-menu-item index="2" class="sidemenu-font">
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3" class="sidemenu-font">
        <span slot="title">考勤状态管理</span>
      </el-menu-item>
      <el-menu-item index="4" class="sidemenu-font">
        <span slot="title">考勤组管理</span>
      </el-menu-item>
    </el-menu>
    <div class="asize-border"></div>
  </el-aside>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      toPageName: [
        'myAttendance', 'managerUser', 'attendanceStatus', 'attendanceGroup'
      ]
    }
  },
  created () {
    if (this.$route.name === 'myAttendance') {
      this.activeIndex = '1'
    } else if (this.$route.name === 'managerUser') {
      this.activeIndex = '2'
    } else if (this.$route.name === 'attendanceStatus') {
      this.activeIndex = '3'
    } else if (this.$route.name === 'attendanceGroup') {
      this.activeIndex = '4'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push({
        name: this.toPageName[key - 1]
      }).catch(() => {
      })
    }
  }
}

</script>

<style scoped lang="scss">
.el-menu-vertical-demo {
  .is-active {
    color: #3b79b6;
  }

  .sidemenu-font {
    font-size: 16px;
    text-align: center;
    border-right: none;
  }
}

.el-menu {
  border-right: none;
}
</style>
