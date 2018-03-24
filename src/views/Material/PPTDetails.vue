<template>
  <div class="ppt-details-view">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/ppt' }">课件</el-breadcrumb-item>
          <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form
            ref="pptForm"
            :rules="pptFormRule"
            :model="ppt">
            <el-form-item label="课件标题" prop="title">
              <el-input v-model="ppt.title">
              </el-input>
            </el-form-item>
            <el-form-item label="课件标签" prop="tag">
              <e-learn-select
                v-model="ppt.tag"
                :data="ppt.tag"
                url="/departments/tags">
              </e-learn-select>
            </el-form-item>
            <el-form-item label="课件描述" prop="description">
              <el-input type="textarea" v-model="ppt.description" placeholder="例如：大三-安卓开发-李老师">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        style="float:right;margin-bottom:20px"
        @click="save">
        完成
      </el-button>
    </el-card>
  </div>
</template>


<script>
import ELearnSelect from '@/components/common/ELearnSelect'
import { mapState } from 'vuex'
import { httpGet, httpPut } from '@/utils/api'

export default {
  name: 'ppt-details-view',
  components: {
    ELearnSelect,
  },
  data() {
    return {
      ppt: {},
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
    }
  },
  computed: {
    pptId() {
      return this.$route.params.id
    },
    ...mapState({
      id: state => state.account.teacher.id,
    }),
  },
  methods: {
    loadData() {
      httpGet(`/meterials/getPPTInfo/${this.id}?pptId=${this.pptId}`).then((response) => {
        this.ppt = response.data.items
      })
    },
    save() {
      this.$refs.pptForm.validate((valid) => {
        if (!valid) {
          return
        }
        const data = this.ppt
        httpPut(`/meterials/updatePPT/${this.id}`, data).then((response) => {
          if (response.data.status === 201) {
            this.$message.success('更新成功')
            this.$router.push({ path: '/ppt' })
          }
        })
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style lang="scss">
.ppt-details-view {
  .el-card {
    color: #606266;
    .video-description {
      margin: 20px 0 30px 0;
    }
    margin-bottom: 20px;
  }
}
</style>
