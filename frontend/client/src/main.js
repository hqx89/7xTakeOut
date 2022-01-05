import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
//重置样式
import "./assets/css/reset.scss";

import "amfe-flexible";
//引入vant组件
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
