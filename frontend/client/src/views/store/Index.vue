<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      :fixed="true"
      :placeholder="true"
      @click-left="onClickLeft"
    />

    <!-- 排序 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value" :options="option" @change="change" />
    </van-dropdown-menu>

    <!-- 商店列表 -->
    <van-card
      v-for="item in list1"
      :key="item.id"
      :desc="item.storeType + '&' + item.storeCity"
      :title="item.storeName"
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
</template>

<script>
import router from "../../router";
export default {
  data() {
    return {
      title: this.$route.query.range,
      //排序
      value: 0,
      option: [
        { text: "默认排序", value: 0 },
        { text: "销量排序", value: 1 },
      ],
      list: [],
      list1: [],
      activity: ["免配送费", "免包装费", "7x联盟高品质保障"],
    };
  },
  computed: {
    storeCityList() {
      return this.$store.getters.storeCityList;
    },
  },
  methods: {
    onClickLeft() {
      router.push({ path: "/home" });
    },

    change() {
      if (this.value == "销量排序") {
        this.list1.sort(function (a, b) {
          return a.number - b.number;
        });
      }
      if (this.value == "默认排序") {
        this.list1 = this.list;
      }
    },

    //跳转至商店页面
    goToStore(id) {
      this.$router.push({ path: `/detail?id=${id}` });
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.list = this.storeCityList.filter((item) => {
      return item.storeType == this.title;
    });
    this.list1 = this.list;
  },
};
</script>

<style lang="scss">
</style>