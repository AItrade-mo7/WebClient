<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { NewSocket } from '@/api/CoinAI/CoinAIWss';
import { $lcg, cloneDeep } from '@/utils/tools';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const SysManage = defineAsyncComponent(() => import('./lib/SysManage.vue'));
const InfoOk = defineAsyncComponent(() => import('./lib/InfoOk.vue'));

let Config = $ref({
  AppEnv: {},
  GithubInfo: {},
  LeverOpt: [],
});

function GetConfig() {
  const route = useRoute();
  const ServeID = route.query.id as string;

  GetCoinAIConfig({
    CoinServeID: ServeID,
  })
    .then((res) => {
      if (res.Code > 0) {
        Config = res.Data;
      }
    })
    .catch((err) => {
      window.$message.error('服务尚未启动', {
        onAfterLeave() {
          window.location.href = '/CoinServe';
        },
      });
    });
}

let WssObj = null;
let WssData = $ref({});

function StartWss() {
  const route = useRoute();
  const ServeID = route.query.id as string;

  WssObj = NewSocket({
    Host: ServeID,
    MessageEvent(res) {
      if (res.Response.Code == 1) {
        WssData = {
          ...Config,
          ...res.Response.Data,
        };
      }
    },
  });
}

onMounted(() => {
  GetConfig();
  StartWss();
});

onUnmounted(() => {
  WssObj.close();
});

// 控制栏
let drawerStatus = $ref(false);
const OpenSet = () => {
  drawerStatus = true;
};
</script>

<template>
  <PageTitle class="CoinAIPageTitle">
    {{ $lcg(WssData, 'AppEnv.ServeID') }}
    <template #after v-if="WssData.AppEnv">
      <n-badge class="AITradeServer__dotNet" :dot="WssData.AppEnv.Version != WssData.GithubInfo.Version">
        <n-button size="tiny" quaternary @click="OpenSet">
          <template #icon>
            <XIcon spin name="SettingOutlined" />
          </template>
        </n-button>
      </n-badge>
    </template>
  </PageTitle>

  <n-drawer v-model:show="drawerStatus" placement="top">
    <n-drawer-content class="AITradeServer__drawer-content">
      <SysManage v-if="drawerStatus" :WssData="WssData" />
    </n-drawer-content>
  </n-drawer>

  <div class="PageWrapper" v-if="WssData.TradeLever > 1 && WssData.AppEnv.Name.length > 1">
    <InfoOk :WssData="WssData"></InfoOk>
  </div>

  <!-- <div>
    {{ WssData }}
  </div> -->
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.lineHight {
  color: @mainColor;
}

.value {
  color: #333;
}

.green {
  color: @greenColor;
}
.red {
  color: @redColor;
}
</style>

<style lang="less">
@import '@/config/constant.less';

.n-badge.n-badge--dot.AITradeServer__dotNet {
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
.n-drawer .AITradeServer__drawer-content .n-drawer-body-content-wrapper {
  padding: 16px;
}

.CoinAIPageTitle {
  .PageTitle__text {
    color: @mainColor !important;
  }
}
</style>
