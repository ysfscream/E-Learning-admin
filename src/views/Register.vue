<template>
  <div class="main-view">
    <el-card class="form-view">
      <div class="title-view">
        <h1>Neusoft 教师注册</h1>
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
          <el-input placeholder="请输入教师姓名">
            <template slot="prepend">
              <i class="far fa-user"></i>
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
         <el-form-item>
          <el-input placeholder="请再次输入密码">
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
          :loading="false">
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
    return {}
  },
}
</script>


<style lang="scss" scoped>
@import '~@/assets/scss/login-register.scss';
</style>
