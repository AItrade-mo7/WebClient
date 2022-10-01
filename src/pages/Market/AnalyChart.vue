<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { EchartsRender } from './EchartsRender';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

onMounted(() => {
  EchartsRender();
});
</script>

<template>
  <!-- <PageTitle> AnalyChart </PageTitle> -->
  <div class="AnalyChart">
    <div id="EchartsCanvas">asda</div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.AnalyChart {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}

#EchartsCanvas {
  width: 100%;
  height: 100%;
}
</style>
