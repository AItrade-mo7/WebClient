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

let ServeID = $ref('');

function GetConfig() {
  GetCoinAIConfig({
    SatelliteServe: ServeID,
  })
    .then((res) => {
      if (res.Code > 0) {
        Config = res.Data;
        WssData = {
          ...Config,
          ...WssData,
        };
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

// 注入全局服务
window.$Event['CoinAIGetConfig'] = () => {
  GetConfig();
};

onMounted(() => {
  const route = useRoute();
  ServeID = route.query.id;

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
      <n-badge class="AItradeServer__dotNet" :dot="WssData.AppEnv.Version != WssData.GithubInfo.Version">
        <n-button size="tiny" quaternary @click="OpenSet">
          <template #icon>
            <XIcon spin name="SettingOutlined" />
          </template>
        </n-button>
      </n-badge>
    </template>
  </PageTitle>
  <div class="wrapper">
    <n-drawer v-model:show="drawerStatus" placement="top">
      <n-drawer-content class="AItradeServer__drawer-content">
        <SysManage v-if="drawerStatus" :WssData="WssData" />
      </n-drawer-content>
    </n-drawer>

    <div class="PageWrapper" v-if="WssData.TradeLever > 1 && WssData.AppEnv.Name.length > 1">
      <InfoOk :WssData="WssData"></InfoOk>
    </div>
    <n-alert class="noData" v-else title="该信息如果长时间存在，请尝试刷新或更换浏览器！" type="info"> </n-alert>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.wrapper {
  padding-top: 1px;
}

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

.noData {
  margin-top: 50px;
}
</style>

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

.CoinAIPageTitle {
  .PageTitle__text {
    color: @mainColor !important;
  }
}
</style>
