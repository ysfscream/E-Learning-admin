<template>
  <div class="video-details-view">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/videos' }">视频</el-breadcrumb-item>
          <el-breadcrumb-item>预览</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h4>视频标题：</h4>
      <p>{{ title }}</p>
      <h4>视频描述：</h4>
      <p class="video-description">{{ description }}</p>
      <video :src="url" width="100%" controls autoplay>
        您的浏览器不支持 video 标签。
      </video>
    </el-card>
  </div>
</template>


<script>
export default {
  name: 'video-details-view',
  computed: {
    url() {
      return this.$route.query.url
    },
    title() {
      return this.$route.query.title
    },
    description() {
      return this.$route.query.description
    },
  },
}
</script>

<style lang="scss">
.video-details-view {
  .el-card {
    color: #606266;
    .video-description {
      margin: 20px 0 30px 0;
    }
    margin-bottom: 20px;
  }
}
</style>

