<script setup lang="ts">
import { Logo } from '@/config/constant';
import { TopBarStore } from '@/store';
import { useRouter } from 'vue-router';

import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

const $router = useRouter();
</script>

<template>
  <PageTitle>ManageEmail</PageTitle>
  <div class="PageWrapper ManageEmail"></div>
</template>

<style lang="less" scoped></style>
