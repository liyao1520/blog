<template>
  <div v-my-loading="isLoading">
    <div class="article" v-for="item in articleList" :key="item.id">
      <div class="article-title">
        <router-link :to="'/article/' + item.id"> {{ item.title }}</router-link>
      </div>
      <div class="article-info">
        <span class="article-created-at"
          >发表于{{ item.createdAt?.slice(0, -8) }}</span
        >
        |
        <span class="article-classify"
          >分类于
          <router-link
            :to="{
              path: '/archive',
              query: {
                classifyId: item.classify?.id,
                classifyName: item.classify?.name,
              },
            }"
          >
            {{ item.classify ? item.classify.name : "未知" }}
          </router-link>
        </span>
      </div>
      <div
        class="article-content"
        v-html="(marked as any).parse(item.content).replace(/href=/g,'data-href=')"
      ></div>
      <div class="article-read">
        <router-link :to="'/article/' + item.id">阅读全文</router-link>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="total"
        @current-change="handleChange"
        :pager-count="5"
        :default-current-page="parseInt(pageNum)"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ElPagination } from "element-plus";
import marked from "marked";
import "element-plus/theme-chalk/el-pagination.css";
// import "element-plus/theme-chalk/base.css";
import { reqGetArticle } from "@/service/article";
import { IArticle } from "@/types";
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const isLoading = ref(false);
const route = useRoute();
const router = useRouter();
const { page = "1" } = route.query;
const pageNum = ref<string>(page as string);
watch(
  () => route.query.page,
  async (page) => {
    isLoading.value = true;
    pageNum.value = page as string;
    const res = await reqGetArticle({
      pageFlag: 1,
      pageSize: 10,
      pageNum: page,
      sort: "new",
    });
    articleList.value = res.result;
    total.value = (res as any).count;
    isLoading.value = false;
  }
);
const articleList = ref<IArticle[]>([]);
const total = ref(0);

onMounted(async () => {
  const res = await reqGetArticle({
    pageFlag: 1,
    pageSize: 10,
    pageNum: page,
    sort: "new",
  });
  isLoading.value = true;
  articleList.value = res.result;
  total.value = (res as any).count;
  isLoading.value = false;
});

const handleChange = (page: number) => {
  router.push({ path: "/", query: { page } });
};
</script>
<style lang="less" scoped>
.article {
  .article-title {
    font-size: 24px;
    margin: 20px 0;
    > a {
      position: relative;
      &:hover {
        &::after {
          transform: scaleX(1);
        }
      }
      &::after {
        position: absolute;
        content: "";
        width: 0px;
        height: 2px;
        background-color: currentcolor;
        bottom: -2px;
        left: 0;
        width: 100%;
        transform: scaleX(0);
        transition: 0.3s;
      }
    }
  }
  .article-info {
    color: var(--font-info-color);
    font-size: 12px;
    .article-classify > a {
      border-bottom: 1px solid currentColor;
    }
  }
  .article-content {
    margin: 16px 0;
    opacity: 0.8;
    a {
      cursor: auto;
    }
  }
  .article-read {
    > a {
      position: relative;
      &:hover {
        &::after {
          width: 100%;
        }
      }
      &::after {
        position: absolute;
        content: "";
        width: 0px;
        height: 2px;
        background-color: currentcolor;
        bottom: -2px;
        left: 0;
        transition: 0.3s;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin: 40px 0;
  :deep(.el-pagination__jump) {
    .el-input__inner {
      border: 1px solid #ccc;
      &:focus {
        border: 1px solid var(--font-primary-color);
      }
    }
  }
}
</style>
