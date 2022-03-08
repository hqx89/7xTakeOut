<template>
  <div class="box">
    <el-button round class="back" @click="back">返回登录</el-button>
    <p class="title">欢迎加入7x外卖平台</p>
    <div class="name">
      <span>商店名称:</span>
      <el-input placeholder="请输入商店名称" v-model="storeName" clearable>
      </el-input>
    </div>
    <div class="username">
      <span>账号:</span>
      <el-input
        placeholder="请输入账号，只能为8位数字"
        v-model="username"
        clearable
      ></el-input>
    </div>
    <div class="password">
      <span>密码:</span>
      <el-input
        placeholder="请输入密码，只能为8位字符"
        v-model="password"
        clearable
      ></el-input>
    </div>
    <div class="city">
      <span>所在城市:</span>
      <el-select
        v-model="city"
        clearable
        placeholder="请选择（目前只开通三个城市）"
      >
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
      storeName: "",
      username: "",
      password: "",
      city: "",
      imageUrl: "",
      options: [
        {
          value: "选项1",
          label: "北京市",
        },
        {
          value: "选项2",
          label: "上海市",
        },
        {
          value: "选项3",
          label: "杭州市",
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
        this.storeName !== "" &&
        this.username !== "" &&
        this.password !== "" &&
        this.city !== "" &&
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
    back() {
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #71c3f3;
  overflow: hidden;
  .back {
    display: fixed;
    top: 20px;
    left: 20px;
  }
  .title {
    color: white;
    font-size: 20px;
    text-align: center;
    line-height: 30px;
  }
  .name,
  .username,
  .password,
  .city {
    width: 300px;
    margin: 20px auto;
    span {
      font-size: 16px;
      font-weight: 600;
      display: block;
      margin-bottom: 10px;
    }
  }
  .image {
    width: 300px;
    margin: 30px auto;
    span {
      font-size: 16px;
      font-weight: 600;
      display: block;
      margin-bottom: 10px;
    }
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
}
</style>