<template>
  <div class="ppt-view">
    <e-learn-header title="这些是您上传的课件资源">
      <el-button
        slot="createBtn"
        @click="uploadPPT"
        type="primary">
        上传新的课件
      </el-button>
    </e-learn-header>
    <div class="check-ppt">
      <el-row :gutter="20">
        <el-col :span="8">
          <e-learn-select
            v-model="tag"
            :data="tag"
            placeholder="选择或输入课件标签来搜索"
            url="/departments/tags">
          </e-learn-select>
        </el-col>
        <el-col :span="2">
          <el-button
            type="info"
            round
            @click="typeSearch">
            分类查询
          </el-button>
        </el-col>
        <el-col :span="2" style="padding-left:40px;">
          <el-button
            round
            @click="clearQuery">
            清除
          </el-button>
        </el-col>
      </el-row>
    </div>

    <e-learn-null v-if="isEmpty"></e-learn-null>

    <el-card v-if="!isEmpty">
      <el-table
        v-loading="loading"
        ref="multipleTable"
        :data="pptRecords"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="课件标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="课件标签">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="课件描述"
          prop="description">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-button
                round
                size="mini"
                type="success"
                @click="downloadFile(scope.row)">
                <i class="fas fa-download"></i>
              </el-button>
              <el-button
                round
                size="mini"
                type="primary"
                @click="$router.push({
                  path: `/ppt/${scope.row.pptId}`, query: { type: 'edit' }
                })">
                <i class="fas fa-edit"></i>
              </el-button>
              <el-button
                size="mini"
                type="danger"
                round
                @click="deleteData(scope.row.pptId)">
                <i class="fas fa-trash-alt"></i>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-if="total>=1"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog
      center
      width="40%"
      :show-close="false"
      :visible="dialogFormVisible">
      <el-row :gutter="20">
        <el-form
          ref="pptForm"
          :model="pptForm"
          :rules="pptFormRule">
          <el-col :span="12">
            <el-form-item label="课件标题" prop="title">
              <el-input v-model="pptForm.title" placeholder="请输入课件标题">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="课件标签" prop="tag">
              <e-learn-select
                v-model="pptForm.tag"
                :data="pptForm.tag"
                url="/departments/tags">
              </e-learn-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课件描述" prop="description">
              <el-input type="textarea"
                v-model="pptForm.description" placeholder="例如：大三-安卓开发-李老师">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课件文件" prop="ppt">
              <el-upload
                class="upload-ppt"
                drag
                action="/e_api/upload/ppt"
                name="ppt"
                accept="application/vnd.ms-powerpoint"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadSccuess"
                :on-suerror="uploadError"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <i class="fas fa-book"></i>
                    将课件拖到此或 <em>点击</em> 上传到服务器
                  <div class="el-upload__tip" slot="tip">
                    --可以上传PPT文件，刷新页面将自动取消上传--
                  </div>
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-form>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button
          @click="cancelUpload"
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
import ELearnSelect from '@/components/common/ELearnSelect'

import { mapState } from 'vuex'
import { httpGet, httpPut, httpDelete } from '@/utils/api'

export default {
  name: 'ppt-view',
  components: {
    ELearnHeader,
    ELearnNull,
    ELearnSelect,
  },
  data() {
    return {
      tag: '',
      title: '',
      isEmpty: false,
      loading: false,
      dialogFormVisible: false,
      dialogVideoVisible: 0,
      pptForm: {},
      page: 1,
      pageSize: 8,
      total: 0,
      pptFormRule: {
        title: [
          { required: true, message: '请输入课件标题' },
        ],
        tag: [
          { required: true, message: '请输入该课件的课程名' },
        ],
        description: [
          { required: true, message: '请描述该课件' },
        ],
      },
      pptRecords: [],
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
      httpGet(`/meterials/getPPT/${this.id}?page=${this.page}&pageSize=${this.pageSize}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.items.length) {
              this.isEmpty = false
              this.pptRecords = response.data.items
              this.total = response.data.meta.count
              this.loading = false
            } else {
              this.loading = false
              this.pptRecords = []
              this.isEmpty = true
            }
          }
        }).catch(() => {
          this.loading = false
        })
    },
    typeSearch() {
      if (!this.title && !this.tag) {
        this.$message.error('请选择任意一项')
        return
      }
      this.$router.push({
        path: '/ppt',
        query: {
          tag: this.tag,
        },
      })
      this.total = 0
      const url = `/meterials/searchppt/${this.id}?page=${this.page}&pageSize=${this.pageSize}&tag=${this.tag}`
      httpGet(url).then((response) => {
        if (response.status === 200) {
          if (response.data.items.length) {
            this.isEmpty = false
            this.pptRecords = response.data.items
          } else {
            this.pptRecords = []
            this.isEmpty = true
          }
        }
      })
    },
    clearQuery() {
      this.$router.push({
        path: '/ppt',
      })
      this.tag = ''
      this.loadData()
    },
    save() {
      this.$refs.pptForm.validate((valid) => {
        if (!valid) {
          return
        }
        if (!this.pptForm.ppt) {
          this.$message.error('请上传资源文件')
          return
        }
        this.loading = true
        const data = this.pptForm
        httpPut(`/meterials/uploadPPT/${this.id}`, data).then((response) => {
          if (response.status === 201) {
            this.$message.success('课件上传成功')
            this.dialogFormVisible = false
            this.pptForm = {}
            this.$refs.pptForm.resetFields()
            this.page = 1
            this.loadData()
          }
        })
        this.loading = false
      })
    },
    deleteData(id) {
      this.$confirm('确定要删除该课件吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/meterials/deletePPT/${this.id}?pptId=${id}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该课件')
            this.page = 1
            this.loadData()
          }
        })
      }).catch(() => {})
    },
    uploadPPT() {
      this.dialogFormVisible = true
    },
    beforeAvatarUpload(file) {
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 500) {
        this.$message.warning('文件过大！')
        return false
      }
      return fileSize
    },
    uploadSccuess(file) {
      this.pptForm.ppt = file.filename
    },
    uploadError() {
      this.$message.error('上传失败')
    },
    cancelUpload() {
      this.$confirm('取消上传？').then(() => {
        this.dialogFormVisible = false
      }).catch(() => {})
    },
    handleExceed() {
      this.$message.warning('当前限制上传 1 个课件')
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadData()
    },
    downloadFile(ppt) {
      const aTag = document.createElement('a')
      aTag.download = true
      aTag.href = ppt.ppt
      aTag.click()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.ppt-view {
  .el-row {
    .upload-videos {
      text-align: center;
      padding: 20px;
    }
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-top: 10px;
  }
  .delete-all {
    margin: 10px 0 10px 0;
  }
  .check-ppt {
    margin: 30px 0 30px 0;
  }
  .el-upload-dragger {
    border: none;
  }
  .el-upload__tip {
    text-align: center;
    margin: 0px 0 -20px 0;
    color: #F56C6C;
  }
  .ppt-list {
    .el-card {
      color: #606266;
      margin: 10px 0 40px 0;
      height: 180px;
      .text {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:hover {
        box-shadow: 10px 10px 10px #DCDFE6;
        transition: .3s;
      }
      .el-tag {
        margin-top: 30px;
      }
      .el-button {
        color: #F56C6C;
      }
    }
  }
}
</style>
