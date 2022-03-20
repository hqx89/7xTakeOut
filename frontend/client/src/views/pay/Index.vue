<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar left-text="确认订单" left-arrow @click-left="onClickLeft" />
    <!-- 通知栏 -->
    <van-notice-bar
      scrollable
      left-icon="volume-o"
      text="温馨提示：请适量点餐，避免浪费！"
    />
    <!-- 方式切换 -->
    <van-tabs>
      <van-tab title="外卖配送" @click="onAdd">
        <!-- 添加地址 -->
        <div class="address">
          <div class="all" v-show="address != ''">
            <p class="name">姓名：{{ username }}</p>
            <p class="phone">手机号：{{ phone }}</p>
            <p class="place">地址：{{ address }}</p>
          </div>
          <van-cell
            title="添加收货地址"
            icon="add-o"
            is-link
            v-show="address == ''"
            @click="changeAddress"
          />
          <van-action-sheet v-model="show1" title="收货地址">
            <van-field v-model="username" label="姓名" />
            <van-field v-model="phone" label="手机号" type="tel" />
            <van-field v-model="address" label="市内地址" />
            <van-button type="default" size="large" @click="onChange"
              >确认修改</van-button
            >
          </van-action-sheet>
        </div>
        <van-cell title="送达时间" value="立即送出" />
        <van-cell
          title="支付方式"
          is-link
          :value="payType"
          @click="selectPay"
        />
        <!-- 支付方式 -->
        <van-action-sheet v-model="show" title="支付方式" cancel-text="取消">
          <van-button type="default" size="large" @click="choose"
            >支付宝</van-button
          >
          <van-button type="default" size="large" @click="choose"
            >微信</van-button
          >
          <van-button type="default" size="large" @click="choose"
            >银行卡</van-button
          >
        </van-action-sheet>
        <!-- 商品块 -->
        <div class="main">
          <p class="title">{{ storeName }}</p>
          <!-- 商品 -->
          <ul>
            <li v-for="(item, index) in cart" :key="index">
              <img :src="item.imgCode" alt="" />
              <span class="goodsName">{{ item.goodsName }}</span>
              <span class="goodsPrice">￥{{ item.goodsPrice }}</span>
              <span class="Number">x {{ item.num }}</span>
            </li>
          </ul>
          <van-cell title="包装费" value="￥0" />
          <van-cell title="配送费(7x骑士专送)" value="￥0" />
          <van-cell title="店铺满减" value="无" />
          <van-cell title="满返红包" value="无" />
          <van-cell title="红包/抵用卷" is-link value="未选择" />
        </div>
        <!-- 其他 -->
        <div class="other">
          <van-cell title="备注" is-link value="可填写" />
          <van-cell title="餐具份数" value="按需供给" />
          <van-cell title="发票" value="不支持线上开票" />
        </div>
      </van-tab>
    </van-tabs>
    <!-- 提交订单 -->
    <div class="submit">
      <button class="toSubmit" @click="submit">提交订单</button>
      <span class="price">{{ total }}</span>
      <span class="total">合计：<span>￥</span></span>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Notify } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      storeName: this.$route.params.storeName,
      total: this.$route.params.total,
      cart: this.$route.params.cart,
      show: false,
      show1: false,
      payType: "支付宝",
      username: "",
      phone: "",
      address: "",
      orderName: "",
      id: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onAdd() {
      console.log("添加地址");
    },
    selectPay() {
      this.show = true;
    },
    choose(e) {
      this.payType = e.target.innerText;
      this.show = false;
    },
    onChange() {
      this.show1 = false;
    },
    changeAddress() {
      this.show1 = true;
    },
    submit() {
      if (this.address == "") {
        Notify({ type: "danger", message: "地址不能为空！" });
      } else {
        Dialog.confirm({
          title: "温馨提示",
          message: "请确认是否提交订单",
        })
          .then(() => {
            const a = Date.now() + sessionStorage.getItem("phone");
            this.id = a;
            const b = this.cityName + "市" + this.address;
            // on confirm
            axios
              .post("/api/orders/save", {
                id: this.id,
                storeName: this.storeName,
                merchantName: this.$route.params.merchantName,
                phone: sessionStorage.getItem("phone"),
                orderName: this.orderName,
                total: this.total,
                takeName: this.username,
                takePhone: this.phone,
                address: b,
              })
              .then((res) => {
                if (res.data.code == 1) {
                  console.log(res.data.msg);
                }
              });
            this.$router.push({ path: `/oder?id=${this.id}` });
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
  computed: {
    cityName() {
      return this.$store.state.cityName;
    },
  },
  created() {
    this.cart.forEach((item, index) => {
      if (index == 0) {
        if (item.num == 1) {
          this.orderName = item.goodsName;
        } else {
          this.orderName = item.goodsName + "x" + item.num;
        }
      } else {
        if (item.num == 1) {
          this.orderName += "+" + item.goodsName;
        } else {
          this.orderName += "+" + item.goodsName + "x" + item.num;
        }
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.submit {
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  background-color: white;
  .toSubmit {
    width: 150px;
    height: 50px;
    background-color: #1989fa;
    float: right;
    border: none;
    font-size: 16px;
    font-weight: 600;
    color: white;
    border-radius: 25px;
    margin-left: 10px;
  }
  .price {
    float: right;
    font-size: 24px;
    color: red;
    font-weight: 600;
    margin-top: 10px;
  }
  .total {
    float: right;
    font-size: 14px;
    margin-top: 20px;
    span {
      color: red;
    }
  }
}
.main {
  margin: 10px;
  background-color: white;
  padding: 10px 0;
  border-radius: 10px;
  .title {
    color: #ccc;
    font-size: 14px;
    padding-left: 10px;
  }
  ul {
    li {
      width: 100%;
      height: 80px;
      padding: 10px;
      img {
        width: 60px;
        height: 60px;
        display: block;
        float: left;
        margin-right: 10px;
      }
      .goodsName {
        display: inline-block;
        font-size: 14px;
        width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .goodsPrice {
        font-size: 16px;
        font-weight: 600;
      }
      .Number {
        color: #999;
        font-size: 12px;
        display: block;
      }
    }
  }
}
.other {
  margin: 10px;
  margin-bottom: 70px;
  background-color: white;
  padding: 10px 0;
  border-radius: 10px;
}
.address {
  width: 100%;
  background-color: white;
  border-bottom: 1px solid steelblue;
  .all {
    padding: 20px;
  }
  .name,
  .phone,
  .place {
    font-weight: 600;
    font-size: 14px;
  }
}
</style>