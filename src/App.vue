<template>
  <my-header />
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
  <footer></footer>
</template>
<script setup lang="ts">
import myHeader from "@/components/header/index.vue";
</script>
<style lang="less">
@import "./assets/css/base.less";
.page-main {
  margin-top: 160px;
  background-image: linear-gradient(#f5f5f5 1px, transparent 0),
    linear-gradient(90deg, #f5f5f5 1px, transparent 0);
  background-size: 30px 30px, 30px 30px;
  min-height: calc(100vh - 130px);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: 0.3s;
}

.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}
</style>
