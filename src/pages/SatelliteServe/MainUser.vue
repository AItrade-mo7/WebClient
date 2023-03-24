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
    <h1>【尚在开发中】 设定，只能查看当前用户主动公开的信息。</h1>
    {{ ServeID }}
  </div>
</template>

<style lang="scss" scoped></style>
