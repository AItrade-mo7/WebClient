<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>OKX Api Key</PageTitle>
  <div class="PageWrapper ApiKey">
    <br />
    页面功能说明:
    <br />

    统一管理和查看当前账户在各个卫星服务填写的 Api Key, <br />
    包括每个Key 所对应的 收益、交易历史记录、当前状态，卫星服务的托管状态等。<br />
    并可以执行删除等操作。
    <br />

    PS: 当前页面功能仍在开发当中。。。

    <br />
  </div>
</template>

<style lang="scss" scoped></style>
