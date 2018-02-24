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
            <el-dropdown-item command="editTeacherForm">查看个人信息</el-dropdown-item>
            <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 编辑查看教师信息 -->
    <edit-teacher ref="editTeacher" :dialogFormVisible.sync="visible"></edit-teacher>


  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'

import EditTeacher from '../views/Teachers/EditTeacher'
import IconSvg from './common/IconSvg'

export default {
  name: 'top-bar-view',
  components: {
    IconSvg,
    EditTeacher,
  },
  data() {
    return {
      visible: false,
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
      } else if (command === 'editTeacherForm') {
        this.editTeacherForm()
      }
    },
    logout() {
      this.TEACHER_LOGOUT()
      this.$router.push('/login')
    },
    editTeacherForm() {
      this.visible = true
      this.$refs.editTeacher.loadData()
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

