<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <van-empty
      v-show="list == '' ? true : false"
      image="search"
      description="开始搜索吧！"
    />

    <!-- 商店 -->
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
</template>

<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      value: "",
      list: [],
      activity: ["免配送费", "免包装费", "7x联盟高品质保障"],
    };
  },
  computed: {
    storeCityList() {
      return this.$store.getters.storeCityList;
    },
  },
  methods: {
    onSearch(val) {
      const reg = eval(`/${val}+/g`);
      this.storeCityList.forEach((item) => {
        if (reg.test(item.storeName)) {
          this.list.push(item);
        }
      });
    },
    onCancel() {
      Toast("取消搜索");
      this.value = "";
      this.list = [];
    },
    //跳转至商店页面
    goToStore(id) {
      this.$router.push({ path: `/detail?id=${id}` });
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
  },
};
</script>

<style lang="scss">
</style>