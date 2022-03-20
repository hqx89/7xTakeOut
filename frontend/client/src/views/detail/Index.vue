<template>
  <div class="building">
    <van-nav-bar
      title="7x么"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 商家头部 -->
    <div class="top">
      <img :src="store.imgCode" alt="" />
      <span class="storeTitle">{{ store.storeName }}</span>
      <span class="introduction"
        >用心改变生活，有捷改变人生；&emsp;&emsp;放心选择，7x外卖</span
      >
    </div>
    <!-- 商店内容 -->
    <van-tabs>
      <van-tab title="菜品" position="left">
        <!-- 菜品 -->
        <div class="main" :style="{ '--mainHeight': mainHeight }">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item
              v-for="(item, index) of store.goodsType"
              :title="item.goodsTypeName"
              :key="index"
              @click="change(item.goodsTypeName)"
            />
          </van-sidebar>
          <div class="mean">
            <van-card
              v-for="(item, index) of list"
              :key="index"
              :price="item.goodsPrice"
              :desc="item.desc"
              :title="item.goodsName"
              :thumb="item.imgCode"
            >
              <template #footer>
                <van-button size="mini" round class="Btn" @click="reduce(item)"
                  >-</van-button
                >
                <input
                  type="text"
                  class="mini"
                  readonly
                  v-model="input[item.goodsName]"
                />
                <van-button size="mini" round class="Btn" @click="add(item)"
                  >+</van-button
                >
              </template>
            </van-card>
          </div>
        </div>
        <!-- 结算 -->
        <div class="settlement">
          <button class="toPay" @click="goPay">去结算</button>
          <div class="cart">
            <img src="../../assets/img/cart.png" alt="" />
          </div>
          <span class="price">￥{{ total }}</span>
        </div>
      </van-tab>

      <!-- 评价 -->
      <van-tab title="评价">
        <ul class="evaluation">
          <li v-for="(item, index) in order" :key="index">
            <van-cell
              :value="item.evaluation[0].date"
              :label="item.evaluation[0].content"
            >
              <template #title>
                <span class="custom-title">{{ item.takeName }}</span>
                <van-tag type="danger">{{ item.evaluation[0].score }}</van-tag>
              </template>
            </van-cell>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      activeKey: 0,
      mainHeight: window.innerHeight - 290 + "px",
      store: "",
      list: [],
      input: {},
      // 总价
      total: 0,
      menu: "",
      cart: [],
      order: [],
    };
  },
  computed: {
    storeCityList() {
      return this.$store.getters.storeCityList;
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 去结算
    goPay() {
      if (this.total > 0) {
        for (let i in this.input) {
          if (this.input[i] > 0) {
            const item = this.store.goods.filter((item) => {
              return item.goodsName == i;
            });
            this.cart.push({
              goodsName: i,
              num: this.input[i],
              goodsPrice: item[0].goodsPrice,
              imgCode: item[0].imgCode,
            });
          }
        }
        this.$router.push({
          name: "pay",
          params: {
            storeName: this.store.storeName,
            cart: this.cart,
            total: this.total,
            merchantName: this.$route.query.id,
          },
        });
        this.cart = [];
      } else {
        Notify({ type: "danger", message: "请选购商品" });
      }
    },
    // 切换
    change(e) {
      this.list = this.store.goods.filter((item) => {
        return item.type == e;
      });
    },
    // 减
    reduce(item) {
      if (this.input[item.goodsName] > 0) {
        this.input[item.goodsName]--;
        this.total -= +item.goodsPrice;
      }
    },
    // 加
    add(item) {
      this.input[item.goodsName]++;
      this.total += +item.goodsPrice;
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    this.store = this.storeCityList.filter((item) => {
      return item.merchantName == this.$route.query.id;
    })[0];
    let e = this.store.goodsType[0].goodsTypeName;
    this.list = this.store.goods.filter((item) => {
      return item.type == e;
    });

    // 给input设置v-model
    this.store.goods.forEach((item) => {
      Vue.set(this.input, item.goodsName, 0);
    });

    axios.get("/api/orders/orders").then((res) => {
      if (res.data.code == 1) {
        this.order = res.data.list.filter((item) => {
          return (
            item.merchantName == this.$route.query.id &&
            item.evaluation[0].state == 1
          );
        });
      }
    });
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.building {
  width: 100%;
  height: 100%;
  position: fixed;
}
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
  height: var(--mainHeight);
  background-color: white;
  display: flex;
  .mean {
    flex: 1;
    background: white;
    overflow: auto;
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
.evaluation {
  margin: 10px;
  li {
    margin-bottom: 10px;
  }
}
.mini {
  vertical-align: middle;
  width: 20px;
  border: none;
  text-align: center;
  margin-left: 5px;
}
.Btn {
  vertical-align: middle;
}
</style>