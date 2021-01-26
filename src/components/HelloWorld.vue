<template>
  <div class="hello">
    <header-bar />
    <el-container>
      <el-main>
        <h3>Hello,this is XieSiwei's practical training project!</h3>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import HeaderBar from '@/components/Layout/HeaderBar/index'
  export default {
    name: 'HelloWorld',
    components: {
      HeaderBar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-main{
    padding: 15px;
    text-align: center;
    vertical-align: middle;
    padding-top: 20vh;
    font-size: 32px;
  }
</style>
