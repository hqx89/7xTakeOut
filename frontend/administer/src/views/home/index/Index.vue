<template>
  <div class="box">
    <el-row :gutter="20">
      <!-- 平台商家总数 -->
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>商家总数:</h3>
          <p>300家</p>
        </div>
      </el-col>
      <!-- 平台用户总数 -->
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>用户总数:</h3>
          <p>1000位</p>
        </div>
      </el-col>
      <!-- 平台订单总数 -->
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>订单总数:</h3>
          <p>1235单</p>
        </div>
      </el-col>
      <!-- 平台交易总额 -->
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>交易总额:</h3>
          <p>￥37586</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <!-- 商户分布 -->
      <el-col :span="12">
        <div class="grid-content bg-max">
          <h3>商户城市分布:</h3>
          <div id="box1"></div>
        </div>
      </el-col>
      <!-- 用户分布 -->
      <el-col :span="12">
        <div class="grid-content bg-max">
          <h3>用户城市分布:</h3>
          <div id="box2"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [227, 117, 655],
    };
  },
  methods: {
    // 商户分布
    drawLine1() {
      let myChart = this.$echarts.init(document.getElementById("box1"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list[0], name: "北京" },
              { value: this.list[1], name: "上海" },
              { value: this.list[2], name: "杭州" },
            ],
          },
        ],
      });
    },

    // 用户分布
    drawLine2() {
      let myChart = this.$echarts.init(document.getElementById("box2"));
      myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: this.list[0], name: "北京" },
              { value: this.list[1], name: "上海" },
              { value: this.list[2], name: "杭州" },
            ],
          },
        ],
      });
    },
  },
  mounted() {
    this.drawLine1();
    this.drawLine2();
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 20px;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-min,
.bg-max {
  background: white;
}
.bg-min {
  height: 200px;
  h3 {
    padding: 10px;
    font-size: 16px;
  }
  p {
    font-size: 50px;
    text-align: center;
    line-height: 150px;
  }
}
.bg-max {
  height: 400px;
  h3 {
    padding: 10px;
    font-size: 16px;
  }
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
#box1,
#box2 {
  width: 400px;
  height: 400px;
  margin: 0 auto;
}
</style>