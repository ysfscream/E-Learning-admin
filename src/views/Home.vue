<template>
  <div class="home-view">
    <top-bar/>
    <left-bar/>
    <div class="home-content">
      <router-view/>
    </div>
  </div>
</template>


<script>
import TopBar from '@/components/TopBar'
import LeftBar from '@/components/LeftBar'

export default {
  name: 'home-view',
  components: {
    LeftBar,
    TopBar,
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

