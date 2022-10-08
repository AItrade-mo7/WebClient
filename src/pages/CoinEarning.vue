<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle></PageTitle>
  <div class="PageWrapper"></div>
</template>

<style lang="less" scoped></style>
