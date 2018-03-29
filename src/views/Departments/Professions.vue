<template>
  <div class="professions-view">
    <e-learn-header title="学校专业管理">
      <el-button
        slot="createBtn"
        @click="addprofession"
        type="primary">
        添加专业
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
          :model="professionsForm"
          :rules="{}"
          label-position="top"
          label-width="80px">
          <el-col :span="24">
            <div class="edit-title">
              <h2>创建新的系类</h2>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="专业名称" prop="professionTitle">
              <el-input v-model="professionsForm.professionTitle">
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
  name: 'professions-view',
  components: {
    ELearnHeader,
    ELearnNull,
  },
  data() {
    return {
      isEmpty: false,
      loading: false,
      records: [],
      professionsForm: {},
      dialogFormVisible: false,
    }
  },
  methods: {
    loadData() {
      httpGet('/departments/professions').then((response) => {
        if (response.data.status === 200) {
          this.records = response.data.items
          if (!this.records.length) {
            this.isEmpty = true
          }
        }
      })
    },
    addprofession() {
      this.dialogFormVisible = true
    },
    save() {
      const data = this.professionsForm
      if (Object.keys(this.professionsForm).length) {
        this.loading = true
        httpPut('/departments/professions', data).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('创建专业成功')
            this.loading = false
            this.dialogFormVisible = false
            this.professionsForm = {}
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
      this.$confirm('确定要删除该专业吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/departments/professions?professionTitle=${title}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该专业')
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
.professions-view {
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

