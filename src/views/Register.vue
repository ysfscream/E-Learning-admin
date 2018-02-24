<template>
  <div class="main-view">
    <el-card class="form-view">
      <div class="title-view">
        <h1>Neusoft 教师注册</h1>
      </div>
      <el-form
        ref="register"
        :model="registerForm"
        :rules="registerRules">
        <el-form-item prop="email">
          <el-input
            placeholder="请输入教师邮箱"
            v-model="registerForm.email">
            <template slot="prepend">
              <i class="fas fa-at"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="teacherName">
          <el-input
            placeholder="请输入教师姓名"
            v-model="registerForm.teacherName">
            <template slot="prepend">
              <i class="far fa-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="registerForm.password">
            <template slot="prepend">
              <i class="fas fa-key"></i>
            </template>
          </el-input>
        </el-form-item>
         <el-form-item prop="confirmPassword">
          <el-input
            type="password"
            v-model="registerForm.confirmPassword"
            placeholder="请再次输入密码">
            <template slot="prepend">
              <i class="far fa-keyboard"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="bottom clearfix">
        <el-button
          type="primary"
          icon="el-icon-d-arrow-right"
          :loading="btnLoading"
          @click="register">
          注册
        </el-button>
      </div>
      <div class="footer-view">
        <a href="javascript:;" @click="$router.push({ path: '/login' })">已有账户？ 登录</a>
      </div>
    </el-card>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  name: 'register-view',
  data() {
    return {
      registerForm: {
        email: '',
        teacherName: '',
        password: '',
        confirmPassword: '',
      },
      registerRules: {
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        teacherName: [
          { required: true, message: '请输入您的姓名' },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码不少于6位' },
        ],
        confirmPassword: [
          { required: true, validator: this.validatePassword },
          { min: 6, message: '密码不少于6位' },
        ],
      },
      btnLoading: false,
    }
  },
  methods: {
    register() {
      this.$refs.register.validate((valid) => {
        if (!valid) {
          return
        }
        this.btnLoading = true
        const header = {
          Accept: 'application/json',
          'Content-type': 'application/json',
        }
        const data = this.registerForm
        axios({
          header,
          method: 'post',
          url: '/e_api/teachers/register',
          data,
        }).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('注册成功')
            this.$router.push({ path: '/login', query: { email: data.email } })
          }
        }).catch((error) => {
          if (error.response.status === 500) {
            this.$message.error('服务器错误')
          } else {
            this.$message.error(error.response.data.message)
          }
        })
        this.btnLoading = false
      })
    },
    validatePassword(rule, value, callback) {
      if (!this.registerForm.confirmPassword) {
        callback(new Error('请输入确认密码'))
        return
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        callback(new Error('前后密码不一致'))
        return
      }
      callback()
    },
  },
}
</script>


<style lang="scss" scoped>
@import '~@/assets/scss/login-register.scss';
</style>
