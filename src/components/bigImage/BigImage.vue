<script setup lang="ts">
import { defineProps, withDefaults, toRefs, defineEmits } from "vue";
const props = withDefaults(defineProps<{ src: string; isVisible: boolean }>(), {
  src: "",
});
const emit = defineEmits(["close"]);
const { src } = toRefs(props);

const closeHandle = () => {
  emit("close");
};
</script>
<template>
  <div class="big-imgae-wrap" @click="closeHandle">
    <img :src="src" />
  </div>
</template>
<style scoped>
.big-imgae-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.23);
  z-index: 9999;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
}

img {
  width: 90%;
}
</style>
