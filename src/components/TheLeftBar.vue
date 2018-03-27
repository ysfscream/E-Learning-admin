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
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="fas fa-graduation-cap"></i>
          <span>学生管理</span>
        </template>
        <el-menu-item index="/students">
          学生
        </el-menu-item>
        <el-menu-item index="/homework">
          作业
        </el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fas fa-folder-open"></i>
          <span>资源管理</span>
        </template>
        <el-menu-item index="/ppt">
          课件
        </el-menu-item>
        <el-menu-item index="/docs">
          文档
        </el-menu-item>
        <el-menu-item index="/videos">
          视频
        </el-menu-item>
        <el-menu-item index="/shares">
          分享
        </el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fas fa-comment-alt"></i>
          <span>消息管理</span>
        </template>
        <el-menu-item index="/comment">
          评论
        </el-menu-item>
        <el-menu-item index="/reply">
          回复
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fas fa-sitemap"></i>
          <span>系别管理</span>
        </template>
        <el-menu-item index="/departments">
          系别
        </el-menu-item>
        <el-menu-item index="/professions">
          专业
        </el-menu-item>
        <el-menu-item index="/classes">
          班级
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>


<script>
import IconSvg from './common/IconSvg'

export default {
  name: 'left-bar-view',
  components: {
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
  .left-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    float: left;
    width: 200px;
    z-index: 109;
    border: 1px solid #3b4c5a;
    box-shadow: 0px 5px 20px #475057;
    overflow: scroll;
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
    .left-bar-view .left-bar span[data-v-05766d8b] {
      padding-left: 10px;
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
