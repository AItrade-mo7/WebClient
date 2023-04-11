<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> OrderList </PageTitle>
  <div class="PageWrapper OrderList">
    <br />
    当前账户的订单列表
    <br />
    系统帮助当前账户平仓的历史数据展示
    <br />
    账户平仓的收益和账户历史余额记录列表 【该功能尚在开发中】
    <br />
    <br />
    <br />
  </div>
</template>

<style lang="scss" scoped></style>
