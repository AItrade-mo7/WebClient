<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { GetParamServeID } from '@/utils/tools';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let ServeID = $ref('');

onMounted(() => {
  ServeID = GetParamServeID();
});
</script>

<template>
  <PageTitle>UserInfo</PageTitle>
  <div class="PageWrapper UserInfo">
    <h1>【尚在开发中】</h1>
    当前页面ID: {{ ServeID }}

    <div>
      当前页面用于展示卫星服务拥有者的一些相关信息，联系方式等，以及该服务的运行时长，收益等，便于挑选。以及故障上报，商务合作等。
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
