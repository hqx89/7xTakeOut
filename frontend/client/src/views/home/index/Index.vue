<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="7x外卖"
      right-text="搜索"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <span><van-icon name="location-o" />{{ cityName }}</span>
      </template>
      <template #right>
        <span><van-icon name="search" />搜索</span>
      </template>
    </van-nav-bar>

    <!-- 轮播图 -->
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      width="100%"
      height="200px"
    >
      <van-swipe-item>
        <img src="../../../assets/img/siwper1.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../assets/img/siwper2.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../assets/img/siwper3.jpg" />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../../assets/img/siwper4.jpg" />
      </van-swipe-item>
    </van-swipe>

    <!-- 分类模块 -->
    <van-grid clickable :column-num="3">
      <van-grid-item icon="home-o" text="美食" to="/" />
      <van-grid-item icon="home-o" text="商超" to="/" />
      <van-grid-item icon="home-o" text="医药" to="/" />
    </van-grid>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      cityName: "杭州",
    };
  },

  methods: {
    onClickLeft() {
      Toast(this.cityName);
    },
    onClickRight() {
      Toast("搜索");
    },
  },
};
</script>

<style lang="scss" scoped>
.my-swipe {
  .van-swipe-item {
    img {
      width: 100%;
      height: 200px;
      display: block;
    }
  }
}
</style>