<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 订单状态：未支付、已支付、已完成 -->
    <h1>待支付</h1>
    <div class="main">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="like-o">
        感谢使用7x么外卖，我们将用心为您服务!
      </van-notice-bar>
      <div class="unpaid">
        <van-cell title="请尽快支付" label="7x骑士专送" />
        <van-grid :column-num="3">
          <van-grid-item icon="balance-o" text="去支付" />
          <van-grid-item icon="edit" text="改订单信息" />
          <van-grid-item icon="todo-list-o" text="取消订单" />
        </van-grid>
      </div>
    </div>
    <div class="goods">
      <span class="title">店铺名称</span>
      <ul>
        <li>
          <img src="../../assets/img/cart.png" alt="" />
          <span class="goodsName">汉堡+黑椒鸡块+鸡米花+中可</span>
          <span class="goodsPrice">￥62.9</span>
          <span class="Number">x 2</span>
        </li>
      </ul>
      <p class="total">总计￥62.9</p>
      <van-cell title="收货信息" value="黄(先生) 15905875662" />
      <van-cell title="备注" value="根据餐量提供餐具" />
      <van-cell title="发票信息" value="申请补开发票" />
      <van-cell title="订单号码" value="845362266499429" />
      <van-cell title="送达时间" value="尽快送达" />
      <van-cell title="配送方式" value="7x专送" />
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  methods: {
    onClickLeft() {
      Dialog.confirm({
        title: "温馨提示",
        message: "请确认是否退出",
      })
        .then(() => {
          // on confirm
          this.$router.go(-1);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  padding: 10px;
}
.main {
  padding: 10px;
  border-radius: 10px;
  background-color: white;
}
.goods {
  margin: 10px;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  .title {
    font-size: 14px;
    color: #ccc;
    display: block;
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
        font-size: 14px;
        font-weight: 600;
      }
      .Number {
        color: #999;
        font-size: 12px;
        display: block;
      }
    }
  }
  .total {
    font-size: 14px;
    font-weight: 600;
    text-align: right;
  }
}
</style>