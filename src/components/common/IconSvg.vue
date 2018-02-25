<template>
  <svg class="icon-svg" aria-hidden="true">
    <use :xlink:href="`#${iconID}`"></use>
  </svg>
</template>


<script>
export default {
  name: 'icon-svg-view',
  props: {
    iconID: {
      type: String,
      required: true,
    },
  },
}
</script>


<style lang="scss" scoped>
.icon-svg {
  width: 4rem;
  height: 3rem;
}
</style>

