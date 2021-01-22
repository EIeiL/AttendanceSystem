<template>
  <div class="page">
    <header-bar />
    <el-container>
      <aside-nav />
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import HeaderBar from '@/components/Layout/HeaderBar/index'
  import AsideNav from '@/components/Layout/AsideNav/index'
  export default {
    name: 'Home',
    components: {
      HeaderBar,
      AsideNav
    }
  }

</script>

<style lang="scss">
  .el-main{
    padding: 0;
    border-left: solid 1px #e6e6e6;
    height: calc(100vh - 60px);
  } 
  .system-bgcolor{
    background-color: #3b79b6;
  }
  .system-textcolor{
    color: #3b79b6;
  }
  
</style>
