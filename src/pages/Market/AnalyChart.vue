<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> AnalyChart </PageTitle>
  <div class="AnalyChart">AnalyChart</div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
</style>
