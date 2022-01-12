<template>
  <div class="building">
    <img src="../../assets/img/logo.png" alt="" />
    <p class="p1">7x么</p>
    <h1>Welcome to register</h1>
    <p :class="input1 ? 'hidden' : 'failure'">{{ p1 }}</p>
    <input
      type="text"
      name="username"
      placeholder="用户名,长度为2~8位字符"
      class="username"
      v-model="username"
      @blur="blurName"
    />
    <p :class="input2 ? 'hidden' : 'failure'">密码验证</p>
    <input
      type="password"
      name="password"
      placeholder="密码"
      class="password"
      v-model="password"
    />
    <p :class="input3 ? 'hidden' : 'failure'">确认密码验证</p>
    <input
      type="password"
      name="password1"
      placeholder="确认密码"
      class="password1"
      v-model="password1"
    />
    <p :class="input4 ? 'hidden' : 'failure'">手机号验证</p>
    <input
      type="text"
      name="phoneNumber"
      placeholder="手机号"
      class="phoneNumber"
      v-model="phoneNumber"
    />
    <button class="btn">立即注册</button>
    <span @click="goToLogin">⬅去登录</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: true,
      input2: true,
      input3: true,
      input4: true,
      p1: "XXXX",
      p2: "XXXX",
      p3: "XXXX",
      p4: "XXXX",
      username: "",
      password: "",
      password1: "",
      phoneNumber: "",
    };
  },
  methods: {
    goToLogin() {
      this.$router.push({ path: "/login" });
    },
    //用户名验证
    blurName() {
      if (!this.username) {
        this.input1 = false;
        this.p1 = "用户名不能为空";
      } else {
        if (this.username.length < 2 || this.username.length > 8) {
          this.input1 = false;
          this.p1 = "用户名长度不符合";
        } else {
          this.input1 = true;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.building {
  background: url("../../assets/img/login.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: 100% 100%;
  img {
    width: 50px;
    height: 50px;
    display: block;
    margin: 100px auto;
  }
  .p1 {
    text-align: center;
    font-size: 16px;
    color: gold;
    margin-top: -100px;
    margin-bottom: 30px;
  }
  h1 {
    text-align: center;
    font-size: 30px;
    font-weight: normal;
    color: #ecffff;
  }
  input {
    display: block;
    margin: 0 auto;
    height: 40px;
    width: 300px;
    background-color: transparent;
    border: 1px solid #ecffff;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 14px;
  }
  .hidden {
    font-size: 12px;
    visibility: hidden;
    margin-top: 10px;
  }
  .failure {
    font-size: 12px;
    text-align: center;
    visibility: visible;
    color: red;
    margin-top: 10px;
  }
  .btn {
    display: block;
    margin: 20px auto;
    height: 40px;
    width: 300px;
    background-color: transparent;
    border: 1px solid #ecffff;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 14px;
    color: #ecffff;
    letter-spacing: 5px;
  }
  span {
    color: #ecffff;
    font-size: 14px;
    margin-left: 50px;
  }
}
</style>