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
      <img src="" alt="" />
      <span class="storeTitle">XXXXX</span>
      <span class="introduction">XXXXXXXXXXXXXXX</span>
    </div>
    <!-- 商店内容 -->
    <van-tabs>
      <van-tab title="菜品" position="left">
        <!-- 菜品 -->
        <div class="main" :style="{ '--mainHeight': mainHeight }">
          <van-sidebar v-model="activeKey">
            <van-sidebar-item title="1" />
            <van-sidebar-item title="2" />
            <van-sidebar-item title="3" />
            <van-sidebar-item title="4" />
          </van-sidebar>
          <div class="mean">
            <van-card
              price="2.00"
              desc="描述信息"
              title="商品标题"
              thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
              v-for="i of 10"
              :key="i"
            ></van-card>
          </div>
        </div>
        <!-- 结算 -->
        <div class="settlement">
          <button class="toPay" @click="goPay">去结算</button>
          <div class="cart">
            <img src="../../assets/img/cart.png" alt="" />
          </div>
          <span class="price">￥0</span>
        </div>
      </van-tab>

      <!-- 评价 -->
      <van-tab title="评价">
        <ul class="evaluation">
          <li>
            <van-cell value="2022-1-18" label="这家店的味道非常不错">
              <template #title>
                <span class="custom-title">小黄同学</span>
                <van-tag type="danger">4.9</van-tag>
              </template>
            </van-cell>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeKey: 0,
      mainHeight: window.innerHeight - 290 + "px",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    goPay() {
      this.$router.push({ path: "/pay" });
    },
  },
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
</style>