import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    storeList: [],
    userList: [],
    orderList: [],
  },
  getters: {
    // 审核中的商家
    auditList(state) {
      return state.storeList.filter((item) => {
        return item.state == 0;
      });
    },
  },
  mutations: {
    // 同步改变商家列表
    getStore(state, payload) {
      state.storeList = payload;
    },
    // 同步改变用户列表
    getUser(state, payload) {
      state.userList = payload;
    },
    // 同步改变订单列表
    getOrder(state, payload) {
      state.orderList = payload;
    },
  },
  actions: {
    // 异步请求商家列表
    async getStoreAsync({ commit }) {
      const res = await axios.get("/api/merchants/store").then((res) => {
        if (res.data.code == 1) {
          return res.data.list;
        }
      });
      // 调用同步接口方法
      commit("getStore", res);
    },

    // 异步请求用户列表
    async getUserAsync({ commit }) {
      const res = await axios.get("/api/users/list").then((res) => {
        if (res.data.code == 1) {
          return res.data.list;
        }
      });
      // 调用同步接口方法
      commit("getUser", res);
    },

    // 异步请求订单列表
    async getOrderAsync({ commit }) {
      const res = await axios.get("/api/orders/orders").then((res) => {
        if (res.data.code == 1) {
          return res.data.list;
        }
      });
      // 调用同步接口方法
      commit("getOrder", res);
    },
  },
  modules: {},
});
