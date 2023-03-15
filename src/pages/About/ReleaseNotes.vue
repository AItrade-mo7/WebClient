<script setup lang="ts">
import { h, onMounted, defineAsyncComponent } from 'vue';
import { Ping } from '@/api/Ping';
import { MarketPing } from '@/api/CoinMarket/index';
import { GetCoinAIConfig, SetKey } from '@/api/CoinAI/index';

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

let CoinAIGithubInfo = $ref({});
function GetConfig() {
  GetCoinAIConfig({
    SatelliteServe: '3.1.68.15:9012',
  }).then((res) => {
    if (res.Code > 0) {
      CoinAIGithubInfo = res.Data.GithubInfo;
    }
  });
}

onMounted(() => {
  GetPing();
  GetConfig();
});
</script>

<template>
  <PageTitle class="CoinAIPageTitle"> 版本说明 </PageTitle>
  <div class="data-wrapper" v-if="ClientInfo.Version">
    <div class="ClientInfo">
      <div class="block" :class="{ red: ClientInfo.Version != ViteConst.AppVersion }">
        <span class="label">当前客户端版本</span>
        <span class="value"> {{ ViteConst.AppVersion }} </span>
      </div>
      <span v-if="ClientInfo.Version != ViteConst.AppVersion" class="red">
        【等待缓存过期，或手动清除浏览器缓存】
      </span>
      <div class="block">
        <span class="label">最新客户端版本</span>
        <span class="value"> {{ ClientInfo.Version }} </span>
      </div>
    </div>

    <div class="block">
      <span class="label">DataCenter.net 版本</span>
      <span class="value"> {{ ApiInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">CoinMarket.net 版本</span>
      <span class="value"> {{ MarketInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">CoinAI.net 版本</span>
      <span class="value"> {{ CoinAIGithubInfo.Version }} </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.ClientInfo {
  display: flex;
  .block {
    margin-right: 16px;
  }
}
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
