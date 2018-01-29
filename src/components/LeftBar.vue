<template>
  <div class="left-bar-view">
    <el-menu
      default-active="0"
      class="left-bar"
      background-color="#354959"
      text-color="#fff">
      <div class="site-title">
        <icon-svg
          class="icon-teacher"
          iconID="icon-teacher_desk">
        </icon-svg>
        <h4 slot="title">易学 教师平台</h4>
      </div>
      <el-menu-item index="0">
        <template slot="title">
          <i class="fas fa-home"></i>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="fas fa-graduation-cap"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item index="1-1">学生</el-menu-item>
        <el-menu-item index="1-2">作业</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import IconSvg from './IconSvg'

export default {
  name: 'left-bar-view',
  components: {
    IconSvg,
  },
}
</script>


<style lang="scss" scoped>
.left-bar-view {
  .left-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    float: left;
    width: 200px;
    z-index: 9999;
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

