<template>
  <div>
    <div class="name">
      <span>商品名称:</span>
      <el-input placeholder="请输入商品名称" v-model="goodsName" clearable>
      </el-input>
    </div>
    <div class="price">
      <span>商品单价:</span>
      <el-input
        placeholder="请输入商品单价"
        v-model="goodsPrice"
        clearable
      ></el-input>
    </div>
    <div class="kind">
      <span>所属类别:</span>
      <el-select v-model="kind" clearable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="image">
      <span>图片:</span>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>

    <el-button type="primary" :plain="true" class="btn" @click="add"
      >提交</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodsName: "",
      goodsPrice: "",
      kind: "",
      imageUrl: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
      ],
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    add() {
      if (
        this.goodsName !== "" &&
        this.goodsPrice !== "" &&
        this.kind !== "" &&
        this.imageUrl !== ""
      ) {
        this.$message({
          message: "添加成功!",
          type: "success",
        });
      } else {
        this.$message.error("不能有空内容");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.name,
.price,
.kind,
.image {
  width: 300px;
  margin: 30px auto;
  span {
    font-size: 16px;
    font-weight: 600;
    display: block;
    margin-bottom: 10px;
  }
}
.image {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
.btn {
  margin: 30px auto;
  width: 200px;
  display: block;
}
</style>