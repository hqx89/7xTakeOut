<template>
  <div class="box">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>店铺订单数:</h3>
          <p>{{ num }}单</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>店铺营业额:</h3>
          <p>{{ total }}元</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>店铺商品种类数:</h3>
          <p>{{ kind }}种</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-min">
          <h3>店铺商品数:</h3>
          <p>{{ goodsNum }}个</p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="grid-content bg-max">
          <div id="box1"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: [],
      store: [],
      total: 0,
      num: 0,
      kind: 0,
      goodsNum: 0,
    };
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("box1"));
      myChart.setOption({
        title: {
          text: "近七日营业额折线图",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["平台平均数", "本店"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["1", "2", "3", "4", "5", "6", "7"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "平台平均数",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "本店",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
    },
  },
  created() {
    this.$store.dispatch("getOrderAsync");
    this.$store.dispatch("getStoreAsync");
    this.order = this.orderList.filter((item) => {
      return (
        item.merchantName == sessionStorage.getItem("merchantName") &&
        item.state == 2
      );
    });
    this.store = this.storeList.filter((item) => {
      return item.merchantName == sessionStorage.getItem("merchantName");
    });
    if (this.order) {
      this.num = this.order.length;
      this.order.forEach((item) => {
        this.total += +item.total;
      });
    }
    if (this.store) {
      this.kind = this.store[0].goodsType.length;
      this.goodsNum = this.store[0].goods.length;
    }
  },
  computed: {
    orderList() {
      return this.$store.state.orderList;
    },
    storeList() {
      return this.$store.state.storeList;
    },
  },
  mounted() {
    this.drawLine();
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-min,
  .bg-max {
    background-color: white;
  }
  .bg-min {
    height: 200px;
    padding: 10px;
    h3 {
      font-size: 16px;
      font-weight: 600;
    }
    p {
      font-size: 50px;
      text-align: center;
      line-height: 150px;
    }
  }
  .bg-max {
    height: 400px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  #box1 {
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}
</style>