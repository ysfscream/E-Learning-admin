<template>
  <div class="main-view">
    <el-card class="form-view">
      <div class="title-view">
        <h1>Neusoft 教师注册</h1>
      </div>
      <el-form
        ref="register"
        :model="teacherForm"
        :rules="registerRules">
        <el-form-item prop="email">
          <el-input
            placeholder="请输入教师邮箱"
            v-model="teacherForm.email">
            <template slot="prepend">
              <i class="fas fa-at"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="teacherName">
          <el-input
            placeholder="请输入教师姓名"
            v-model="teacherForm.teacherName">
            <template slot="prepend">
              <i class="far fa-user"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item  prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="teacherForm.password">
            <template slot="prepend">
              <i class="fas fa-key"></i>
            </template>
          </el-input>
        </el-form-item>
         <el-form-item prop="confirmPassword">
          <el-input
            type="password"
            v-model="teacherForm.confirmPassword"
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
          :loading="btnLoading">
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
export default {
  name: 'register-view',
  data() {
    return {
      teacherForm: {
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
      },
      btnLoading: false,
    }
  },
}
</script>


<style lang="scss" scoped>
@import '~@/assets/scss/login-register.scss';
</style>
