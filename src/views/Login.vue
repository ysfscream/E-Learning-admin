<template>
  <div class="main-view">
    <el-card class="form-view">
      <div class="title-view">
        <h1>Neusoft 教师登录</h1>
      </div>
      <el-form
        ref="login"
        :model="loginForm">
        <el-form-item prop="email">
          <el-input
            placeholder="请输入教师邮箱"
            v-model="loginForm.email">
            <template slot="prepend">
              <i class="fas fa-at"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginForm.password"
            placeholder="请输入密码"
            @keyup.enter.native="login">
            <template slot="prepend">
              <i class="fas fa-key"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="bottom clearfix">
        <el-checkbox v-model="remmber" class="remember">记住我</el-checkbox>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-right"
          :loading="btnLoading"
          @click="login">
          登录
        </el-button>
      </div>
      <div class="footer-view">
        <a href="javascript:;">忘记密码？</a>
        <a href="javascript:;" @click="$router.push({ path: '/register' })">注册</a>
      </div>
    </el-card>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'login-view',
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      remmber: false,
      btnLoading: false,
    }
  },
  methods: {
    login() {
      if (!this.loginForm.email || !this.loginForm.password) {
        this.$notify({
          title: '警告',
          message: '请输入完整的邮箱密码',
          type: 'warning',
        })
        return
      }
      this.btnLoading = true
      const header = {
        Accept: 'application/json',
        'Content-type': 'application/json',
      }
      const data = this.loginForm
      axios({
        header,
        method: 'post',
        url: '/e_api/teachers/login',
        data,
      }).then((response) => {
        if (response.data.status === 200) {
          this.$message({
            message: '登录成功',
            type: 'success',
          })
          this.$router.push({ path: '/' })
        }
      }).catch((error) => {
        this.$message({
          message: error.response.data.message,
          type: 'error',
        })
        this.loginForm.email = ''
        this.loginForm.password = ''
        this.remmber = false
      })
      this.btnLoading = false
    },
  },
  created() {
    this.loginForm.email = this.$route.query.email
  },
}
</script>


<style lang="scss" scoped>
@import '~@/assets/scss/login-register.scss';
</style>
