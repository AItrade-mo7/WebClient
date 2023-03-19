<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getUserInfo } from '@/api/Account';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let UserID = $ref('');
let UserData = $ref({});

onMounted(() => {
  const route = useRoute();
  UserID = route.query.id;

  getUserInfo({ UserID }).then((res) => {
    UserData = res.Data;
  });
});
</script>

<template>
  <PageTitle>UserInfo</PageTitle>
  <div class="PageWrapper UserInfo">
    <h1>【尚在开发中】 设定，只能查看当前用户主动公开的信息。</h1>
    {{ UserData }}
  </div>
</template>

<style lang="less" scoped></style>
