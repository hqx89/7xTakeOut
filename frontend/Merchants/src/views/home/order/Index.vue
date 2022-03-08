<template>
  <div class="box">
    <div class="input">
      <el-input placeholder="用户名称" v-model="input" clearable></el-input>
    </div>
    <el-button type="primary" class="btn" size="small" @click="search"
      >查询</el-button
    >
    <el-button type="info" class="btn" size="small" @click="reset"
      >重置</el-button
    >

    <!-- 商家列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="name" label="订单名称"> </el-table-column>
      <el-table-column prop="type" label="所属用户" width="200">
      </el-table-column>
      <el-table-column prop="time" label="订单价格" width="200">
      </el-table-column>
      <el-table-column prop="address" label="配送地址" width="200">
      </el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <p>{{ scope.row.state == 1 ? "已完成" : "未接单" }}</p>
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
      input: "",
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

    search() {
      console.log("查询");
    },
    reset() {
      console.log("重置");
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
}
</style>