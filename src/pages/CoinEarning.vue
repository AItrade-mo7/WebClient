<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>Coin-RTS 收益模拟器</PageTitle>
  <div class="PageWrapper"></div>
</template>

<style lang="less" scoped></style>
