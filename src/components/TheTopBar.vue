<template>
  <div class="top-bar-view">
    <div class="top-bar">
      <div class="top-title">
        <icon-svg
          class="icon-teacher--header"
          iconID="icon-custom-teacher">
        </icon-svg>
       <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            欢迎，{{ teacher.teacherName }}
            <span>
              {{ role }}
            </span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改账户</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import IconSvg from './IconSvg'

export default {
  name: 'top-bar-view',
  components: {
    IconSvg,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState({
      teacher: state => state.account.teacher,
    }),
    role() {
      return this.teacher.role === 'teacher' ? '老师' : '管理员'
    },
  },
  methods: {
    ...mapActions(['TEACHER_LOGOUT']),
    handleCommand(command) {
      if (command === 'logout') {
        this.logout()
      }
    },
    logout() {
      this.TEACHER_LOGOUT()
      this.$router.push('/login')
    },
  },
}
</script>


<style lang="scss" scoped>
.top-bar-view {
  .el-dropdown {
    cursor: pointer;
  }
  .top-bar {
    height: 75px;
    background: #ffffff;
    position: fixed;
    top: 0;
    left: 195px;
    right: 0;
    z-index: 99;
    box-shadow: 0px 5px 10px #f8f5f5;
    .icon-teacher--header {
      position: relative;
      top: 10px;
      right: 10px;
      width: 2.5rem;
      height: 2.5rem;
    }
    .top-title {
      line-height: 75px;
      color: #606266;
      text-align: right;
      margin-right: 30px;
    }
  }
}
</style>

