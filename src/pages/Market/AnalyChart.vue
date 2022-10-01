<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { EchartsRender } from './EchartsRender';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

onMounted(() => {
  EchartsRender();
});
</script>

<template>
  <PageTitle> AnalyChart </PageTitle>
  <div class="AnalyChart">
    <div id="EchartsCanvas"></div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
#EchartsCanvas {
  width: 100%;
  height: 800px;
}
</style>
