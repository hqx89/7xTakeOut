<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar
      title="7x么"
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    >
      <template #left>
        <span><van-icon name="location-o" />{{ cityName }}</span>
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
      <van-grid-item icon="home-o" text="美食" to="/store?range=美食" />
      <van-grid-item icon="home-o" text="商超" to="/store?range=商超" />
      <van-grid-item icon="home-o" text="医药" to="/store?range=医药" />
    </van-grid>

    <!-- 推荐商家 -->
    <div class="recommend">
      <h3>新店推荐</h3>
      <van-card
        v-for="item in list"
        :key="item.id"
        :desc="item.describe"
        :title="item.name"
        tag="新店"
        @click="goToStore(item.id)"
        thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
      >
        <template #tags>
          <van-tag
            v-for="(i, index) in item.activity"
            :key="index"
            plain
            type="danger"
            >{{ i }}</van-tag
          >
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import router from "../../../router/index";

export default {
  data() {
    return {
      cityName: "杭州",

      //商店
      list: [
        {
          id: 1,
          name: "米多多韩式炸鸡",
          describe: "一家专门做炸鸡的好店",
          activity: ["满50减20"],
        },
        {
          id: 2,
          name: "米多多韩式炸鸡",
          describe: "一家专门做炸鸡的好店",
          activity: ["满50减20", "满100减50"],
        },
        {
          id: 3,
          name: "米多多韩式炸鸡",
          describe: "一家专门做炸鸡的好店",
          activity: ["满50减20"],
        },
        {
          id: 4,
          name: "米多多韩式炸鸡",
          describe: "一家专门做炸鸡的好店",
          activity: ["满50减20"],
        },
        {
          id: 5,
          name: "米多多韩式炸鸡",
          describe: "一家专门做炸鸡的好店",
          activity: ["满50减20"],
        },
      ],
    };
  },

  methods: {
    onClickLeft() {
      router.push({ path: "/city" });
    },

    //跳转至商店页面
    goToStore(id) {
      this.$router.push({ path: `/detail?id=${id}` });
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
.recommend {
  h3 {
    font-size: 18px;
    padding-top: 10px;
    padding-left: 5px;
  }
}
</style>