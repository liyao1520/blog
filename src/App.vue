<template>
  <my-header />
  <custom />
  <main class="page-main">
    <div class="container">
      <router-view #default="{ Component, route }">
        <transition :name="route.meta.transitionName" mode="out-in">
          <keep-alive v-if="route.meta.keepAlive">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
        </transition>
      </router-view>
    </div>
  </main>
  <my-footer />
</template>
<script setup lang="ts">
import myHeader from "@/components/header/index.vue";
import myFooter from "@/components/footer/index.vue";
import custom from "@/components/custom/index.vue";
import chroma from "chroma-js";
// 主题颜色设置
const color = localStorage.getItem("theme-color");
if (color) {
  const darken = chroma(color).darken(1).hex();
  const brighten = chroma(color).brighten(1).hex();
  const style = document.body.style;
  style.setProperty("--font-primary-color", color);
  style.setProperty("--font-info-color", brighten);
  style.setProperty("--a-color", color);
  style.setProperty("--a-hover-color", darken);
}
</script>
<style lang="less">
@import "./assets/css/base.less";
.page-main {
  margin-top: 200px;
  min-height: calc(100vh - 130px);
}

.slide-left-enter-active {
  transition: 0.4s;
}
.slide-left-leave-active {
  transition: 0.3s;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(300px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>
