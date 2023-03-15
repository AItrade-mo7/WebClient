<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> SatelliteServe 使用说明 </PageTitle>
  <div>卫星服务架构图 【待补充】</div>
</template>

<style lang="less" scoped></style>
