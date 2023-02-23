<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> 系统邮箱地址列表 </PageTitle>
  <div>EmailList</div>
</template>

<style lang="less" scoped></style>
