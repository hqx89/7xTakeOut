<template>
  <div class="box">
    <!-- 商品列表 -->
    <el-table :data="tableData" border style="width: 100%" class="form">
      <el-table-column prop="name" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="单价" width="200"> </el-table-column>
      <el-table-column prop="kind" label="所属类别" width="200">
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
      dialogVisible: false,
      flag: false,
      tableData: [
        {
          name: "苹果",
          price: 17,
          kind: "水果",
        },
      ],
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