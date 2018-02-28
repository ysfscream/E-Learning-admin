<template>
  <div class="e-learn-null">
    <icon-svg
      class="icon-e-learn-null"
      iconID="icon-xiaolian">
    </icon-svg>
    <h3>这里暂时什么都没有~~</h3>
    <h4>点击右上角创建</h4>
  </div>
</template>


<script>
import IconSvg from './IconSvg'

export default {
  name: 'e-learn-null',
  components: {
    IconSvg,
  },
}
</script>


<style lang="scss" scoped>
.e-learn-null {
  text-align: center;
  .icon-e-learn-null {
    margin-top: 20px;
    width: 5rem;
    height: 5rem;
  }
}
</style>
