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

    <!-- 商店列表 -->
    <!-- 排序 -->
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value" :options="option" />
    </van-dropdown-menu>
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
        { text: "好评排序", value: 1 },
        { text: "销量排序", value: 2 },
      ],
    };
  },
  methods: {
    onClickLeft() {
      router.push({ path: "/home" });
    },
  },
};
</script>

<style lang="scss">
</style>