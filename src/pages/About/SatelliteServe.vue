<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { RouterLink } from 'vue-router';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> SatelliteServe 使用说明 </PageTitle>
  <div>
    卫星服务架构图 【待补充】

    <br />
    <br />

    <RouterLink to="/SatelliteServe/CreateCoinServe">
      <n-button type="success"> 卫星服务部署详解 </n-button>
    </RouterLink>

    <br />
    <br />

    <n-button text tag="a" href="https://github.com/AItrade-mo7/CoinAIPackage" target="_blank" type="primary">
      卫星服务二进制程序包 | Github
    </n-button>
  </div>
</template>

<style lang="scss" scoped></style>
