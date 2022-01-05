<template>
  <div>
    <nav class="nav-list">
      <div class="search">
        <input
          class="search-input"
          placeholder="分类 / 标签 / 内容"
          v-model="str"
          @keypress.enter="searchHandle"
        />
        <i class="search-icon iconfont" @click="searchHandle">&#xe651;</i>
      </div>
    </nav>
    <h1 v-if="$route.query.classifyId">
      分类 : {{ $route.query.classifyName }}
    </h1>
    <h1 v-else-if="$route.query.tagId">标签 : {{ $route.query.tagName }}</h1>
    <h1 v-else-if="$route.query.str">搜索关键词 : {{ $route.query.str }}</h1>
    <h1 v-else>全部文章</h1>
    <div v-for="(list, year) in articleListMap" :key="year" class="articles">
      <h1 class="year">{{ year }}</h1>
      <div v-for="item in list" :key="item.id" class="article">
        <router-link :to="'/article/' + item.id">
          <span class="created-at">{{ item.createdAt.slice(0, -8) }}</span>
          <span class="title"> {{ item.title }}</span>
        </router-link>
      </div>
    </div>
    <p style="margin-top: 40px" v-if="!articleList.length">没有找到文章~</p>
  </div>
</template>
<script setup lang="ts">
import { reqGetArticle } from "@/service/article";
import { IArticle } from "@/types";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const query_str = route.query.str || "";
const str = ref(query_str);

// 文章
const articleList = ref<IArticle[]>([]);
const articleListMap = computed(() => {
  let map = Object.create(null);
  articleList.value.forEach((item) => {
    const year = item.createdAt.slice(0, 4);
    //若有则push,没有则新建

    if (map[year]) {
      map[year].push(item);
    } else {
      map[year] = [item];
    }
  });
  return map;
});
watch(
  route,
  async (route) => {
    if (!route.path.includes("archive")) return;
    const {
      sort = "new",
      str,
      title,
      content,
      classifyId,
      tagId,
    } = route.query;

    const res = await reqGetArticle({
      sort,
      str,
      title,
      content,
      classifyId,
      tagId,
    });
    articleList.value = res.result;
  },
  { immediate: true }
);
const searchHandle = () => {
  router.push({
    path: "/archive",
    query: {
      str: str.value,
    },
  });
};
</script>
<style scoped lang="less">
.nav-list {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
  // a {
  //   margin: 0 5px;
  // }
  // .active {
  //   border-bottom: 1px solid currentColor;
  // }
  .search {
    position: relative;
    .search-input {
      position: absolute;
      right: 0;
      width: 130px;
      padding: 4px 5px 4px 10px;
      border: 1px solid transparent;
      background-color: #f4f5f5;
      color: var(--font-primary-color);
      &::placeholder {
        color: var(--font-info-color);
      }
      transition: 0.2s;
      &:focus {
        border: 1px solid var(--font-primary-color);
        width: 200px;
        padding: 6px 7px 6px 12px;
      }
      margin: 0 5px;
    }
    .search-icon {
      position: absolute;
      right: 10px;
      padding: 3px;
      cursor: pointer;
    }
  }
}
.year {
  padding-top: 40px;
  padding-bottom: 40px;
  font-size: 24px;
  font-weight: bold;
}
.articles {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    left: -30px;
    width: 4px;
    height: 100%;
    background-color: #f5f5f5;
  }
  .article {
    margin: 10px 0;
    &::before {
      position: absolute;
      content: "";
      left: -32px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--font-info-color);
      margin-top: 8px;
      transition: 0.3s;
    }
    &:hover {
      &::before {
        background-color: var(--font-primary-color);
      }

      > a {
        transform: scale(1.1);
        .created-at {
          color: var(--font-primary-color);
        }
      }
    }
    > a {
      display: inline-block;
      align-items: center;
      height: 40px;
      transition: 0.15s;

      .created-at {
        color: var(--font-info-color);
        font-size: 12px;
      }
      .title {
        margin-left: 30px;
        font-size: 16px;
      }
    }
  }
}
</style>
