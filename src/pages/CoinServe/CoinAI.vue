<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { NewSocket } from '@/api/CoinAI/CoinAIWss';
import { DateFormat } from '@/utils/filters';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const SysManage = defineAsyncComponent(() => import('./lib/SysManage.vue'));

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
          // window.location.href = '/CoinServe';
        },
      });
    });
}

let WssObj = null;
let WssData = $ref({});
let ResData = $ref({});

function StartWss(ServeID) {
  WssObj = NewSocket({
    Host: ServeID,
    MessageEvent(res) {
      ResData = res.Response;
      if (res.Response.Code == 1) {
        WssData = res.Response.Data;
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
    <div class="InfoOk" v-if="WssData.DataSource">
      <div class="title">系统状态</div>
      <n-space class="data-wrapper">
        <div class="block">
          <span class="label">连接状态</span>
          <span class="value green">{{ ResData.Msg }}</span>
        </div>
        <div class="block">
          <span class="label">系统时间</span>
          <span class="value"> {{ DateFormat(WssData.SysTime, true, true) }} </span>
        </div>
      </n-space>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.lineHight {
  color: @mainColor;
}

.title {
  font-weight: 700;
  font-size: 18px;
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
