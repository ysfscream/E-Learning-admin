<template>
  <div class="docs-view">
    <e-learn-header title="这些是您上传的文档资源">
      <el-button
        slot="createBtn"
        @click="uploadDoc"
        type="primary">
        上传新的文档
      </el-button>
    </e-learn-header>
    <div class="check-docs">
      <el-row :gutter="20">
        <el-col :span="8">
          <e-learn-select
            v-model="tag"
            :data="tag"
            placeholder="选择或输入文档标签来搜索"
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
        :data="docsRecords"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          label="文档标题"
          prop="title">
        </el-table-column>
        <el-table-column
          label="文档标签">
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="文档描述"
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
                <i class="fas fa-eye"></i>
              </el-button>
              <el-button
                round
                size="mini"
                type="primary"
                @click="$router.push({
                  path: `/docs/${scope.row.docsId}`, query: { type: 'edit' }
                })">
                <i class="fas fa-edit"></i>
              </el-button>
              <el-button
                size="mini"
                type="danger"
                round
                @click="deleteData(scope.row.docsId)">
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
          ref="docsForm"
          :model="docsForm"
          :rules="docsFormRule">
          <el-col :span="12">
            <el-form-item label="文档标题" prop="title">
              <el-input v-model="docsForm.title" placeholder="请输入文档标题">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文档类型标签" prop="tag">
              <e-learn-select
                v-model="docsForm.tag"
                :data="docsForm.tag"
                placeholder="选择或输入文档标签"
                url="/departments/tags">
              </e-learn-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文档描述" prop="description">
              <el-input type="textarea"
                v-model="docsForm.description" placeholder="选择或输入文档描述">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="文档文件" prop="video">
              <el-upload
                class="upload-docs"
                drag
                action="/e_api/upload/docs"
                name="docs"
                accept="application/pdf"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadSccuess"
                :on-suerror="uploadError"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <i class="fas fa-book"></i>
                    将文档拖到此或 <em>点击</em> 上传到服务器
                  <div class="el-upload__tip" slot="tip">
                    --可以上传PDF文件，刷新页面将自动取消上传--
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
  name: 'docs-view',
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
      docsForm: {},
      page: 1,
      pageSize: 8,
      total: 0,
      docsFormRule: {
        title: [
          { required: true, message: '请输入文档标题' },
        ],
        tag: [
          { required: true, message: '请选择该文档的类型' },
        ],
        description: [
          { required: true, message: '请描述该文档' },
        ],
      },
      docsRecords: [],
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
      httpGet(`/meterials/getDocs/${this.id}?page=${this.page}&pageSize=${this.pageSize}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.items.length) {
              this.isEmpty = false
              this.docsRecords = response.data.items
              this.total = response.data.meta.count
              this.loading = false
            } else {
              this.loading = false
              this.docsRecords = []
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
        path: '/docs',
        query: {
          tag: this.tag,
        },
      })
      this.total = 0
      const url = `/meterials/searchDocs/${this.id}?page=${this.page}&pageSize=${this.pageSize}&tag=${this.tag}`
      httpGet(url).then((response) => {
        if (response.status === 200) {
          if (response.data.items.length) {
            this.isEmpty = false
            this.docsRecords = response.data.items
          } else {
            this.docsRecords = []
            this.isEmpty = true
          }
        }
      })
    },
    clearQuery() {
      this.$router.push({
        path: '/docs',
      })
      this.tag = ''
      this.loadData()
    },
    save() {
      this.$refs.docsForm.validate((valid) => {
        if (!valid) {
          return
        }
        if (!this.docsForm.doc) {
          this.$message.error('请上传资源文件')
          return
        }
        this.loading = true
        const data = this.docsForm
        httpPut(`/meterials/uploadDocs/${this.id}`, data).then((response) => {
          if (response.status === 201) {
            this.$message.success('文档上传成功')
            this.dialogFormVisible = false
            this.docsForm = {}
            this.$refs.docsForm.resetFields()
            this.page = 1
            this.loadData()
          }
        })
        this.loading = false
      })
    },
    deleteData(id) {
      this.$confirm('确定要删除该文档吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/meterials/deleteDocs/${this.id}?docsId=${id}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该文档')
            this.page = 1
            this.loadData()
          }
        })
      }).catch(() => {})
    },
    uploadDoc() {
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
      this.docsForm.doc = file.filename
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
      this.$message.warning('当前限制上传 1 个文档')
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadData()
    },
    downloadFile(docs) {
      const aTag = document.createElement('a')
      aTag.download = true
      aTag.href = docs.doc
      aTag.click()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.docs-view {
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
  .check-docs {
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
  .docs-list {
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
