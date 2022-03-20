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
        v-model="merchantName"
        clearable
      ></el-input>
    </div>
    <div class="password">
      <span>密码:</span>
      <el-input
        placeholder="请输入密码，只能为8位字符"
        v-model="password"
        clearable
        show-password
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
    <div class="city">
      <span>商店类别:</span>
      <el-select v-model="storeType" clearable placeholder="请选择商店类别">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="image">
      <span>商家图片:</span>
      <input @change="uploadPhoto($event)" type="file" />
    </div>

    <el-button type="primary" :plain="true" class="btn" @click="add"
      >注册</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      storeName: "",
      merchantName: "",
      password: "",
      city: "",
      storeType: "",
      imgCode: "",
      filesize: "",
      filename: "",
      options: [
        {
          value: "北京市",
          label: "北京市",
        },
        {
          value: "上海市",
          label: "上海市",
        },
        {
          value: "杭州市",
          label: "杭州市",
        },
      ],
      options1: [
        {
          value: "商超",
          label: "商超",
        },
        {
          value: "美食",
          label: "美食",
        },
        {
          value: "医药",
          label: "医药",
        },
      ],
    };
  },
  methods: {
    uploadPhoto(e) {
      // 利用fileReader对象获取file
      const file = e.target.files[0];
      this.filesize = file.size;
      this.filename = file.name;
      if (this.filesize > 2101440) {
        // 图片大于2MB
        console.log("图片过大，请使用其它方式上传！");
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可
        this.imgCode = e.target.result;
      };
    },
    add() {
      if (
        this.storeName != "" &&
        this.merchantName != "" &&
        this.password != "" &&
        this.city != "" &&
        this.storeType != "" &&
        this.imgCode != ""
      ) {
        axios
          .post("/api/merchants/register", {
            storeName: this.storeName,
            merchantName: this.merchantName,
            password: this.password,
            imgCode: this.imgCode,
            storeType: this.storeType,
            storeCity: this.city,
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.$message.error(res.data.msg);
            } else {
              this.$message({
                message: "注册成功！请耐心等待官方审核",
                type: "success",
              });
              setTimeout(() => {
                this.$router.push({ path: "/login" });
              }, 1000);
            }
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