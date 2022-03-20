<template>
  <div class="box">
    <!-- 商家列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="storeName" label="商家名称"> </el-table-column>
      <el-table-column prop="merchantName" label="账号" width="200">
      </el-table-column>
      <el-table-column prop="storeType" label="所属类别" width="200">
      </el-table-column>
      <el-table-column prop="date" label="申请时间" width="200" sortable>
      </el-table-column>
      <el-table-column prop="storeCity" label="所在地区" width="200">
      </el-table-column>
      <!-- 审核 -->
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >通过</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="auditList.length"
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
    };
  },
  computed: {
    auditList() {
      return this.$store.getters.auditList;
    },
  },
  methods: {
    handleCurrentChange(n) {
      this.tableData = this.auditList.slice((n - 1) * 8, n * 8);
    },
    handleClick(scope) {
      this.tableData = this.tableData.filter((item) => {
        return item.merchantName !== scope.merchantName;
      });

      // 审核
      axios
        .post("/api/merchants/audit", {
          merchantName: scope.merchantName,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: res.data.msg,
              type: "success",
            });
          }
        });
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.tableData = this.auditList.slice(0, 8);
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