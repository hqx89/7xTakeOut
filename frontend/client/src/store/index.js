import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityName: localStorage.getItem("cityName") || "杭州",
    storeList: [],
  },
  getters: {
    storeCityList(state) {
      return state.storeList.filter((item) => {
        return item.storeCity == state.cityName + "市";
      });
    },
  },
  mutations: {
    // 更改城市
    getCityName(state, payload) {
      state.cityName = payload;
    },

    // 同步改变商家列表
    getStore(state, payload) {
      state.storeList = payload;
    },
  },
  actions: {
    // 异步请求商家列表
    async getStoreAsync({ commit }) {
      const res = await axios.get("/api/merchants/store").then((res) => {
        if (res.data.code == 1) {
          let list = res.data.list.filter((item) => {
            return item.state == 1;
          });
          return list;
        }
      });
      // 调用同步接口方法
      commit("getStore", res);
    },
  },
  modules: {},
});
