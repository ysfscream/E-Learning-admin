<template>
  <div class="home-view">
    <the-top-bar/>
    <the-left-bar/>
    <div class="home-content">
      <router-view/>
    </div>
  </div>
</template>


<script>
import TheTopBar from '@/components/TheTopBar'
import TheLeftBar from '@/components/TheLeftBar'

export default {
  name: 'home-view',
  components: {
    TheLeftBar,
    TheTopBar,
  },
}
</script>


<style lang="scss" scoped>
.home-view {
  .home-content {
    margin: 110px 40px 0 240px;
  }
}
</style>

