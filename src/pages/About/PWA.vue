<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> PWA 应用安装指南 </PageTitle>
  <div>
    <br />
    <br />
    <br />
    <n-button text tag="a" href="https://sspai.com/post/44027" target="_blank" type="primary">
      强化版「小程序」PWA | 科普
    </n-button>
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="less" scoped></style>
