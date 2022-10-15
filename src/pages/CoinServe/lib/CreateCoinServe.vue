<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
</script>

<template>
  <div class="CreateCoinServe">创建一个 CoinServe xxxx</div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.CreateCoinServe {
}
</style>
