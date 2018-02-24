<template>
  <div class="e-learn-select-view">
    <el-select
      :disabled="disabled"
      placeholder="请选择"
      :value="currentData"
      @change="currentValue"
      @visible-change="getDataList">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { httpGet } from '@/utils/api'

export default {
  name: 'e-learn-select-view',
  props: {
    url: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      required: true,
    },
    data: {
      type: String,
    },
  },
  data() {
    return {
      options: [],
    }
  },
  computed: {
    currentData() {
      return this.data
    },
  },
  methods: {
    laodData() {
      httpGet(this.url).then((response) => {
        this.options = response.data.items
      })
    },
    currentValue(value) {
      this.$emit('input', value)
    },
    getDataList(isSelect) {
      if (isSelect) {
        this.laodData()
      }
    },
  },
}
</script>


<style lang="scss" scoped>
.e-learn-select-view {
  .el-select {
    width: 100%;
  }
}
</style>
