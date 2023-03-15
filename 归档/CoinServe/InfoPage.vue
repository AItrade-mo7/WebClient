<script setup lang="ts">
import { mStorage } from '@/utils/tools';
import { useRouter } from 'vue-router';
import { GetCoinFundConfig } from '@/api/CoinAI';
import { $lcg } from '@/utils/tools';
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const InfoOk = defineAsyncComponent(() => import('./lib/InfoOk.vue'));
const InfoNot = defineAsyncComponent(() => import('./lib/InfoNot.vue'));
const SysManage = defineAsyncComponent(() => import('./lib/SysManage.vue'));

const $router = useRouter();
const SatelliteServe = mStorage.get('SatelliteServe');
let CoinServeConfig = $ref({});

const GetConfig = () => {
  GetCoinFundConfig({
    SatelliteServe,
  }).then((res) => {
    if (res.Code > 0) {
      CoinServeConfig = res.Data;
    }
  });
};

if (SatelliteServe.length < 6) {
  window.$message.warning('缺少 SatelliteServe');
  $router.replace('/SatelliteServe');
} else {
  // 开始
  GetConfig();
}

// 控制栏
let drawerStatus = $ref(false);
const OpenSet = () => {
  drawerStatus = true;
};
</script>

<template>
  <PageTitle>
    {{ SatelliteServe }}
    <template #after v-if="CoinServeConfig.AppInfo">
      <n-badge
        class="AItradeServer__dotNet"
        :dot="$lcg(CoinServeConfig, 'AppInfo.version', '') != $lcg(CoinServeConfig, 'GithubInfo.version', '')"
      >
        <n-button size="tiny" quaternary @click="OpenSet">
          <template #icon>
            <XIcon spin name="SettingOutlined" />
          </template>
        </n-button>
      </n-badge>
    </template>
  </PageTitle>

  <n-drawer v-model:show="drawerStatus" placement="top">
    <n-drawer-content class="AItradeServer__drawer-content">
      <SysManage v-if="drawerStatus" :config="CoinServeConfig" />
    </n-drawer-content>
  </n-drawer>

  <div class="PageWrapper">
    <InfoOk v-if="CoinServeConfig.AppInfo" :config="CoinServeConfig" />
    <InfoNot v-if="!CoinServeConfig.AppInfo" :SatelliteServe="SatelliteServe" />
  </div>
</template>

<style lang="less">
@import '@/config/constant.less';

.n-badge.n-badge--dot.AItradeServer__dotNet {
  position: relative;
  .n-badge-sup {
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    height: 5px;
    width: 5px;
    min-width: 5px;
  }
}
.n-drawer .AItradeServer__drawer-content .n-drawer-body-content-wrapper {
  padding: 16px;
}
</style>
