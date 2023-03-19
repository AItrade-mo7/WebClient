<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> SatelliteServe 使用说明 </PageTitle>
  <div>
    卫星服务架构图 【待补充】

    <br />
    卫星服务部署详解 【待补充】
    <br />

    <n-button text tag="a" href="https://github.com/AItrade-mo7/CoinAIPackage" target="_blank" type="primary">
      卫星服务二进制程序包 | Github
    </n-button>
  </div>
</template>

<style lang="less" scoped></style>
