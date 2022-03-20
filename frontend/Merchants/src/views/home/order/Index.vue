<template>
  <div class="box">
    <div class="input">
      <el-input placeholder="联系电话" v-model="input" clearable></el-input>
    </div>
    <el-button type="primary" class="btn" size="small" @click="search"
      >查询</el-button
    >
    <el-button type="info" class="btn" size="small" @click="reset"
      >重置</el-button
    >

    <!-- 商家列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="id" label="订单号" width="230" fixed>
      </el-table-column>
      <el-table-column prop="orderName" label="订单内容" width="300">
      </el-table-column>
      <el-table-column prop="total" label="订单价格(元)" width="110">
      </el-table-column>
      <el-table-column prop="takeName" label="收货人" width="150">
      </el-table-column>
      <el-table-column prop="takePhone" label="联系电话" width="150">
      </el-table-column>
      <el-table-column prop="address" label="配送地址" width="300">
      </el-table-column>
      <el-table-column prop="date" label="下单时间" width="200" sortable>
      </el-table-column>
      <el-table-column label="状态" width="100" fixed="right">
        <template slot-scope="scope">
          <p v-show="scope.row.state == 1" class="red">未接单</p>
          <p v-show="scope.row.state == 0" class="gray">未支付</p>
          <p v-show="scope.row.state == 2" class="green">已完成</p>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="order ? order.length : 0"
      :page-size="5"
      @current-change="handleCurrentChange"
      class="page"
      :disabled="disabled"
    >
    </el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      input: "",
      tableData: [],
      order: [],
      disabled: false,
    };
  },
  methods: {
    handleCurrentChange(n) {
      this.tableData = this.order.slice((n - 1) * 5, n * 5);
    },

    search() {
      this.disabled = true;
      this.tableData = this.order.filter((item) => {
        return item.takePhone == this.input;
      });
    },
    reset() {
      this.tableData = this.order.slice(0, 5);
      this.disabled = false;
      this.input = "";
    },
  },
  created() {
    this.$store.dispatch("getOrderAsync");
    this.order = this.orderList.filter((item) => {
      return item.merchantName == sessionStorage.getItem("merchantName");
    });
    if (this.order) {
      this.tableData = this.order.slice(0, 5);
    }
  },
  computed: {
    orderList() {
      return this.$store.state.orderList;
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
  .input {
    display: inline-block;
    margin-top: 20px;
    width: 200px;
    margin-left: 30px;
  }
  .btn {
    display: inline-block;
    margin-left: 50px;
  }
  .form {
    margin-top: 20px;
  }
  .page {
    float: right;
    margin-top: 10px;
  }
  .green {
    color: greenyellow;
  }
  .gray {
    color: grey;
  }
  .red {
    color: red;
  }
}
</style>