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
      <el-table-column prop="name" label="商家名称"> </el-table-column>
      <el-table-column prop="type" label="所属类别" width="200">
      </el-table-column>
      <el-table-column prop="time" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="address" label="所在地区" width="200">
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
      dialogVisible: false,
      flag: false,
      list: "",
    };
  },
  methods: {
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