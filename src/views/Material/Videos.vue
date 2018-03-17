<template>
  <div class="video-view">
    <e-learn-header title="这些是您上传的视频资源">
      <el-button
        slot="createBtn"
        @click="uploadVideo"
        type="primary">
        上传新的视频
      </el-button>
    </e-learn-header>
    <div class="check-video">
      <el-row :gutter="20">
        <el-col :span="8">
          <e-learn-select
            v-model="tag"
            :data="tag"
            placeholder="选择或输入视频标签来搜索"
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

    <el-row :gutter="30" class="video-list">
      <el-col :span="6" v-for="(video, index) in videosRecords" :key="index">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <el-tooltip effect="dark" content="点击查看详情" placement="top-start">
                <a
                  href="javascript:;"
                  @click="$router.push({ path: `/videos/${video.videoId}`,
                    query: {
                      url: video.video,
                      title: video.title,
                      description: video.description
                    } })">
                  {{ video.title }}
                </a>
              </el-tooltip>
            </span>
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="deleteData(video.videoId)">
              删除
            </el-button>
          </div>
          <div class="text item">
            {{ video.description }}
          </div>
          <el-tag type="success">{{ video.tag }}</el-tag>
        </el-card>
      </el-col>
    </el-row>

    <el-pagination
      v-if="total>=1"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

    <el-dialog
      center
      width="40%"
      :show-close="false"
      :visible="dialogFormVisible">
      <el-row :gutter="20">
        <el-form
          ref="videosForm"
          :model="videosForm"
          :rules="videosFormRule">
          <el-col :span="12">
            <el-form-item label="视频标题" prop="title">
              <el-input v-model="videosForm.title" placeholder="请输入视频标题">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频类型标签" prop="tag">
              <e-learn-select
                v-model="videosForm.tag"
                :data="videosForm.tag"
                placeholder="选择或输入视频标签"
                url="/departments/tags">
              </e-learn-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="视频描述" prop="description">
              <el-input type="textarea"
                v-model="videosForm.description" placeholder="选择或输入视频描述">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="视频文件" prop="video">
              <el-upload
                class="upload-video"
                drag
                action="/e_api/upload/video"
                name="video"
                accept="video/mp4"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="uploadSccuess"
                :on-suerror="uploadError"
                :before-upload="beforeAvatarUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <i class="far fa-file-video"></i>
                    将视频拖到此或 <em>点击</em> 上传到服务器
                  <div class="el-upload__tip" slot="tip">
                    --只能上传mp4文件，且不超过500MB，刷新页面将自动取消上传--
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
  name: 'video-view',
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
      videosForm: {},
      page: 1,
      pageSize: 8,
      total: 0,
      videosFormRule: {
        title: [
          { required: true, message: '请输入视频标题' },
        ],
        tag: [
          { required: true, message: '请选择该视频的类型' },
        ],
        description: [
          { required: true, message: '请描述该视频' },
        ],
      },
      videosRecords: [],
    }
  },
  computed: {
    ...mapState({
      id: state => state.account.teacher.id,
    }),
    ...mapState({
      token: state => state.account.teacher.token,
    }),
  },
  methods: {
    loadData() {
      httpGet(`/meterials/getVideos/${this.id}?page=${this.page}&pageSize=${this.pageSize}`)
        .then((response) => {
          if (response.status === 200) {
            if (response.data.items.length) {
              this.isEmpty = false
              this.videosRecords = response.data.items
              this.total = response.data.meta.count
            } else {
              this.videosRecords = []
              this.isEmpty = true
            }
          }
        })
    },
    typeSearch() {
      if (!this.title && !this.tag) {
        this.$message.error('请选择任意一项')
        return
      }
      this.$router.push({
        path: '/videos',
        query: {
          tag: this.tag,
        },
      })
      this.total = 0
      const url = `/meterials/searchVideo/${this.id}?page=${this.page}&pageSize=${this.pageSize}&tag=${this.tag}`
      httpGet(url).then((response) => {
        if (response.status === 200) {
          if (response.data.items.length) {
            this.isEmpty = false
            this.videosRecords = response.data.items
          } else {
            this.videosRecords = []
            this.isEmpty = true
          }
        }
      })
    },
    clearQuery() {
      this.$router.push({
        path: '/videos',
      })
      this.tag = ''
      this.loadData()
    },
    save() {
      this.$refs.videosForm.validate((valid) => {
        if (!valid) {
          return
        }
        if (!this.videosForm.video) {
          this.$message.error('请上传资源文件')
          return
        }
        this.loading = true
        const data = this.videosForm
        httpPut(`/meterials/uploadVideo/${this.id}`, data).then((response) => {
          if (response.status === 201) {
            this.$message.success('视频上传成功')
            this.dialogFormVisible = false
            this.videosForm = {}
            this.$refs.videosForm.resetFields()
            this.page = 1
            this.loadData()
          }
        })
        this.loading = false
      })
    },
    deleteData(id) {
      this.$confirm('确定要删除该视频吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        httpDelete(`/meterials/deleteVideo/${this.id}?videoId=${id}`).then((response) => {
          if (response.status === 201) {
            this.$message.success('已删除该视频')
            this.page = 1
            this.loadData()
          }
        })
      }).catch(() => {})
    },
    uploadVideo() {
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
      this.videosForm.video = file.filename
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
      this.$message.warning('当前限制上传 1 个视频')
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadData()
    },
  },
  created() {
    this.loadData()
  },
}
</script>


<style lang="scss">
.video-view {
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
  .check-video {
    margin: 30px 0 20px 0;
  }
  .el-upload-dragger {
    border: none;
  }
  .el-upload__tip {
    text-align: center;
    margin: 0px 0 -20px 0;
    color: #F56C6C;
  }
  .video-list {
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
