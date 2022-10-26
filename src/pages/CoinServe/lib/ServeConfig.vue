<script setup lang="ts">
import { h, onMounted, defineEmits } from 'vue';
import { GetAccountDetail } from '@/api/CoinAI/index';
import { DateFormat, Decimal, WholeDirFormat } from '@/utils/filters';
import OrderBtn from './OrderBtn.vue';
</script>

<template>
  <div class="ServeConfig">账户设置</div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
</style>
