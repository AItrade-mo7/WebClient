<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> 用户协议与免责声明 </PageTitle>
  <div>用户协议与免责声明</div>
</template>

<style lang="less" scoped></style>
