<template>
  <div class="box">
    <!-- 商品列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="goodsName" label="商品名称"> </el-table-column>
      <el-table-column prop="type" label="所属类别" width="200">
      </el-table-column>
      <el-table-column prop="desc" label="描述信息" width="300">
      </el-table-column>
      <el-table-column prop="goodsPrice" label="单价(元)" width="200" sortable>
      </el-table-column>
      <el-table-column prop="date" label="添加时间" width="200" sortable>
      </el-table-column>
      <!-- 下架 -->
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <span>确定要删除吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeFlag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="store ? store.goods.length : 0"
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
      dialogVisible: false,
      flag: false,
      tableData: [],
      list: "",
      store: [],
    };
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.store = this.storeList.filter((item) => {
      return item.merchantName == sessionStorage.getItem("merchantName");
    })[0];
    if (this.store) {
      this.tableData = this.store.goods.slice(0, 8);
    }
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
  },
  methods: {
    handleClick(scope) {
      this.dialogVisible = true;
      this.list = scope;
    },
    handleCurrentChange(n) {
      this.tableData = this.store.goods.slice((n - 1) * 8, n * 8);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    changeFlag() {
      this.dialogVisible = false;
      this.tableData = this.tableData.filter((item) => {
        return item.goodsName !== this.list.goodsName;
      });

      const goods = this.store.goods.filter((item) => {
        return item.goodsName !== this.list.goodsName;
      });

      axios
        .post("/api/merchants/inGoods", {
          merchantName: sessionStorage.getItem("merchantName"),
          goods: goods,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "删除成功!",
              type: "success",
            });
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
  .form {
    margin-top: 20px;
  }
  .page {
    float: right;
    margin-top: 10px;
  }
}
</style>