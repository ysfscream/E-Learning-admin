<template>
  <div class="not-found">
    <icon-svg
      class="icon-not-found"
      iconID="icon-msnui-404">
    </icon-svg>
    <a href="javascript:;" @click="$router.push({path: '/' })">返回首页</a>
  </div>
</template>


<script>
import IconSvg from './IconSvg'

export default {
  name: 'not-found',
  components: {
    IconSvg,
  },
}
</script>


<style lang="scss" scoped>
.not-found {
  text-align: center;
  .icon-not-found {
    width: 20rem;
    height: 20rem;
    fill: #818181;
  }
}
</style>
