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
    name: {
      type: String,
      required: true,
    },
    dataValue: {
      type: Array,
      required: true,
    },
    dataName: {
      type: Array,
      required: true,
    },
  },
  watch: {
    dataName: {
      deep: true,
      handler: 'drawChart',
    },
    dataValue: {
      deep: true,
      handler: 'drawChart',
    },
  },
  computed: {
    roseType() {
      return this.isRose ? 'angle' : ''
    },
  },
  methods: {
    drawChart() {
      const myChart = echarts.init(document.getElementById(this.chartID))
      const option = {
        title: {
          text: this.title,
        },
        tooltip: {},
        legend: {
          data: [this.name],
        },
        xAxis: {
          data: this.dataName,
          axisLabel: {
            // X轴倾斜角度
            // rotate: -10,
            //  如果文字太多，默认是间隔显示，设置为0，标示全部显示
            interval: 0,
          },
        },
        yAxis: {},
        series: [{
          name: this.name,
          type: 'bar',
          //  设置柱的宽度，要是数据太少，柱子太宽不美观~
          barWidth: 40,
          data: this.dataValue,
        }],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
  },
  mounted() {
    this.drawChart()
  },
}
</script>
