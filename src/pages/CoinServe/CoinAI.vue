<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { NewSocket } from '@/api/CoinAI/CoinAIWss';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const SysManage = defineAsyncComponent(() => import('./lib/SysManage.vue'));
const InfoOk = defineAsyncComponent(() => import('./lib/InfoOk.vue'));
const TradeBtn = defineAsyncComponent(() => import('./lib/TradeBtn.vue'));

let Config = $ref({
  AppEnv: {},
  GithubInfo: {},
});

function GetConfig(ServeID) {
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

function StartWss(ServeID) {
  WssObj = NewSocket({
    Host: ServeID,
    MessageEvent(res) {
      if (res.Response.Code == 1) {
        WssData = res.Response.Data;

        Config.AppEnv.ApiKeyList = WssData.ApiKeyList;
        Config.AppEnv.IP = WssData.IP;
        Config.AppEnv.Name = WssData.Name;
        Config.AppEnv.Port = WssData.Port;
        Config.AppEnv.ServeID = WssData.ServeID;
        Config.AppEnv.UserID = WssData.UserID;
        Config.AppEnv.Version = WssData.Version;
      }
    },
  });
}

onMounted(() => {
  const route = useRoute();
  GetConfig(route.query.id);
  StartWss(route.query.id);
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
    {{ Config.AppEnv.ServeID }}
    <template #after v-if="Config.AppEnv">
      <n-badge class="AITradeServer__dotNet" :dot="Config.AppEnv.Version != Config.GithubInfo.Version">
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
      <SysManage v-if="drawerStatus" :Config="Config" />
    </n-drawer-content>
  </n-drawer>

  <div class="PageWrapper">
    <InfoOk :WssData="WssData"></InfoOk>
    <!-- <TradeBtn v-if="WssData.ServeID" :WssData="WssData" /> -->
  </div>

  <div>
    {{ WssData }}
  </div>
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
