<template>
  <div>
    <van-nav-bar title="订单" />
    <van-tabs animated>
      <van-tab title="全部">
        <van-empty description="空空如也，快去购物吧" v-if="list == ''" />
        <van-card
          v-for="(item, index) in list"
          :key="index"
          :price="item.total"
          :desc="item.orderName"
          :title="item.storeName"
          :thumb="getImg(item)"
          @click="goOrder(item)"
        >
          <template #tag>
            <van-tag type="danger" v-show="item.state == 0">未支付</van-tag>
            <van-tag type="primary" v-show="item.state == 1">未接单</van-tag>
            <van-tag type="success" v-show="item.state == 2">已完成</van-tag>
          </template>
          <template #footer>
            <p class="bottom" v-show="item.state == 2">已完成</p>
            <p class="bottom" v-show="item.state != 2">进行中</p>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="未支付">
        <van-empty description="空空如也，快去购物吧" v-if="notPay == ''" />
        <van-card
          v-for="(item, index) in notPay"
          :key="index"
          :price="item.total"
          :desc="item.orderName"
          :title="item.storeName"
          :thumb="getImg(item)"
          @click="goOrder(item)"
        >
          <template #tag>
            <van-tag type="danger">未支付</van-tag>
          </template>
          <template #footer>
            <p class="bottom">进行中</p>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="未接单">
        <van-empty description="空空如也，快去购物吧" v-if="notPick == ''" />
        <van-card
          v-for="(item, index) in notPick"
          :key="index"
          :price="item.total"
          :desc="item.orderName"
          :title="item.storeName"
          :thumb="getImg(item)"
          @click="goOrder(item)"
        >
          <template #tag>
            <van-tag type="primary">未接单</van-tag>
          </template>
          <template #footer>
            <p class="bottom">进行中</p>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      list: "",
      notPay: "",
      notPick: "",
    };
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    axios.get("/api/orders/orders").then((res) => {
      if (res.data.code == 1) {
        this.list = res.data.list;
        this.notPay = res.data.list.filter((item) => {
          return item.state == 0;
        });
        this.notPick = res.data.list.filter((item) => {
          return item.state == 1;
        });
      }
    });
  },
  methods: {
    goOrder(item) {
      this.$router.push({ path: `/oder?id=${item.id}` });
    },
    getImg(i) {
      const a = this.storeList.filter((item) => {
        return item.merchantName == i.merchantName;
      });
      return a[0].imgCode;
    },
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
  },
};
</script>

<style lang="scss" scoped>
.bottom {
  color: #646566;
}
</style>