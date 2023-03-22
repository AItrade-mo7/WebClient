<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> PWA 应用安装指南 </PageTitle>
  <div>
    <br />
    PWA 科普：
    <n-button text tag="a" href="https://sspai.com/post/44027" target="_blank" type="primary"
      >https://sspai.com/post/44027</n-button
    >
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="less" scoped></style>
