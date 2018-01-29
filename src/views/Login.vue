<template>
  <div class="main-view">
    <el-card class="form-view">
      <div class="title-view">
        <h1>Neusoft 教师登录</h1>
      </div>
      <el-form>
        <el-form-item>
          <el-input placeholder="请输入教师邮箱">
            <template slot="prepend">
              <i class="fas fa-at"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入密码">
            <template slot="prepend">
              <i class="fas fa-key"></i>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="bottom clearfix">
        <el-checkbox class="remember">记住我</el-checkbox>
        <el-button
          type="primary"
          icon="el-icon-d-arrow-right"
          :loading="false">
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
export default {
  name: 'login-view',
  data() {
    return {
    }
  },
}
</script>


<style lang="scss" scoped>
@import '~@/assets/scss/login-register.scss';
</style>
