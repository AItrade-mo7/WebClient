<script setup lang="ts">
import { h, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
let route = useRoute();

onMounted(() => {
  console.log(route);
});
</script>

<template>
  <PageTitle>
    CoinServe
    <template #after>
      <RouterLink to="/About/CoinServe" className="CoinServe__about">
        <n-button circle quaternary size="tiny" class="About__btn">
          <template #icon> <XIcon name="QuestionCircleOutlined" /> </template>
        </n-button>
      </RouterLink>
    </template>
  </PageTitle>
  <div class="PageWrapper">阿斯大苏打阿斯达</div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
</style>
