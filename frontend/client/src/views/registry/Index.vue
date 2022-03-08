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
    <p :class="input2 ? 'hidden' : 'failure'">{{ p2 }}</p>
    <input
      type="password"
      name="password"
      placeholder="密码,不少于8位且不多于12位"
      class="password"
      v-model="password"
      @blur="blurPass"
    />
    <p :class="input3 ? 'hidden' : 'failure'">{{ p3 }}</p>
    <input
      type="password"
      name="password1"
      placeholder="确认密码"
      class="password1"
      v-model="password1"
      @blur="blurWord"
    />
    <p :class="input4 ? 'hidden' : 'failure'">{{ p4 }}</p>
    <input
      type="text"
      name="phoneNumber"
      placeholder="手机号"
      class="phoneNumber"
      v-model="phoneNumber"
      @blur="blurPhone"
    />
    <button class="btn" @click="registry">立即注册</button>
    <span @click="goToLogin">⬅去登录</span>
  </div>
</template>

<script>
import { Notify } from "vant";
export default {
  data() {
    return {
      input1: true,
      input2: true,
      input3: true,
      input4: true,
      flag1: false,
      flag2: false,
      flag3: false,
      flag4: false,
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
          this.flag1 = true;
        }
      }
    },
    // 密码验证
    blurPass() {
      if (!this.password) {
        this.input2 = false;
        this.p2 = "密码不能为空";
      } else {
        if (this.password.length < 8 || this.password.length > 12) {
          this.input2 = false;
          this.p2 = "密码长度不符合";
        } else {
          if (this.password1 != "" && this.password !== this.password1) {
            this.input3 = false;
            this.p3 = "确认密码不一致";
          } else {
            this.input2 = true;
            this.flag2 = true;
          }
        }
      }
    },
    //确认密码验证
    blurWord() {
      if (!this.password1) {
        this.input3 = false;
        this.p3 = "确认密码不能为空";
      } else {
        if (this.password !== this.password1) {
          this.input3 = false;
          this.p3 = "确认密码不一致";
        } else {
          this.input3 = true;
          this.flag3 = true;
        }
      }
    },
    // 手机号验证
    blurPhone() {
      if (!this.phoneNumber) {
        this.input4 = false;
        this.p4 = "手机号不能为空";
      } else {
        if (!/^1[3456789]\d{9}$/.test(this.phoneNumber)) {
          this.input4 = false;
          this.p4 = "手机号有误";
        } else {
          this.input4 = true;
          this.flag4 = true;
        }
      }
    },
    // 注册
    registry() {
      if (this.flag1 && this.flag2 && this.flag3 && this.flag4) {
        this.$router.push({ path: "/login" });
      } else {
        Notify({ type: "danger", message: "请将信息填写正确" });
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