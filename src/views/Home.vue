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
    margin: 80px 20px 0 220px;
  }
}
</style>

