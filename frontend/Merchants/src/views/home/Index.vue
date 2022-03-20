<template>
  <div class="building">
    <!-- 头部栏 -->
    <div class="header">
      <p class="exit" @click="back">退出</p>
      <p class="welcome">
        欢迎您，{{ store.storeName ? store.storeName : "亲爱的商家" }}
      </p>
      <img
        :src="
          store.imgCode
            ? store.imgCode
            : 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.cnfq.com%2Fv2016%2Fimages%2FmemberHead.jpg&refer=http%3A%2F%2Fwww.cnfq.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649042588&t=db18751d57ed53ea35052826c1d1213f'
        "
        class="tou"
      />
      <div class="logo">
        <img src="../../assets/image/logo.png" alt="" />
        <p class="words">7x外卖商家系统</p>
      </div>
    </div>
    <!-- 侧边导航栏 -->
    <div class="aside">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="/home/index">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-shop"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/kind">种类管理</el-menu-item>
            <el-menu-item index="/home/increase">商品增加</el-menu-item>
            <el-menu-item index="/home/reduction">商品列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/order">订单列表</el-menu-item>
            <el-menu-item index="/home/receive">订单接收</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      store: "",
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    back() {
      this.$router.push({ path: "/login" });
      sessionStorage.removeItem("merchantName");
    },
  },
  created() {
    if (sessionStorage.getItem("merchantName")) {
      axios
        .post("/api/merchants/single", {
          merchantName: sessionStorage.getItem("merchantName"),
        })
        .then((res) => {
          if (res.data.code == 1) {
            this.store = res.data.store;
          }
        });
    }
  },
};
</script>

<style lang="less" scoped>
.building {
  width: 100%;
  height: 100%;
  position: fixed;
}
.header {
  height: 100px;
  width: 100%;
  background-color: #71c3f3;
  .logo {
    height: 100px;
    width: 400px;
    margin-left: 20px;
    img {
      width: 100px;
      height: 100px;
      vertical-align: middle;
    }
    .words {
      display: inline-block;
      line-height: 100px;
      font-size: 30px;
      vertical-align: middle;
    }
  }
  .exit {
    float: right;
    line-height: 100px;
    margin-right: 20px;
    font-weight: 600;
    color: blue;
    cursor: pointer;
    font-size: 20px;
  }
  .welcome {
    float: right;
    line-height: 100px;
    margin-right: 50px;
    font-size: 16px;
    cursor: pointer;
  }
  .tou {
    float: right;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 25px;
    margin-right: 10px;
    cursor: pointer;
  }
}
.aside {
  width: 200px;
  height: 100%;
  background-color: #323232;
}
.main {
  position: fixed;
  top: 100px;
  left: 200px;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  overflow: auto;
}
</style>