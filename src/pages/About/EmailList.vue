<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { GetSysEmailList } from '@/api/Ping';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

onMounted(() => {
  GetSysEmailList().then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <PageTitle> 系统邮箱地址列表 </PageTitle>
  <div>EmailList</div>
</template>

<style lang="less" scoped></style>
