import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: () => import("../views/home/Index"),
    children: [
      {
        path: "/",
        redirect: "index",
      },
      {
        path: "index",
        component: () =>  import("../views/home/index/Index"),
      },
      {
        path: "search",
        component: () =>  import("../views/home/search/Search"),
      },
      {
        path: "cart",
        component: () =>  import("../views/home/cart/Cart"),
      },
      {
        path: "mine",
        component: () =>  import("../views/home/mine/Mine"),
      },
    ]
  },
  {
    path: "/login",
    component: () => import("../views/login/Index"),
  },
  {
    path: "/detail",
    component: () => import("../views/detail/Index"),
  },
  {
    path: "/city",
    component: () => import("../views/city/Index"),
  },
  {
    path: "/store",
    component: () => import("../views/store/Index"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
