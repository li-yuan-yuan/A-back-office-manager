<template>
  <div>
    <div id="main"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "商城管理系统销量",
      },
      tooltip: {},
      legend: {
        data: ["销量"],
      },
      xAxis: {
        data: ["电器", "服饰", "生活用品", "美妆", "图书", "婴幼"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "line",
          data: [25, 66, 56, 40, 22, 30],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  beforeDestroy() {},
};
</script>
<style scoped>
#main {
  width: 1200px;
  height: 600px;
}
</style>