<template>
  <div class="analysis-container">
    <div class="income-box">
      <div ref="incomeChart" class="chart"></div>
    </div>
  </div>
</template>

<script>
// 引入 ECharts 主模块
let echarts = require('echarts')
// 引入折线图等组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

import * as spend from '@/api/spend'

export default {
  name: 'Analysis',
  data() {
    return {
      spendList: [],
      incomeData: [],
      bRemainingData: [],
      expenditureData: [],
      xAxisData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      spend
        .getAllSpendList()
        .then(res => {
          this.spendList = res.spendList
          this.spendList.forEach(item => {
            this.xAxisData.push(item.title)
            this.incomeData.push(item.income)
            this.bRemainingData.push(item.bRemaining)
            this.expenditureData.push(item.expenditure)
            this.getIncomeChart()
          })
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    chartInit(chart) {
      let option = {
        textStyle: {
          color: '#000',
          fontsize: '16px'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['收入分析', '结余分析', '开支分析'],
          textStyle: {
            color: '#000'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '收入分析',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: this.incomeData
          },
          {
            name: '结余分析',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: this.bRemainingData
          },
          {
            name: '开支分析',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: this.expenditureData
          }
        ]
      }
      let myChart = echarts.init(chart)
      myChart.setOption(option)
    },
    getIncomeChart() {
      this.chartInit(this.$refs.incomeChart, this.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.analysis-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .chart {
    width: 1500px;
    height: 700px;
  }
}
</style>
