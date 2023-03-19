<script setup lang="ts">
import { routes } from '@/lib/router/index';
import { RouterLink } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let aboutListPage = [];

for (const item of routes) {
  if (item.path == '/About') {
    aboutListPage = item.children;
  }
}
</script>

<template>
  <PageTitle> About </PageTitle>
  <div class="list">
    <template v-for="(item, index) in aboutListPage" :key="index">
      <div v-if="item.path">
        <RouterLink :to="'/About/' + item.path">
          <n-button class="a_link" text> {{ item.description }} </n-button>
        </RouterLink>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.list {
  margin-top: 20px;
}

.a_link {
  margin: 10px 6px;
  color: @mainColor;
}
</style>
