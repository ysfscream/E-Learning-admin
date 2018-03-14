<template>
  <div class="change-password-view">
    <el-dialog
      v-loading="loading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      center
      :visible.sync="dialogFormVisible"
      :before-close="handleClose">
      <el-row :gutter="20" class="edit-teacher-form">
        <el-form
          ref="teacherPasswordForm"
          :model="teacherPasswordForm"
          :rules="changePasswordRules"
          label-position="top"
          label-width="80px">
          <el-col :span="24">
            <div class="edit-title">
              <h2>修改密码</h2>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="旧密码" prop="oldPassword">
              <el-input type="password" v-model="teacherPasswordForm.oldPassword">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="teacherPasswordForm.password">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="确认密码" prop="confirmPassword">
              <el-input type="password" v-model="teacherPasswordForm.confirmPassword">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="handleClose"
          icon="el-icon-back">离 开</el-button>
        <el-button
          type="primary"
          @click="save"
          icon="el-icon-success">确认更改</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import ELearnSelect from '@/components/common/ELearnSelect'

import { mapState } from 'vuex'
import { httpPut } from '@/utils/api'

export default {
  name: 'chpasswordacher-view',
  components: {
    ELearnSelect,
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      loadingText: '',
      teacherPasswordForm: {
        oldPassword: '',
        password: '',
        confirmPassword: '',
      },
      changePasswordRules: {
        oldPassword: [
          { required: true, message: '请输入当前密码' },
          { min: 6, message: '密码不少于6位' },
        ],
        password: [
          { required: true, message: '请输入新密码' },
          { min: 6, message: '密码不少于6位' },
        ],
        confirmPassword: [
          { required: true, validator: this.validatePassword },
          { min: 6, message: '密码不少于6位' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      teacher: state => state.account.teacher,
    }),
  },
  methods: {
    handleClose() {
      this.$confirm('密码未修改，确认离开？').then(() => {
        this.$emit('update:dialogFormVisible', false)
      }).catch(() => {})
    },
    save() {
      this.$refs.teacherPasswordForm.validate((valid) => {
        if (!valid) {
          return
        }
        const id = this.teacher.id
        this.loading = true
        this.loadingText = '正在修改您的密码...'
        const data = {
          oldPassword: this.teacherPasswordForm.oldPassword,
          password: this.teacherPasswordForm.password,
        }
        httpPut(`/teachers/password/${id}`, data).then((response) => {
          if (response.data.status === 201) {
            if (data.oldPassword === data.password) {
              this.$message.info('密码未变更')
              this.$emit('update:dialogFormVisible', false)
              this.teacherPasswordForm = {
                oldPassword: '',
                password: '',
                confirmPassword: '',
              }
            } else {
              this.teacherPasswordForm = {}
              this.$message.success('修改成功, 请重新登录')
              this.$router.push({ path: '/login' })
              this.$emit('update:dialogFormVisible', false)
            }
          }
          this.loading = false
        })
        this.loading = false
      })
    },
    validatePassword(rule, value, callback) {
      if (!this.teacherPasswordForm.confirmPassword) {
        callback(new Error('请输入确认密码'))
        return
      }
      if (this.teacherPasswordForm.password !== this.teacherPasswordForm.confirmPassword) {
        callback(new Error('前后密码不一致'))
        return
      }
      callback()
    },
  },
}
</script>


<style lang="scss" scoped>
.change-password-view {
  .edit-teacher-form {
    padding: 0 15% 0 15%;
  }
  .edit-title {
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }

}
</style>
