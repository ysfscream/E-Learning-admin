<template>
  <div class="edit-teacher-view">
    <el-dialog
      v-loading="loading"
      :element-loading-text="loadingText"
      element-loading-spinner="el-icon-loading"
      center
      fullscreen
      :visible.sync="dialogFormVisible"
      :before-close="handleClose">
      <el-row :gutter="20" class="edit-teacher-form">
        <el-form
          :model="teacherForm"
          :rules="isEdit ? editTeacherRules : {}"
          label-position="top"
          label-width="80px">
          <el-col :span="24">
            <div class="edit-title">
              <h2>教师个人信息</h2>
              <a
                href="javascript:;"
                class="icon-edit"
                :class="isEdit ? 'icon-is-edit' : 'icon-not-edit' "
                @click="isEdit = true">
                <i class="fas fa-edit"></i>
              </a>
            </div>
          </el-col>
          <el-col :span="12">
            <el-form-item label="您的姓名" prop="teacherName">
              <el-input
                v-model="teacherForm.teacherName"
                :disabled="!isEdit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="您的邮箱" prop="email">
              <el-input
                v-model="teacherForm.email"
                :disabled="!isEdit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="您的电话" prop="phone">
              <el-input
                v-model="teacherForm.phone"
                :disabled="!isEdit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="您的办公室" prop="address">
              <el-input
                v-model="teacherForm.address"
                :disabled="!isEdit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="您所在的系别" prop="department">
              <e-learn-select
                v-model="teacherForm.department"
                :data="teacherForm.department"
                url="/departments"
                :disabled="!isEdit">
              </e-learn-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="您的教师格言" prop="description">
              <el-input
                v-model="teacherForm.description"
                :disabled="!isEdit"
                type="textarea">
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
          :disabled="!isEdit"
          type="primary"
          @click="save"
          icon="el-icon-success">确认无误</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import ELearnSelect from '@/components/common/ELearnSelect'

import { mapState } from 'vuex'
import { httpGet, httpPut } from '@/utils/api'

export default {
  name: 'edit-teacher-view',
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
      isEdit: false,
      teacherForm: {},
      editTeacherRules: {
        email: [
          { required: true, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        teacherName: [
          { required: true, message: '请输入您的姓名' },
        ],
      },
    }
  },
  computed: {
    ...mapState({
      id: state => state.account.teacher.id,
    }),
  },
  methods: {
    loadData() {
      this.loading = true
      this.loadingText = '正在加载您的信息...'
      httpGet(`/teachers/info/${this.id}`).then((response) => {
        this.teacherForm = response.data.items
        this.loading = false
        this.isEdit = false
      })
      this.loading = false
    },
    handleClose() {
      if (!this.isEdit) {
        this.$emit('update:dialogFormVisible', false)
      } else {
        this.$confirm('编辑未完成，确认离开？').then(() => {
          this.isEdit = false
          this.$emit('update:dialogFormVisible', false)
        }).catch(() => {})
      }
    },
    save() {
      this.loading = true
      this.loadingText = '正在修改您的信息...'
      const data = this.teacherForm
      httpPut(`/teachers/info/${this.id}`, data).then((response) => {
        if (response.data.status === 201) {
          this.$message.success('修改成功')
          this.$emit('update:dialogFormVisible', false)
        }
        this.loading = false
      })
      this.loading = false
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss" scoped>
.edit-teacher-view {
  .edit-teacher-form {
    padding: 0 25% 0 25%;
  }
  .edit-title {
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 20px;
    padding-bottom: 10px;
    .icon-edit {
      float: right;
      position: relative;
      bottom: 38px;
    }
    .icon-not-edit {
      font-size: 1.2rem !important;
    }
    .icon-is-edit {
      color: gray;
      font-size: 1.2rem !important;
    }
  }

}
</style>
