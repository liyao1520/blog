<template>
  <article class="article">
    <header>
      <h1 class="article-title">{{ state.articleInfo.title }}</h1>
      <div class="article-info">
        <span>发表于{{ state.articleInfo.createdAt?.slice(0, -8) }}</span> |
        <span>分类于{{ state.articleInfo.classify?.name }}</span>
      </div>
    </header>
    <div v-html="contentHTML" class="default-theme" ref="contentEl"></div>
  </article>
</template>
<script setup lang="ts">
import { reqGetArticleById } from "@/service/article";
import { IArticle } from "@/types";
import marked from "marked";
import hljs from "highlight.js";
import { computed, nextTick, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
const contentEl = ref<HTMLDivElement | null>(null);
const route = useRoute();
const id = route.params.id;
const state = reactive<{ articleInfo: IArticle }>({
  articleInfo: {
    id: 0,
    content: "",
    title: "",
    count: 0,
    classify: {
      id: 0,
      name: "",
      describe: "",
    },
    tags: {
      id: 0,
      name: "",
    },
    classifyId: 0,
  },
});
const contentHTML = computed(() => {
  return (marked as any).parse(state.articleInfo.content);
});
onMounted(async () => {
  const { result } = await reqGetArticleById(id as string);
  state.articleInfo = result;
  nextTick(() => {
    if (contentEl.value) {
      console.log(contentEl.value);

      contentEl.value.querySelectorAll("pre code").forEach((el) => {
        hljs.highlightBlock(el as HTMLElement);
      });
    }
  });
});
</script>
<style scoped lang="less">
@media screen and (min-width: 992px) {
  .article {
    padding: 30px;
    transition: all ease 0.3s;
    box-shadow: 7px 6px 16px #888;
    outline: 1px solid #ddd;
    background-color: #fff;
    &:hover {
      box-shadow: 14px 11px 27px #888;
    }
    header {
      margin: 10px 0;
      .article-title {
        text-align: center;
        font-size: 24px;
        margin: 20px 0;
      }
      .article-info {
        text-align: center;
        color: var(--font-info-color);
      }
    }
  }
}
</style>
