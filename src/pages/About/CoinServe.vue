<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> CoinServe 使用说明 </PageTitle>
  <div>CoinServe 使用说明</div>
</template>

<style lang="less" scoped></style>
