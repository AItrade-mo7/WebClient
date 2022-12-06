<script setup lang="ts">
import { h, onMounted, defineAsyncComponent } from 'vue';
import { Ping } from '@/api/Ping';
import { MarketPing } from '@/api/CoinMarket/index';
import { cloneDeep } from '@/utils/tools';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

const ViteConst = window.ViteConst;

let ApiInfo = $ref({});
let ClientInfo = $ref({});
let MarketInfo = $ref({});

function GetPing() {
  Ping().then((res) => {
    ApiInfo = res.Data.ApiInfo;
    ClientInfo = res.Data.ClientInfo;
  });

  MarketPing().then((res) => {
    MarketInfo = res.Data.AppInfo;
  });
}

onMounted(() => {
  GetPing();
});
</script>

<template>
  <PageTitle class="CoinAIPageTitle"> 版本说明 </PageTitle>
  <div class="data-wrapper">
    <div class="block">
      <span class="label">当前客户端版本</span>
      <span class="value"> {{ ViteConst.AppVersion }} </span>
    </div>
    <div class="block">
      <span class="label">最新客户端版本</span>
      <span class="value"> {{ ClientInfo.Version }} </span>
      <span v-if="ClientInfo.Version != ViteConst.AppVersion" class="red"> 清除浏览器缓存 </span>
    </div>

    <div class="block">
      <span class="label">DataCenter.net API 版本</span>
      <span class="value"> {{ ApiInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">CoinMarket.net API 版本</span>
      <span class="value"> {{ MarketInfo.Version }} </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.data-wrapper {
  margin-bottom: 12px;
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
