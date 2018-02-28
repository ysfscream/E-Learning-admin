<template>
  <div class="e-learn-header">
    <el-card class="share-header">
      <h3>{{ title }}</h3>
      <slot name="createBtn">
        <el-button
          type="primary"
          class="create">
          {{ operBtn }}
        </el-button>
      </slot>
    </el-card>
  </div>
</template>


<script>
export default {
  name: 'e-learn-header',
  props: {
    title: {
      type: String,
      required: true,
    },
    operBtn: {
      type: String,
    },
  },
  methods: {
    open() {
    },
  },
}
</script>


<style lang="scss">
.e-learn-header {
  .el-card__body {
    padding: 5px 20px 5px 20px;
  }
  .share-header {
    margin: 95px 0 20px 0;
    h3 {
    margin-right: 70%;
    display: inline-block;
    }
    .el-button {
      position: relative;
      top: 10px;
      float: right;
    }
  }
}
</style>
