import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
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
        component: () => import("../views/home/index/Index"),
      },
      {
        path: "kind",
        component: () => import("../views/home/kind/Index"),
      },
      {
        path: "increase",
        component: () => import("../views/home/increase/Index"),
      },
      {
        path: "reduction",
        component: () => import("../views/home/reduction/Index"),
      },
      {
        path: "order",
        component: () => import("../views/home/order/Index"),
      },
      {
        path: "receive",
        component: () => import("../views/home/receive/Index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login/Index"),
  },
  {
    path: "/registered",
    component: () => import("../views/registered/Index"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
