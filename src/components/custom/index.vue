<template>
  <div class="custom-container" :class="{ open: isOpen }">
    <icon class="btn iconfont" @click="isOpen = !isOpen">&#xeaec;</icon>
    <div>主题色</div>
    <el-color-picker v-model="color" @change="changeHandle" />
    <button class="reset" @click="resetHandle">重置</button>
  </div>
</template>

<script setup lang="ts">
import { ElColorPicker } from "element-plus";
import chroma from "chroma-js";
import "element-plus/theme-chalk/el-color-picker.css";
import { ref } from "vue";
const isOpen = ref(false);
const themeColor = localStorage.getItem("theme-color") || "";

const color = ref(themeColor);
const changeHandle = (color: string) => {
  localStorage.setItem("theme-color", color);
  const darken = chroma(color).darken(1).hex();
  const brighten = chroma(color).brighten(1).hex();
  const style = document.body.style;
  style.setProperty("--font-primary-color", color);
  style.setProperty("--font-info-color", brighten);
  style.setProperty("--a-color", color);
  style.setProperty("--a-hover-color", darken);
};
const resetHandle = () => {
  localStorage.removeItem("theme-color");
  const style = document.body.style;
  style.removeProperty("--font-primary-color");
  style.removeProperty("--font-info-color");
  style.removeProperty("--a-color");
  style.removeProperty("--a-hover-color");
};
</script>

<style scoped lang="less">
.custom-container {
  position: fixed;
  left: -70px;
  top: 50%;
  z-index: 999;
  width: 70px;
  height: 85px;
  background-color: var(--header-footer-bg);
  box-shadow: 0 0 4px 3px rgba(0, 0, 0, 5%);
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: 0.2s;
  .btn {
    position: absolute;
    right: -43px;
    top: 0;
    width: 43px;
    height: 43px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    background-color: var(--header-footer-bg);
    box-shadow: -3px 0 2px 0 rgb(0 0 0 / 2%);
    color: var(--font-primary-color);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    cursor: pointer;
  }
  .reset {
    margin-top: 3px;
    cursor: pointer;
  }
}
.open {
  left: 0;
}
</style>
<style lang="less">
.el-color-picker__panel {
  input,
  button {
    border: 1px solid #ccc;
    padding: 5px;
    margin: 0 5px;
  }
  button {
    cursor: pointer;
  }
}
</style>
