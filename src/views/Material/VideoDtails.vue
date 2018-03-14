<template>
  <div class="video-details-view">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/videos' }">视频</el-breadcrumb-item>
          <el-breadcrumb-item>预览</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <h2>{{ title }}</h2>
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
  },
}
</script>
