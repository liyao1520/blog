import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("@/views/home/index.vue"),
    meta: {
      transitionName: "slide-left",
    },
  },
  {
    path: "/tags",
    component: () => import("@/views/tags/index.vue"),
    meta: {
      keepAlive: true, //设置页面是否需要使用缓存
      transitionName: "slide-left",
    },
  },
  {
    path: "/demo",
    component: () => import("@/views/demo/index.vue"),
    meta: {
      keepAlive: true, //设置页面是否需要使用缓存
      transitionName: "slide-left",
    },
  },
  {
    path: "/archive",
    component: () => import("@/views/archive/index.vue"),
    meta: {
      keepAlive: true, //设置页面是否需要使用缓存
      transitionName: "slide-left",
    },
  },
  {
    path: "/about",
    component: () => import("@/views/about/index.vue"),
    meta: {
      keepAlive: true, //设置页面是否需要使用缓存
      transitionName: "slide-left",
    },
  },
  {
    path: "/article/:id",
    component: () => import("@/views/article/index.vue"),
    meta: {
      keepAlive: false, //设置页面是否需要使用缓存
      transitionName: "slide-left",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "auto" };
  },
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
