<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> SatelliteServe 使用说明 </PageTitle>
  <div>SatelliteServe 使用说明</div>
</template>

<style lang="less" scoped></style>
