import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login",
  },
  {
    path: "/login",
    component: () => import("../views/login/Index"),
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
        path: "merchantlist",
        component: () => import("../views/home/merchantlist/Index"),
      },
      {
        path: "businessreview",
        component: () => import("../views/home/businessreview/Index"),
      },
      {
        path: "users",
        component: () => import("../views/home/users/Index"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
