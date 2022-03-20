<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 订单状态：未支付、已支付、已完成 -->
    <h1 v-if="order.state == 0">待支付</h1>
    <h1 v-if="order.state == 1">已支付</h1>
    <h1 v-if="order.state == 2">订单已送达</h1>
    <!-- 待支付 -->
    <div class="main" v-if="order.state == 0">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="like-o">
        感谢使用7x么外卖，我们将用心为您服务!
      </van-notice-bar>
      <div class="unpaid">
        <van-cell title="请尽快支付" label="7x骑士专送" />
        <van-grid :column-num="3">
          <van-grid-item icon="balance-o" text="去支付" @click="pay" />
          <van-grid-item icon="edit" text="改订单信息" @click="edit" />
          <van-grid-item icon="todo-list-o" text="取消订单" @click="cancel" />
        </van-grid>
      </div>
    </div>

    <!-- 已支付 -->
    <div class="main" v-if="order.state == 1">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="like-o">
        感谢使用7x么外卖，我们将用心为您服务!
      </van-notice-bar>
      <div class="unpaid">
        <van-cell title="请等待商家接单" label="7x骑士专送" />
      </div>
    </div>
    <!-- 已完成 -->
    <div class="main" v-if="order.state == 2">
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="like-o">
        感谢使用7x么外卖，我们将用心为您服务!
      </van-notice-bar>
      <div class="unpaid">
        <van-cell title="感谢信任，期待再次光临" label="7x骑士专送" />
        <van-button
          type="default"
          size="large"
          icon="chat-o"
          :disabled="disabled"
          @click="eval"
          >去评价</van-button
        >
      </div>
    </div>

    <div class="goods">
      <span class="title">{{ order.storeName }}</span>
      <ul>
        <li>
          <img :src="store[0] ? store[0].imgCode : ''" alt="" />
          <span class="goodsName">{{ order.orderName }}</span>
          <span class="goodsPrice">￥{{ order.total }}</span>
          <span class="Number">{{
            store[0] ? store[0].storeType : "默认"
          }}</span>
        </li>
      </ul>
      <p class="total">总计￥{{ order.total }}</p>
      <van-cell title="收货信息" :value="take" />
      <van-cell title="备注" value="根据餐量提供餐具" />
      <van-cell title="发票信息" value="申请补开发票" />
      <van-cell title="订单号码" :value="ids" />
      <van-cell title="送达时间" value="尽快送达" />
      <van-cell title="配送方式" value="7x专送" />
    </div>
    <van-dialog
      v-model="show"
      title="收款码"
      show-cancel-button
      @confirm="sure"
    >
      <img src="" />
    </van-dialog>
    <van-action-sheet v-model="show1" title="更改信息">
      <van-field v-model="takeName" label="收货人" />
      <van-field v-model="takePhone" type="tel" label="手机号" />
      <van-field v-model="address" label="市内地址" />
      <van-button type="default" size="large" @click="change"
        >确认修改</van-button
      >
    </van-action-sheet>

    <!-- 评价 -->
    <van-action-sheet v-model="show2" title="评价">
      <van-field
        v-model="content"
        rows="2"
        autosize
        label="评价："
        type="textarea"
        maxlength="50"
        placeholder="请输入评价内容"
        show-word-limit
      />
      <van-cell>
        <template #title>
          <span class="custom-title">评分：</span>
          <van-tag type="danger">{{ score }}</van-tag>
        </template>
        <template #default>
          <van-rate
            v-model="score"
            allow-half
            void-icon="star"
            void-color="#eee"
          />
        </template>
      </van-cell>

      <van-button type="default" size="large" @click="submitted"
        >提交</van-button
      >
    </van-action-sheet>
  </div>
</template>

<script>
import { Dialog } from "vant";
import { Notify } from "vant";
import axios from "axios";
export default {
  data() {
    return {
      show: false,
      state: 0,
      order: "",
      take: "",
      store: "",
      show1: false,
      show2: false,
      takeName: "",
      takePhone: "",
      address: "",
      ids: this.$route.query.id,
      score: 5,
      content: "",
      disabled: false,
    };
  },
  methods: {
    onClickLeft() {
      Dialog.confirm({
        title: "温馨提示",
        message: "请确认是否退出",
      })
        .then(() => {
          // on confirm
          if (this.order.state == 0) {
            this.$router.go(-1);
          } else {
            this.$router.push({ path: "/home/cart" });
          }
        })
        .catch(() => {
          // on cancel
        });
    },
    pay() {
      this.show = true;
    },
    sure() {
      // 支付
      axios
        .post("/api/orders/pay", {
          id: this.$route.query.id,
        })
        .then((res) => {
          if (res.data.code == 1) {
            Notify({ type: "success", message: "支付成功" });
          }
        });
    },
    cancel() {
      // 取消
      Dialog.confirm({
        title: "温馨提示",
        message: "请确认是否取消订单",
      })
        .then(() => {
          // on confirm
          axios
            .post("/api/orders/cancel", {
              id: this.$route.query.id,
            })
            .then((res) => {
              if (res.data.code == 1) {
                Notify({ type: "success", message: "取消订单成功" });
                this.$router.push({ path: "/home" });
              }
            });
        })
        .catch(() => {
          // on cancel
        });
    },
    edit() {
      this.show1 = true;
    },
    change() {
      let a = this.cityName + "市" + this.address;
      if (this.takeName && this.takePhone && this.address) {
        axios
          .post("/api/orders/change", {
            id: this.$route.query.id,
            takeName: this.takeName,
            takePhone: this.takePhone,
            address: a,
          })
          .then((res) => {
            if (res.data.code == 1) {
              Notify({ type: "success", message: "信息修改成功" });
              this.show1 = false;
            }
          });
      } else {
        Notify({ type: "danger", message: "内容不能为空" });
      }
    },
    eval() {
      this.show2 = true;
    },
    submitted() {
      let time = new Date();
      if (this.content !== "") {
        axios
          .post("/api/orders/evaluation", {
            id: this.$route.query.id,
            content: this.content,
            date: time,
            score: this.score,
            state: 1,
          })
          .then((res) => {
            if (res.data.code == 1) {
              Notify({ type: "success", message: "评论发布成功" });
              this.show2 = false;
            }
          });
      } else {
        Notify({ type: "danger", message: "内容不能为空" });
      }
    },
  },
  computed: {
    storeList() {
      return this.$store.state.storeList;
    },
    cityName() {
      return this.$store.state.cityName;
    },
  },
  created() {
    this.$store.dispatch("getStoreAsync");
    axios
      .post("/api/orders/search", {
        id: this.$route.query.id,
      })
      .then((res) => {
        if (res.data.code == 1) {
          this.order = res.data.order;
          this.take = this.order.takeName + " " + this.order.takePhone;
          this.takeName = this.order.takeName;
          this.takePhone = this.order.takePhone;
          this.address = this.order.address.slice(
            this.order.address.indexOf("市") + 1
          );
          this.store = this.storeList.filter((item) => {
            return item.merchantName == this.order.merchantName;
          });
          if (res.data.order.evaluation) {
            this.disabled = true;
          }
        }
      });
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