<script setup lang="ts">
import { DateFormat } from '@/utils/filters';
import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

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

    <div class="title">APIKey 管控</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(WssData.SysTime, true, true) }} </span>
      </div>
      <div class="block">
        <RouterLink :to="`/CoinServe/AddKey?id=${WssData.ServeID}`">
          <n-button type="primary">
            <template #icon> <XIcon name="PlusOutlined" /> </template>
          </n-button>
        </RouterLink>
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
