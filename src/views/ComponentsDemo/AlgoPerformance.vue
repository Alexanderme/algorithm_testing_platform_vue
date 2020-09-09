<template>
  <div class="avator-upload components-wrap">
    <div><h2>1:连接需要验证的服务器</h2></div>
    <div><h2>2:当前服务器算法资源占用</h2></div>
    <div><h2>3:当前服务器算法FPS</h2></div>
    <algo-performance-item></algo-performance-item>
  </div>
</template>

<script>
import AlgoPerformanceItem from '@/components/AlgoPerformanceItem'
export default {
  components: {
    AlgoPerformanceItem
  }
}
</script>

<style lang="scss">

</style>
