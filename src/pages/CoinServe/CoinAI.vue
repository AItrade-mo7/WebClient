<script setup lang="ts">
import { h, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { defineAsyncComponent } from 'vue';
import { GetCoinAIConfig } from '@/api/CoinAI/index';
import { $lcg } from '@/utils/tools';
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
        console.log(Config);
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
onMounted(() => {
  const route = useRoute();
  GetConfig(route.query.id);
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

  <div class="PageWrapper">阿斯大苏打阿斯达</div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
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
