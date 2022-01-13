<template>
  <!-- 底部导航栏 -->
  <div>
    <router-view />
    <van-tabbar v-model="active" :route="true" :placeholder="true">
      <van-tabbar-item to="/home/index" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/home/search" icon="search">搜索</van-tabbar-item>
      <van-tabbar-item to="/home/cart" icon="orders-o" badge="5"
        >订单</van-tabbar-item
      >
      <van-tabbar-item to="/home/mine" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="scss">
</style>