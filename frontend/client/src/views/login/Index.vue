<template>
  <div>
    <div class="building">
      <img src="../../assets/img/logo.png" alt="" />
      <p>7x么</p>
      <h1>Welcome</h1>
      <input
        type="text"
        name="phoneNumber"
        v-model="phoneNumber"
        class="phoneNumber"
        placeholder="手机号"
      />
      <input
        type="password"
        name="password"
        v-model="password"
        class="password"
        placeholder="密码"
      />
      <button class="btn">立即登录</button>
      <p class="text">
        <span @click="registry">立即注册</span>
        &nbsp;|&nbsp;
        <span @click="forgot">忘记密码?</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phoneNumber: "",
      password: "",
    };
  },
  methods: {
    registry() {
      this.$router.push({ path: "/registry" });
    },
    forgot() {
      this.$router.push({ path: "/forgot" });
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
  p {
    text-align: center;
    font-size: 16px;
    color: gold;
    margin-top: -100px;
    margin-bottom: 30px;
  }
  h1 {
    text-align: center;
    font-size: 50px;
    font-weight: normal;
    color: #ecffff;
  }
  .phoneNumber {
    display: block;
    margin: 100px auto;
    height: 40px;
    width: 300px;
    background-color: transparent;
    border: 1px solid #ecffff;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 14px;
  }
  .password {
    display: block;
    margin: -80px auto;
    height: 40px;
    width: 300px;
    background-color: transparent;
    border: 1px solid #ecffff;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 14px;
  }
  .btn {
    display: block;
    margin: 100px auto;
    height: 40px;
    width: 300px;
    background-color: transparent;
    border: 1px solid #ecffff;
    border-radius: 20px;
    padding: 0 10px;
    font-size: 14px;
    color: #ecffff;
    letter-spacing: 10px;
  }
  .text {
    margin-top: -90px;
    color: #ecffff;
  }
}
</style>