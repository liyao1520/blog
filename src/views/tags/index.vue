<template>
  <div>
    <div class="common-hd">当前共{{ classifyList.length }}个分类</div>
    <div class="classify-list">
      <div class="classify" v-for="item in classifyList" :key="item.id">
        <router-link
          :to="{
            path: '/archive',
            query: { classifyId: item.id },
          }"
        >
          {{ item.name }} ( {{ item.count }} )
        </router-link>
      </div>
    </div>
    <div class="common-hd">当前共{{ tagList.length }}个标签</div>
    <div class="tag-list">
      <div class="tag" v-for="item in tagList" :key="item.id">
        <router-link
          :to="{
            path: '/archive',
            query: { tagId: item.id },
          }"
          :class="calcSizeClass(item.count)"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reqClassifyList } from "@/service/classify";
import { reqTagList } from "@/service/tag";
import { IClassify, ITag } from "@/types";
import { onMounted, ref } from "vue";
const classifyList = ref<IClassify[]>([]);
const tagList = ref<ITag[]>([]);
onMounted(async () => {
  const { result: classifies } = await reqClassifyList();
  const { result: tags } = await reqTagList();
  classifyList.value = classifies;
  tagList.value = tags;
});
const calcSizeClass = (count: number) => {
  if (count <= 1) {
    return "text-xs";
  } else if (count <= 4) {
    return "text-sm";
  } else if (count <= 10) {
    return "text-md";
  } else {
    return "text-lg";
  }
};
</script>
<style scoped lang="less">
.common-hd {
  text-align: center;
  margin-bottom: 20px;
  font-size: 16px;
}
.classify-list,
.tag-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 40px;
}
.classify-list {
  .classify {
    border: 1px solid currentColor;

    margin: 10px 5px;
    transition: 0.3s;
    a {
      display: block;
      padding: 5px 10px;
      transition: 0.3s;
    }
    &:hover {
      background-color: var(--font-primary-color);
      a {
        color: var(--font-hover-bg);
      }
    }
  }
}
.tag-list {
  .tag {
    margin: 15px;
    padding-bottom: 5px;
    border-bottom: 1px solid #ccc;
    transition: 0.2s;
    display: flex;
    align-items: flex-end;
    &:hover {
      border-bottom: 1px solid currentColor;
    }
  }
}
</style>
