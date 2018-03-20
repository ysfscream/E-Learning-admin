<template>
  <div :id="chartID">
  </div>
</template>


<script>
import echarts from 'echarts'

export default {
  name: 'e-learn-pie',
  props: {
    chartID: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    isRose: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    data: {
      deep: true,
      handler: 'drawPie',
    },
  },
  computed: {
    roseType() {
      return this.isRose ? 'angle' : ''
    },
  },
  methods: {
    drawPie() {
      const myChart = echarts.init(document.getElementById(this.chartID))
      const option = {
        title: {
          text: this.title,
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            roseType: this.roseType,
            radius: '65%',
            data: this.data,
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
  },
  mounted() {
    this.drawPie()
  },
}
</script>

