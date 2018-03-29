<template>
  <div class="share-view">
    <e-learn-header title="这些是您分享的资源网站">
      <el-button
        slot="createBtn"
        @click="dialogFormVisible = true"
        type="primary">
        创建新的分享
      </el-button>
    </e-learn-header>
    <el-card v-if="!isEmpty">
      <el-collapse accordion>
        <el-collapse-item
          v-for="share in sharesRecords"
          :key="share.shareId">
          <template slot="title">
            <h2><a :href="share.shareLink" target="_blank">{{ share.shareTitle }}</a></h2>
          </template>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-input v-model="share.shareTitle"></el-input>
            </el-col>
            <el-col :span="8">
              <el-input v-model="share.shareLink"></el-input>
            </el-col>
            <el-col :span="8">
              <el-button-group>
                <el-button
                  size="mini"
                  type="primary"
                  icon="el-icon-circle-check-outline"
                  @click="save">保存</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="deleteData(share.shareId)">删除</el-button>
              </el-button-group>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-card>

   <e-learn-null v-if="isEmpty"></e-learn-null>

    <el-dialog
      :show-close="false"
      :visible="dialogFormVisible">
      <el-row :gutter="20" class="edit-teacher-form">
        <el-form
          :model="sharesForm"
          :rules="{}"
          label-position="top"
          label-width="80px">
          <el-col :span="24">
            <div class="edit-title">
              <h2>创建新的分享</h2>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分享的标题" prop="shareTitle">
              <el-input v-model="sharesForm.shareTitle">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分享的连接" prop="shareLink">
              <el-input v-model="sharesForm.shareLink">
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

import { mapState } from 'vuex'
import { httpPut, httpGet, httpDelete } from '@/utils/api'


export default {
  name: 'share-view',
  components: {
    ELearnHeader,
    ELearnNull,
  },
  data() {
    return {
      isEmpty: false,
      loading: false,
      dialogFormVisible: false,
      sharesForm: {},
      sharesRecords: [
      ],
    }
  },
  computed: {
    ...mapState({
      id: state => state.account.teacher.id,
    }),
  },
  methods: {
    loadData() {
      httpGet(`/meterials/getShare/${this.id}`).then((response) => {
        if (response.status === 200) {
          if (response.data.items.length !== 0) {
            this.isEmpty = false
            this.sharesRecords = response.data.items
          } else {
            this.sharesRecords = response.data.items
            this.isEmpty = true
          }
        }
      })
    },
    save() {
      this.loading = true
      if (this.dialogFormVisible) {
        const data = this.sharesForm
        if (Object.keys(this.sharesForm).length) {
          httpPut(`/meterials/createShare/${this.id}`, data).then((response) => {
            if (response.status === 201) {
              this.$message.success('创建分享成功')
              this.dialogFormVisible = false
              this.sharesForm = {}
              this.loadData()
            }
          })
        } else {
          this.$message.error('请填写表单')
        }
      } else {
        const data = this.sharesRecords
        httpPut(`/meterials/updateShare/${this.id}`, data).then((response) => {
          if (response.status === 201) {
            this.$message.success('修改分享成功')
            this.dialogFormVisible = false
            this.loadData()
          }
        })
      }
      this.loading = false
    },
    deleteData(id) {
      this.$confirm('确定要删除该分享吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/meterials/deleteShare/${this.id}?shareId=${id}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该分享')
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
.share-view {
  .edit-title {
    border-bottom: 1px solid #E4E7ED;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
  .el-row {
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
    .el-button-group {
      display: inline-block;
      vertical-align: middle;
      margin-top: 5px;
    }
  }
}
</style>
