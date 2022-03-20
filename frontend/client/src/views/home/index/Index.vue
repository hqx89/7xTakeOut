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
      <van-grid-item text="美食" to="/store?range=美食">
        <template #icon>
          <img
            src="../../../assets/img/food.png"
            alt=""
            style="width: 28px; height: 28px"
          />
        </template>
      </van-grid-item>
      <van-grid-item icon="home-o" text="商超" to="/store?range=商超">
        <template #icon>
          <img
            src="../../../assets/img/46trolley.png"
            alt=""
            style="width: 28px; height: 28px"
          /> </template
      ></van-grid-item>
      <van-grid-item icon="home-o" text="医药" to="/store?range=医药">
        <template #icon>
          <img
            src="../../../assets/img/yao.png"
            alt=""
            style="width: 28px; height: 28px"
          /> </template
      ></van-grid-item>
    </van-grid>

    <!-- 推荐商家 -->
    <div class="recommend">
      <h3>新店推荐</h3>
      <van-card
        v-for="item in list"
        :key="item.id"
        :desc="item.storeType + '&' + item.storeCity"
        :title="item.storeName"
        tag="新店"
        @click="goToStore(item.merchantName)"
        :thumb="item.imgCode"
      >
        <template #tags>
          <van-tag
            v-for="(i, index) in activity"
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
      //商店
      list: "",
      activity: ["免配送费", "免包装费", "7x联盟高品质保障"],
    };
  },
  computed: {
    cityName() {
      return this.$store.state.cityName;
    },
    storeList() {
      return this.$store.getters.storeCityList;
    },
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
  created() {
    this.$store.dispatch("getStoreAsync");
    this.list = this.storeList.reverse().slice(0, 5);
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
@font-face {
  font-family: "iconfont"; /* project id 3120839 */
  src: url("");
  src: url("?#iefix") format("embedded-opentype"),
    url("//at.alicdn.com/t/font_3120839_lwlth2nhej.woff2") format("woff2"),
    url("//at.alicdn.com/t/font_3120839_lwlth2nhej.woff") format("woff"),
    url("//at.alicdn.com/t/font_3120839_lwlth2nhej.ttf") format("truetype"),
    url("#iconfont") format("svg");
}

.my-icon {
  font-family: "my-icon";
}

.my-icon-extra::before {
  content: "&#xe621;";
}
</style>