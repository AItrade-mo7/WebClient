<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { Ping } from '@/api/Ping';
import { MarketPing } from '@/api/CoinMarket/index';
import { MsgPing } from '@/api/Msg/index';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

const ViteConst = window.ViteConst;

let ApiInfo = $ref({});
let ClientInfo = $ref({});
let CoinAIInfo = $ref({});
let MarketInfo = $ref({});
let MsgInfo = $ref({});

function GetPing() {
  Ping().then((res) => {
    ApiInfo = res.Data.ApiInfo;
    ClientInfo = res.Data.ClientInfo;
    CoinAIInfo = res.Data.CoinAIInfo;
  });

  MarketPing().then((res) => {
    MarketInfo = res.Data.AppInfo;
  });

  MsgPing().then((res) => {
    MsgInfo = res.Data.ApiInfo;
  });
}

onMounted(() => {
  GetPing();
});
</script>

<template>
  <PageTitle class="CoinAIPageTitle"> 版本说明 </PageTitle>

  <div class="data-wrapper" v-if="ClientInfo.Version">
    <hr />
    更新日志：<br />
    【待补充】

    <hr />
    <div class="ClientInfo">
      <div class="block" :class="{ red: ClientInfo.Version != ViteConst.AppVersion }">
        <span class="label">当前客户端版本</span>
        <span class="value"> {{ ViteConst.AppVersion }} </span>
      </div>
      <div class="block">
        <span class="label">最新客户端版本</span>
        <span class="value"> {{ ClientInfo.Version }} </span>
      </div>
      <span v-if="ClientInfo.Version !== ViteConst.AppVersion" class="red">
        【等待缓存过期，或手动清除浏览器缓存】
      </span>
    </div>

    <div class="block">
      <span class="label">Message.net 版本</span>
      <span class="value"> {{ MsgInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">UserCenter.net 版本</span>
      <span class="value"> {{ ApiInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">CoinMarket.net 版本</span>
      <span class="value"> {{ MarketInfo.Version }} </span>
    </div>

    <div class="block">
      <span class="label">CoinAI.net 版本</span>
      <span class="value"> {{ CoinAIInfo.Version }} </span>
    </div>

    <hr />
    版本号说明：<br />
    A.B.C -> <br />
    <div class="block">
      <span class="label"> A </span>
      <span class="value">主版本号，此版本号变更代表着跨越式的升级，代表着软件架构和Api的大幅度革新。</span>
    </div>
    <div class="block">
      <span class="label"> B </span>
      <span class="value">子版本号，此版本号的变更代表着功能的增减或变动，可以明显察觉到变化。</span>
    </div>
    <div class="block">
      <span class="label"> C </span>
      <span class="value">阶段版版本号，例如 BUG 修复，功能完善，输出变化等。</span>
    </div>

    <hr />
    系统模块介绍： <br /><br />
    <div class="block">
      <span class="label">Message.net </span>
      <span class="value">
        消息队列服务，处理消息队列，订单记录，邮件发送等所有异步的任务。也包含 token
        验证，邮箱验证码验证等与主体业务逻辑无关的服务。
        <span class="hint"> 接口鉴权级别：中 </span>
      </span>
    </div>
    <br />

    <div class="block">
      <span class="label">UserCenter.net </span>
      <span class="value">
        用户中心，包括登录，注册，一般鉴权，平台账户管理等。
        <span class="hint"> 接口鉴权级别：中 </span>
      </span>
    </div>
    <br />

    <div class="block">
      <span class="label">CoinMarket.net </span>
      <span class="value">
        市场数据获取模块，定时任务，海量数据爬取和处理，市场走势的粗算，数据清洗等。
        <span class="hint"> 接口鉴权级别：低 </span>
      </span>
    </div>
    <br />

    <div class="block">
      <span class="label">CoinAI.net </span>
      <span class="value">
        核心的策略模块，包含买卖点位判断，价格走势分析，交易下单，ApiKey管理等。支持独立部署的卫星服务。打包成二进制程序公开发发行到
        Github。 <span class="hint"> 接口鉴权级别：高 </span>
      </span>
    </div>
    <br />
  </div>
</template>

<style lang="less" scoped>
.ClientInfo {
  display: flex;
  flex-wrap: wrap;
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

.hint {
  font-size: 12px;
  color: #999;
}
</style>
