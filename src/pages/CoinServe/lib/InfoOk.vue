<script setup lang="ts">
import { DateFormat } from '@/utils/filters';

const props = defineProps({
  WssData: Object,
});
</script>

<template>
  <div class="InfoOk" v-if="WssData.DataSource">
    <div class="title">系统状态</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(WssData.SysTime, true, true) }} </span>
      </div>
    </n-space>
  </div>
</template>

<style lang="less" scoped>
.title {
  font-weight: 700;
  font-size: 18px;
}
.data-wrapper {
  .block {
    font-size: 14px;
    .label {
      color: #666;
      font-size: 12px;
      &::after {
        content: ' : ';
      }
    }
  }
}
</style>
