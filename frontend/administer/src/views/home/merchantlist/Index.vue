<template>
  <div class="box">
    <div class="input">
      <el-input placeholder="商家名称" v-model="input" clearable></el-input>
    </div>
    <el-button type="primary" class="btn" size="small" @click="search"
      >查询</el-button
    >
    <el-button type="info" class="btn" size="small" @click="reset"
      >重置</el-button
    >

    <!-- 商家列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="storeName" label="商家名称"> </el-table-column>
      <el-table-column prop="merchantName" label="账号" width="150">
      </el-table-column>
      <el-table-column prop="storeType" label="所属类别" width="150">
      </el-table-column>
      <el-table-column prop="date" label="创建时间" width="200" sortable>
      </el-table-column>
      <el-table-column prop="storeCity" label="所在地区" width="200">
      </el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <p>{{ scope.row.state == 1 ? "营业中" : "审核中" }}</p>
        </template>
      </el-table-column>
      <!-- 下架 -->
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
            v-show="scope.row.state == 1"
            >下架</el-button
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
      <span>确定要下架吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeFlag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="storeList.length"
      :page-size="8"
      @current-change="handleCurrentChange"
      class="page"
      :disabled="disabled"
    >
    </el-pagination>
  </div>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      disabled: false,
      tableData: [],
      dialogVisible: false,
      flag: false,
      list: "",
    };
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
  },
  methods: {
    handleClick(scope) {
      this.dialogVisible = true;
      console.log(scope.name);
      this.list = scope;
    },
    handleCurrentChange(n) {
      this.tableData = this.storeList.slice((n - 1) * 8, n * 8);
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
        return item.merchantName !== this.list.merchantName;
      });
      // 下架商家
      axios
        .post("/api/merchants/delete", {
          merchantName: this.list.merchantName,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "下架商家成功！",
              type: "success",
            });
          }
        });
    },

    search() {
      if (this.input == "") {
        this.$message.error("搜索内容不能为空");
      } else {
        this.tableData = this.storeList.filter((item) => {
          return item.storeName == this.input;
        });
        this.disabled = true;
      }
    },
    reset() {
      this.tableData = this.storeList.slice(0, 8);
      this.disabled = false;
      this.input = "";
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.tableData = this.storeList.slice(0, 8);
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