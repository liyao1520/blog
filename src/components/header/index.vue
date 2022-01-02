<template>
  <transition name="hd">
    <header class="page-hd" v-show="isShow">
      <div class="container header" :class="isTop && 'top'">
        <div class="logo">
          <router-link to="/"> Coderly </router-link>
        </div>
        <nav class="nav-list">
          <router-link v-for="item in navList" :key="item.path" :to="item.path">
            <i class="iconfont icon">{{ item.icon }}</i>
            <span class="nav-item">{{ item.name }}</span>
          </router-link>
        </nav>
        <i class="menu iconfont" @click="menuClickHandle" v-show="!isTop">{{
          isMunuShow ? "&#xe7fc;" : "&#xeaf1;"
        }}</i>
        <transition name="menu">
          <nav class="menu-list" v-if="isMunuShow">
            <router-link
              v-for="item in navList"
              :key="item.path"
              :to="item.path"
            >
              <i class="iconfont icon">{{ item.icon }}</i>
              <span class="menu-item">{{ item.name }}</span>
            </router-link>
          </nav>
        </transition>
      </div>
    </header>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { throttle } from "lodash";
import navList from "./navList";
const isTop = ref(true);
const isShow = ref(true);
const prevPageY = ref(0);

onMounted(() => {
  const scrollHandle = () => {
    console.log(window.scrollY);

    const scrollY = window.scrollY;
    if (scrollY <= 40) {
      isTop.value = true;
    } else {
      //如果isTop为true,则改为false
      isTop.value = false;
      // 如果 scrollY > 300 则隐藏 header
      if (scrollY > 700) {
        isShow.value = false;
        // 如果用户往上滚动则直接显示
        if (prevPageY.value > scrollY) {
          isShow.value = true;
        }
      } else {
        isShow.value = true;
      }
      //记录上一次scrollY
      prevPageY.value = scrollY;
    }
  };
  window.addEventListener("scroll", throttle(scrollHandle, 50));
});

const isMunuShow = ref(false);
const menuClickHandle = () => {
  isMunuShow.value = !isMunuShow.value;
};
</script>

<style lang="less" scoped>
.page-hd {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #f5f5f5;
  border-bottom: #a2a2a2 1px solid;
  box-shadow: 0 1px 2px #c0c0c0;
  padding-top: 10px;
  padding-bottom: 10px;
  z-index: 10;
}
.header {
  position: relative;
  background-color: var(--header-footer-bg);
  height: 50px;
  display: flex;
  align-items: center;
  transition: 1s;

  .logo {
    position: absolute;
    top: 0;
    left: 15px;
    font-size: 24px;
    font-weight: 700;
    height: 50px;
    display: flex;
    align-items: center;
    transition: 0.8s;
    &:hover {
      &::before,
      &::after {
        transform: scaleX(1.3);
      }
    }
    a {
      color: #333;
    }
    &::after,
    &::before {
      content: "";
      position: absolute;
      height: 3px;
      width: 70%;
      left: 13px;
      background: #333;
      transition: 0.4s;
    }
    &::before {
      top: 0px;
    }
    &::after {
      bottom: 0px;
    }
  }
  .nav-list {
    position: absolute;
    right: 20px;
    transition: 1s;
    .nav-item {
      margin: 0 10px;
      padding: 5px 10px;
      border: 1px solid transparent;
      border-radius: 4px;
      &:hover {
        background-color: var(--font-hover-bg);
      }
    }
    .router-link-active {
      transition: 0.2s;
      > span {
        border-color: #333;
      }
    }
  }
  .menu {
    display: none;
    position: absolute;
    font-size: 30px;
    right: 10px;
    cursor: pointer;
  }
  .menu-list {
    position: absolute;
    width: 200px;
    right: 0;
    top: calc(100% + 12px);
    height: 100vh;
    background-color: #fff;
    z-index: -1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
    .menu-item {
      display: block;
      padding: 3px 10px;
      margin: 7px 0;
    }
  }
}

.top {
  height: 130px;
  .logo {
    left: 50%;
    transform: translate(-50%, 10px) scale(1.3);
  }
  .nav-list {
    right: 50%;
    transform: translate(50%, 40px);
  }
}
@media screen and (max-width: 768px) {
  .top > .nav-list {
    display: block;
    transform: translate(0, 40px) !important;
    left: 0;
    right: 0 !important;
  }
  .nav-list {
    display: none;
  }
  .header .menu {
    display: block;
  }
}
.hd-leave-to,
.hd-enter-from {
  transform: translateY(-100px);
}
.hd-leave-active,
.hd-enter-active {
  transition: 0.5s;
}
.menu-leave-to,
.menu-enter-from {
  transform: translateX(230px);
}
.menu-leave-active,
.menu-enter-active {
  transition: 0.5s;
}
</style>
