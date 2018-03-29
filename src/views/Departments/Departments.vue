<template>
  <div class="departments-view">
    <e-learn-header title="学校系别管理">
      <el-button
        slot="createBtn"
        @click="addDepartment"
        type="primary">
        添加系别
      </el-button>
    </e-learn-header>

    <e-learn-null v-if="isEmpty"></e-learn-null>

    <el-card class="box-card">
      <div class="text item" v-for="(item, index) in records" :key="index">
        <i class="fas fa-angle-double-right"></i>
        <span class="item-content">{{ item }}</span>
        <el-button size="mini"  type="danger" @click="deleteData(item)">
          <i class="far fa-trash-alt"></i>
        </el-button>
      </div>
    </el-card>

    <el-dialog
      :show-close="false"
      :visible="dialogFormVisible">
      <el-row :gutter="20" class="edit-teacher-form">
        <el-form
          :model="departmentsForm"
          :rules="{}"
          label-position="top"
          label-width="80px">
          <el-col :span="24">
            <div class="edit-title">
              <h2>创建新的系类</h2>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="系别名称" prop="departmentTitle">
              <el-input v-model="departmentsForm.departmentTitle">
              </el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          icon="el-icon-back">
          离 开
        </el-button>
        <el-button
          type="primary"
          @click="save"
          :loading="loading"
          icon="el-icon-success">
          创 建
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>


<script>
import ELearnHeader from '@/components/common/ELearnHeader'
import ELearnNull from '@/components/common/ELearnNull'

import { httpGet, httpPut, httpDelete } from '@/utils/api'

export default {
  name: 'departments-view',
  components: {
    ELearnHeader,
    ELearnNull,
  },
  data() {
    return {
      isEmpty: false,
      loading: false,
      records: [],
      departmentsForm: {},
      dialogFormVisible: false,
    }
  },
  methods: {
    loadData() {
      httpGet('/departments/departments').then((response) => {
        if (response.data.status === 200) {
          this.records = response.data.items
          if (!this.records.length) {
            this.isEmpty = true
          }
        }
      })
    },
    addDepartment() {
      this.dialogFormVisible = true
    },
    save() {
      const data = this.departmentsForm
      if (Object.keys(this.departmentsForm).length) {
        this.loading = true
        httpPut('/departments/departments', data).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('创建系别成功')
            this.loading = false
            this.dialogFormVisible = false
            this.departmentsForm = {}
            this.loadData()
          }
        }).catch(() => {
          this.loading = false
        })
      } else {
        this.$message.error('请填写表单')
      }
    },
    deleteData(title) {
      this.$confirm('确定要删除该系别吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/departments/departments?departmentTitle=${title}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该系别')
            this.loadData()
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
.departments-view {
  .el-card {
    margin: 30px 0 30px 0;
    color: #606266;
    .item {
      padding: 20px 0;
      border-bottom: 1px solid #E4E7ED;
      .item-content {
        margin: 0 0 0 60px;
      }
      .el-button {
        float: right;
      }
    }
  }
}
</style>
