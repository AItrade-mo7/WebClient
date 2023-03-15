<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle> OKX API Key 申请指南 </PageTitle>
  <div>
    <br />
    <br />

    欧意(OKX)官网：
    <n-button text tag="a" href="https://www.okx.com" target="_blank" type="primary"> www.okx.com </n-button>

    <br />
    <br />

    <n-button text tag="a" href="https://www.jianshu.com/p/bdfaccbd4ac2" target="_blank" type="primary">
      获取OKEx API Key流程
    </n-button>

    <br />
    <br />
    <n-button text tag="a" href="https://www.okx.com/cn/download" target="_blank" type="primary">
      下载 OKX 客户端
    </n-button>
    <br />
    <br />
    PS： 部分页面可能需要科学上网才能访问。
  </div>
</template>

<style lang="less" scoped></style>
