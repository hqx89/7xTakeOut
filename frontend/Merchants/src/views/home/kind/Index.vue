<template>
  <div class="box">
    <div class="top">
      <h3>种类添加:</h3>
      <el-input
        placeholder="请输入种类名称"
        v-model="kind"
        clearable
        class="input"
      >
      </el-input>
      <el-button type="primary" class="btn" :plain="true" @click="add"
        >添加</el-button
      >
    </div>

    <div class="bottom">
      <h3>种类列表:</h3>
      <!-- 种类列表 -->
      <el-table :data="tableData" border style="width: 600px" class="form">
        <el-table-column prop="name" label="种类名称" width="300">
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
        :total="tableData.length"
        :page-size="5"
        @current-change="handleCurrentChange"
        class="page"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: "",
      dialogVisible: false,
      flag: false,
      tableData: [{ name: "果蔬" }, { name: "饮料" }],
    };
  },
  methods: {
    add() {
      if (this.kind !== "") {
        this.$message({
          message: "添加成功!",
          type: "success",
        });
      } else {
        this.$message.error("内容不能为空!");
      }
    },
    handleClick(scope) {
      this.dialogVisible = true;
      console.log(scope.name);
      this.list = scope;
    },
    handleCurrentChange(n) {
      console.log(n);
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
        return item.name !== this.list.name;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
  .top {
    background-color: white;
    width: 100%;
    height: 100px;
    border-radius: 10px;
    padding: 10px;
    h3 {
      font-size: 16px;
    }
    .input {
      display: block;
      margin-top: 10px;
      width: 200px;
      float: left;
    }
    .btn {
      margin-top: 10px;
      margin-left: 10px;
    }
  }
  .bottom {
    background-color: white;
    width: 100%;
    height: 500px;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;
    h3 {
      font-size: 16px;
    }
    .form {
      margin: 20px auto;
    }
    .page {
      float: right;
      margin-top: 10px;
    }
  }
}
</style>