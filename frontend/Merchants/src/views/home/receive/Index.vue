<template>
  <div class="box">
    <!-- 订单列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="id" label="订单号" width="230" fixed>
      </el-table-column>
      <el-table-column prop="orderName" label="订单内容" width="300">
      </el-table-column>
      <el-table-column prop="total" label="订单价格(元)" width="110">
      </el-table-column>
      <el-table-column prop="takeName" label="收货人" width="100">
      </el-table-column>
      <el-table-column prop="takePhone" label="联系电话" width="150">
      </el-table-column>
      <el-table-column prop="address" label="配送地址" width="300">
      </el-table-column>
      <el-table-column prop="date" label="下单时间" width="200" sortable>
      </el-table-column>
      <!-- 审核 -->
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >接单</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="order ? order.length : 0"
      :page-size="8"
      @current-change="handleCurrentChange"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: [],
      order: [],
    };
  },
  methods: {
    handleCurrentChange(n) {
      this.tableData = this.order.slice((n - 1) * 8, n * 8);
    },
    handleClick(scope) {
      this.tableData = this.tableData.filter((item) => {
        return item.id !== scope.id;
      });
      // 审核
      axios
        .post("/api/orders/pick", {
          id: scope.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "接单成功！",
              type: "success",
            });
            axios
              .post("/api/users/consumption", {
                phone: scope.phone,
                total: +scope.total,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  console.log(res.data.msg);
                }
              });
            axios
              .post("/api/merchants/consumption", {
                merchantName: scope.merchantName,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  console.log(res.data.msg);
                }
              });
          }
        });
    },
  },
  computed: {
    orderList() {
      return this.$store.state.orderList;
    },
  },
  created() {
    this.$store.dispatch("getOrderAsync");
    this.order = this.orderList.filter((item) => {
      return (
        item.merchantName == sessionStorage.getItem("merchantName") &&
        item.state == 1
      );
    });
    this.tableData = this.order.slice(0, 8);
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
}
.form {
  margin-top: 20px;
}
.page {
  float: right;
  margin-top: 10px;
}
</style>