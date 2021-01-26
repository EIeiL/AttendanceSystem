<template>
  <el-header class="header-bar">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo top-menu"
      mode="horizontal"
      @select="handleSelect"
      hover-text-color="#ffd04b"
    >
      <el-menu-item index="1" class="top-menu-item">主页</el-menu-item>
      <el-menu-item index="2" class="top-menu-item">系统配置</el-menu-item>
      <el-menu-item index="3" class="top-menu-item">考勤管理</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '3',
      toPageName: ['First', 'System', 'Home']
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
      this.activeIndex = key
      this.$router.push({
        name: this.toPageName[key - 1]
      }).catch(() => {
        // console.log('跳转至', this.toPageName[key-1])
        
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.header-bar {
  padding: 0;
}

.top-menu {
  padding-left: 10vw;
  background-color: #3b79b6;

  .top-menu-item {
    color: #fff;
    font-size: 18px;
    width: 180px;
    text-align: center;
  }
}

.el-menu--horizontal > .el-menu-item:not(.is-disabled):hover,
.el-menu--horizontal > .el-submenu .el-submenu__title:hover {
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
}

>>> .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 3px solid #e6a23c;
  color: #303133 !important;
  background-color: #eee !important;
}
</style>
