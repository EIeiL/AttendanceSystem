<template>
  <div class="hello">
    <header-bar />
    <el-container>
      <aside-nav />
      <el-main>
        Hello,this is XieSiwei's practical training project!
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import HeaderBar from '@/components/Layout/HeaderBar/index'
  import AsideNav from '@/components/Layout/AsideNav/index'
  export default {
    name: 'HelloWorld',
    components: {
      HeaderBar,
      AsideNav
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-main{
    padding: 15px;
  }
</style>
