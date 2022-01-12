<template>
  <div>
    <van-nav-bar
      title="7x么"
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
        <!-- 菜品 -->
        <div class="main">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="1" />
            <van-sidebar-item title="2" />
            <van-sidebar-item title="3" />
            <van-sidebar-item title="4" />
          </van-sidebar>
          <div class="mean">111</div>
        </div>
        <!-- 结算 -->
        <div class="settlement">
          <button class="toPay">去结算</button>
          <div class="cart">
            <img src="../../assets/img/cart.png" alt="" />
          </div>
          <span class="price">￥0</span>
        </div>
      </van-tab>

      <!-- 评价 -->
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
.main {
  width: 100%;
  position: fixed;
  top: 240px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: auto;
  display: flex;
  .mean {
    flex: 1;
    background: red;
  }
}
.settlement {
  width: 100%;
  height: 50px;
  background: #525050;
  position: fixed;
  bottom: 0;
  .toPay {
    width: 100px;
    height: 50px;
    background-color: #1989fa;
    border: none;
    font-size: 14px;
    font-weight: 600;
    float: right;
  }
  .cart {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    margin-left: 15px;
    margin-top: -15px;
    display: inline-block;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .price {
    font-size: 20px;
    font-weight: 600;
    color: white;
  }
}
</style>