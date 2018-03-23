<template>
  <div class="docs-details-view">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/docs' }">文档</el-breadcrumb-item>
          <el-breadcrumb-item>编辑</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form
            :model="docs">
            <el-form-item label="文档标题" prop="title">
              <el-input v-model="docs.title">
              </el-input>
            </el-form-item>
            <el-form-item label="文档标签" prop="tag">
              <e-learn-select
                v-model="docs.tag"
                :data="docs.tag"
                placeholder="选择或输入文档标签来搜索"
                url="/departments/tags">
              </e-learn-select>
            </el-form-item>
            <el-form-item label="文档描述" prop="description">
              <el-input type="textarea" v-model="docs.description">
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
  name: 'docs-details-view',
  components: {
    ELearnSelect,
  },
  data() {
    return {
      docs: {},
    }
  },
  computed: {
    docsId() {
      return this.$route.params.id
    },
    ...mapState({
      id: state => state.account.teacher.id,
    }),
  },
  methods: {
    loadData() {
      httpGet(`/meterials/getDocsInfo/${this.id}?docsId=${this.docsId}`).then((response) => {
        this.docs = response.data.items
      })
    },
    save() {
      const data = this.docs
      httpPut(`/meterials/updateDocs/${this.id}`, data).then((response) => {
        if (response.data.status === 201) {
          this.$message.success('更新成功')
          this.$router.push({ path: '/docs' })
        }
      })
    },
  },
  created() {
    this.loadData()
  },
}
</script>

<style lang="scss">
.docs-details-view {
  .el-card {
    color: #606266;
    .video-description {
      margin: 20px 0 30px 0;
    }
    margin-bottom: 20px;
  }
}
</style>
