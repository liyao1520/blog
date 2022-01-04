<template>
  <div class="markdowm-body" v-html="mdHTML"></div>
</template>
<script setup lang="ts">
import marked from "marked";
import { onMounted, ref } from "vue";
import { reqGetMdByName } from "../../service/md";
const mdHTML = ref("");
onMounted(async () => {
  const { result } = await reqGetMdByName("demo");
  const md = result ? result.content : "";
  mdHTML.value = (marked as any).parse(md);
});
</script>
