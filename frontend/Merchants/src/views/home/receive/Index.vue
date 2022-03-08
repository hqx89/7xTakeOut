<template>
  <div class="box">
    <!-- 订单列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="name" label="订单名称"> </el-table-column>
      <el-table-column prop="type" label="所属用户" width="200">
      </el-table-column>
      <el-table-column prop="time" label="订单价格" width="200">
      </el-table-column>
      <el-table-column prop="address" label="配送地址" width="200">
      </el-table-column>
      <!-- 审核 -->
      <el-table-column fixed="right" label="操作" width="200">
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
      :total="tableData.length"
      :page-size="8"
      @current-change="handleCurrentChange"
      class="page"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "三只松鼠",
          type: "美食",
          time: "2017-1-1",
          address: "杭州",
          state: 1,
        },
        {
          name: "四只松鼠",
          type: "医药",
          time: "2017-1-1",
          address: "杭州",
          state: 0,
        },
      ],
    };
  },
  methods: {
    handleCurrentChange(n) {
      console.log(n);
    },
    handleClick(scope) {
      this.tableData = this.tableData.filter((item) => {
        return item.name !== scope.name;
      });

      // 审核
    },
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