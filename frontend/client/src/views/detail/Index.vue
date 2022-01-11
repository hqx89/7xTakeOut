<template>
  <div>
    <van-nav-bar
      title="商店名称"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 商家头部 -->
    <div class="top">
      <img src="" alt="" />
      <span class="storeTitle">XXXXX</span>
      <span class="introduction">XXXXXXXXXXXXXXX</span>
    </div>
    <!-- 商店内容 -->
    <van-tabs>
      <van-tab title="菜品" position="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item title="1" />
          <van-sidebar-item title="2" />
          <van-sidebar-item title="3" />
          <van-sidebar-item title="4" />
        </van-sidebar>
        <div>111</div>
      </van-tab>
      <van-tab title="评价">评价</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 150px;
  background-color: white;
  padding-top: 35px;
  padding-left: 20px;
  img {
    display: block;
    width: 80px;
    height: 80px;
    float: left;
    margin-right: 15px;
  }
  .storeTitle {
    color: #6389fa;
    font-size: 20px;
    display: block;
  }
  .introduction {
    font-size: 16px;
  }
  .van-tab {
    display: flex;
  }
}
</style>