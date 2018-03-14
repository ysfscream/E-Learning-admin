<template>
  <div class="student-details-view">
    <el-card class="box-card" v-loading="loading">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/students' }">学生</el-breadcrumb-item>
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button style="float: right; margin: -30px 35px 20px 0;font-size: 1rem" type="text">
          <a
            href="javascript:;"
            :class="isEdit ? 'icon-is-edit' : 'icon-not-edit' "
            @click="editData">
            <i class="fas fa-edit"></i>
          </a>
        </el-button>
      </div>
      <div class="text item">
        <el-row :gutter="20" class="edit-teacher-form">
          <el-form
            ref="studentForm"
            :model="studentForm"
            :rules="isEdit ? editStudentRules : {}"
            label-position="top"
            label-width="80px">
            <el-col :span="12">
              <el-form-item label="学号" prop="studentID">
                <el-input
                  v-model="studentForm.studentID"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名" prop="studentName">
                <el-input
                  v-model="studentForm.studentName"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班级" prop="className">
                <el-input
                  v-model="studentForm.className"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="专业" prop="professional">
                <e-learn-select
                  v-model="studentForm.professional"
                  :data="studentForm.professional"
                  :disabled="!isEdit"
                  url="/departments/professional">
                </e-learn-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱" prop="email">
                <el-input
                  v-model="studentForm.email"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" prop="phone">
                <el-input
                  v-model="studentForm.phone"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别" prop="gender">
                <el-radio
                  v-model="studentForm.gender"
                  :disabled="!isEdit"
                  label="男">
                  男
                </el-radio>
                <el-radio
                  v-model="studentForm.gender"
                  :disabled="!isEdit"
                  label="女">
                  女
                </el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item v-if="$route.query.type === 'view'" label="注册时间" prop="createAt">
                <el-input
                  v-model="studentForm.createAt"
                  :disabled="!isEdit">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学生格言" prop="description">
                <el-input
                  v-model="studentForm.description"
                  :disabled="!isEdit"
                  type="textarea">
                </el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
      <el-button type="danger" @click="resetPassword">
        重置学生密码
      </el-button>
    </el-card>
    <div v-if="isEdit" class="operBtn">
      <el-button @click="$router.push({ path: $route.path, query: { type: 'view' } })">
        取消
      </el-button>
      <el-button type="primary" @click="save">
        保存
      </el-button>
    </div>
  </div>
</template>


<script>
import ELearnSelect from '@/components/common/ELearnSelect'

import { httpGet, httpPut } from '@/utils/api'

export default {
  name: 'student-details-view',
  components: {
    ELearnSelect,
  },
  data() {
    return {
      loading: false,
      studentForm: {},
      editStudentRules: {
        studentID: [
          { required: true, message: '请填写学号' },
        ],
        studentName: [
          { required: true, message: '请填写姓名' },
        ],
        className: [
          { required: true, message: '请填写班级' },
        ],
        professional: [
          { required: true, message: '请选择专业' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        gender: [
          { required: true, message: '性别' },
        ],
      },
    }
  },
  computed: {
    isEdit: {
      get() {
        return this.$route.query.type === 'edit'
      },
      set() {
        this.$route.query.type = 'view'
      },
    },
  },
  methods: {
    loadData() {
      this.loading = true
      const id = this.$route.params.id
      httpGet(`/students/${id}`).then((response) => {
        if (response.data.status === 200) {
          this.studentForm = response.data.items.student
        }
        this.loading = false
      })
    },
    editData() {
      if (this.isEdit) {
        return
      }
      this.isEdit = true
      this.$router.push({ path: this.$route.path, query: { type: 'edit' } })
    },
    save() {
      this.$refs.studentForm.validate((valid) => {
        if (!valid) {
          return
        }
        const id = this.studentForm.studentID
        const data = this.studentForm
        httpPut(`/students/info/${id}`, data).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('修改成功')
            this.$router.push({ path: '/students' })
          }
        })
      })
    },
    resetPassword() {
      const id = this.studentForm.studentID
      const data = {
        password: '123456',
      }
      this.$confirm('确定要重置该学生的密码吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpPut(`/students/resetPassword/${id}`, data).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('密码成功重置')
            this.$router.push({ path: '/students' })
          }
        })
      }).catch(() => {})
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.student-details-view {
  .box-card {
    .clearfix {
      span {
        color: #606266;
      }
    }
  }
  .operBtn {
    margin: 20px 60px 50px 0;
    float: right;
  }
}
</style>
