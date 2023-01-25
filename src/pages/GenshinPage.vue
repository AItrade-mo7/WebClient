<script setup lang="ts">
import { UserInfoStore } from '@/store';
import { Logo } from '@/config/constant';
import { EditProfile, logout } from '@/api/Account';
import { cloneDeep, UpLoadFileEncrypt, $lcg, getToken, setToken } from '@/utils/tools';
import AuthModal from '@/lib/AuthModal';

import { defineAsyncComponent } from 'vue';
const SendCode = defineAsyncComponent(() => import('@/lib/SendCode.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>米游社自动签到(原神)</PageTitle>
</template>

<style lang="less" scoped></style>
