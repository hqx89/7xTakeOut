<template>
  <div class="box">
    <div class="logo">
      <img src="../../assets/image/logo.png" alt="" />
    </div>
    <p class="word">欢迎登录7x外卖商家系统</p>

    <el-input
      placeholder="请输入用户名"
      v-model="merchantName"
      clearable
      class="input"
    >
    </el-input>
    <el-input
      placeholder="请输入密码"
      v-model="password"
      show-password
      class="input"
    ></el-input>

    <el-link type="info" class="words" @click="goTo">加入我们</el-link>

    <el-button type="primary" round class="input" :plain="true" @click="login"
      >立即登录</el-button
    >
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      merchantName: "",
      password: "",
    };
  },
  methods: {
    login() {
      if (this.merchantName !== "" && this.password !== "") {
        axios
          .post("/api/merchants/login", {
            merchantName: this.merchantName,
            password: this.password,
          })
          .then((res) => {
            if (res.data.code == 0) {
              this.$message.error(res.data.msg);
            } else {
              this.$message({
                message: "登录成功!",
                type: "success",
              });

              // 设置sessionStorage
              sessionStorage.setItem("merchantName", this.merchantName);

              setTimeout(() => {
                this.$router.push({ path: "home" });
              }, 1000);
            }
          });
      } else {
        this.$message.error("内容不能为空!");
      }
    },
    goTo() {
      this.$router.push({ path: "/registered" });
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
  .logo {
    width: 100px;
    height: 100px;
    margin: 150px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .word {
    color: white;
    font-weight: 600;
    font-size: 25px;
    text-align: center;
    line-height: 30px;
    margin-top: -120px;
  }
  .input {
    width: 300px;
    margin: 20px auto;
    display: block;
  }
  .words {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
  }
}
</style>