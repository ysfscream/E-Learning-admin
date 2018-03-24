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
          type: 'category',
          boundaryGap: false,
          data: this.dataName,
          axisLabel: {
            interval: 0,
          },
        },
        yAxis: {
          ype: 'value',
        },
        series: [{
          name: this.name,
          data: this.dataValue,
          type: 'line',
          areaStyle: {},
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
