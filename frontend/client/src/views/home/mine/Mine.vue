<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="个人中心" />
    <!-- 个人头像等信息 -->
    <div class="personal">
      <img src="https://img01.yzcdn.cn/vant/cat.jpeg" @click="imgClick" />
      <span class="username"><van-icon name="manager-o" />{{ username }}</span>
      <br />
      <span class="phone"><van-icon name="phone-o" />{{ phone }}</span>
    </div>
    <!-- 消息通知 -->
    <van-notice-bar
      left-icon="volume-o"
      text="欢迎使用7x么,快加入我们的会员俱乐部吧，一起探索新的世界！"
    />
    <!-- 功能板块 -->
    <van-cell-group inset>
      <van-cell title="会员中心" is-link @click="vipTips" />

      <van-cell title="修改昵称" is-link @click="showPersonal" />
      <!-- 修改个人资料 -->
      <van-action-sheet v-model="show" title="修改昵称">
        <van-field v-model="afterName" label="昵称" />
        <van-button type="default" size="large" @click="onChange"
          >确认修改</van-button
        >
      </van-action-sheet>

      <van-cell title="个人地址" is-link @click="vipTips" />
      <van-cell title="头像修改" is-link @click="vipTips" />
      <van-cell title="退出登录" is-link @click="exit" />
    </van-cell-group>
  </div>
</template>

<script>
import { Notify } from "vant";
import { ImagePreview } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      phone: "",
      show: false,
      afterName: "",
      afterPhone: "",
    };
  },
  methods: {
    vipTips() {
      Notify({ type: "primary", message: "非常抱歉！该模块暂未开放！" });
    },
    imgClick() {
      ImagePreview(["https://img01.yzcdn.cn/vant/cat.jpeg"]);
    },
    showPersonal() {
      this.show = true;
      this.afterName = this.username;
      this.afterPhone = this.phone;
    },
    onChange() {
      this.username = this.afterName;
      axios
        .post("/api/users/nickname", {
          username: this.username,
          phone: sessionStorage.getItem("phone"),
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.show = false;
            Notify({ type: "success", message: res.data.msg });
          }
        });
    },
    exit() {
      this.$router.push({ path: "/login" });
      sessionStorage.removeItem("phone");
    },
  },
  created() {
    axios
      .post("/api/users/information", {
        phone: sessionStorage.getItem("phone"),
      })
      .then((res) => {
        this.username = res.data.user.username;
        this.phone = res.data.user.phone;
      });
  },
};
</script>

<style lang="scss" scoped>
.personal {
  width: 100%;
  height: 100px;
  background: white;
  padding-top: 15px;
  padding-left: 20px;
  img {
    display: block;
    width: 70px;
    height: 70px;
    float: left;
    border-radius: 50%;
    margin-right: 15px;
  }
  .username {
    font-size: 16px;
    font-weight: 600;
  }
  .phone {
    font-size: 14px;
  }
}
</style>