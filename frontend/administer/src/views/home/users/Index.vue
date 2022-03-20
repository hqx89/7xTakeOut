<template>
  <div class="box">
    <div class="input">
      <el-input placeholder="手机号" v-model="input" clearable></el-input>
    </div>
    <el-button type="primary" class="btn" size="small" @click="search"
      >查询</el-button
    >
    <el-button type="info" class="btn" size="small" @click="reset"
      >重置</el-button
    >

    <!-- 商家列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="username" label="用户名"> </el-table-column>

      <el-table-column prop="phone" label="手机号" width="200">
      </el-table-column>
      <el-table-column prop="number" label="订单数" width="200">
      </el-table-column>
      <el-table-column prop="total" label="消费总额(元)" width="200">
      </el-table-column>
      <el-table-column prop="date" label="注册时间" width="200" sortable>
      </el-table-column>
      <!-- 下架 -->
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >注销</el-button
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
      <span>确定要注销吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeFlag">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="userList.length"
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
      tableData: [],
      dialogVisible: false,
      flag: false,
      list: "",
      disabled: false,
    };
  },
  computed: {
    userList() {
      return this.$store.state.userList;
    },
  },
  created() {
    this.$store.dispatch("getUserAsync");
    this.tableData = this.userList.slice(0, 8);
  },
  methods: {
    handleClick(scope) {
      this.dialogVisible = true;
      console.log(scope.name);
      this.list = scope;
    },
    handleCurrentChange(n) {
      this.tableData = this.userList.slice((n - 1) * 8, n * 8);
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
        return item.phone !== this.list.phone;
      });
      axios
        .post("/api/users/delete", {
          phone: this.list.phone,
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.$message({
              message: "注销用户成功！",
              type: "success",
            });
          }
        });
    },

    search() {
      if (this.input == "") {
        this.$message.error("搜索内容不能为空");
      } else {
        this.tableData = this.userList.filter((item) => {
          return item.phone == this.input;
        });
        this.disabled = true;
      }
    },
    reset() {
      this.tableData = this.userList.slice(0, 8);
      this.disabled = false;
      this.input = "";
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