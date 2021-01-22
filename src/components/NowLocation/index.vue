<template>
  <div class="current">
    <span>当前位置>{{ this.$route.meta.title }}</span>
  </div>
</template>

<script>
  export default {

  }

</script>

<style lang="scss" scoped>
  .current {
    border-bottom: 1px solid grey;
    padding: 15px;
    padding-bottom: 10px;
  }

</style>
