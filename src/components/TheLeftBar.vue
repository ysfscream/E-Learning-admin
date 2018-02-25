<template>
  <div class="left-bar-view">
    <el-menu
      router
      class="left-bar"
      background-color="#354959"
      text-color="#fff"
      :default-active="defaultActive">
      <div class="site-title">
        <icon-svg
          class="icon-teacher"
          iconID="icon-teacher_desk">
        </icon-svg>
        <h4 slot="title">易学 教师平台</h4>
      </div>
      <el-menu-item index="/">
        <template slot="title">
          <i class="fas fa-home"></i>
          <touch-ripple>
            <span>首页</span>
          </touch-ripple>
        </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="fas fa-graduation-cap"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item index="/students">
          <touch-ripple>
            学生
          </touch-ripple>
        </el-menu-item>
        <el-menu-item index="/homework">
          <touch-ripple>
            作业
          </touch-ripple>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import { touchRipple } from 'vue-touch-ripple'
import IconSvg from './common/IconSvg'

export default {
  name: 'left-bar-view',
  components: {
    touchRipple,
    IconSvg,
  },
  computed: {
    defaultActive() {
      return `/${this.$route.path.split('/')[1]}`
    },
  },
}
</script>


<style lang="scss" scoped>
.left-bar-view {
  .v-touch-ripple {
    position: relative;
    right: 100px;
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 0 100px 0 100px;
  }
  .left-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    float: left;
    width: 200px;
    z-index: 109;
    border: 1px solid #3b4c5a;
    box-shadow: 0px 5px 20px #475057;
    .site-title {
      color: #ffffff;
      text-align: center;
      padding: 5px;
      border-bottom: 1px solid #3b4c5a;
      background-color: rgb(42, 58,71) !important;
    }
    .el-menu-item.is-active {
      border-left: 3px solid;
      background-color: rgb(42, 58,71) !important;
    }
    .el-submenu.is-active .el-submenu__title {
       .svg-inline--fa {
         color: #18B6E4;
      }
    }
    span {
      padding-left: 5px;
    }
  }
  .icon-teacher {
    margin-top: 5px;
    float: left;
    width: 3rem;
    height: 3rem;
  }
}
</style>
