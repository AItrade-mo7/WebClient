<script setup lang="ts">
import { DateFormat, CountTimeDiff } from '@/utils/filters';
import { defineAsyncComponent } from 'vue';

import { ServeIDToParam } from '@/utils/tools';
import { OKXBaseUrl } from '@/config/constant';

const GetCcyName = (InstID: string): string => {
  const name = InstID.replace(/-USDT/gi, '');
  return name;
};

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const AccountInfo = defineAsyncComponent(() => import('./AccountInfo.vue'));
const ServeConfig = defineAsyncComponent(() => import('./ServeConfig.vue'));
const OrderBtn = defineAsyncComponent(() => import('./OrderBtn.vue'));
const ApiKeyItem = defineAsyncComponent(() => import('./ApiKeyItem.vue'));
const HunterView = defineAsyncComponent(() => import('./HunterView.vue'));

const props = defineProps({
  WssData: Object,
});

let DrawerStatus = $ref(false);
let NowKey = $ref({});

const ShowKeyDetail = (index) => {
  NowKey = props.WssData.ApiKeyList[index];
  DrawerStatus = true;
};
const DrawerClose = () => {
  NowKey = {};
  DrawerStatus = false;
};

const ShowConfig = () => {
  NowKey = {};
  DrawerStatus = true;
};
</script>

<template>
  <div class="InfoOk" v-if="props.WssData.DataSource">
    <div class="title">
      系统状态
      <span class="hint">修改您的系统全局设置</span>
      <n-button type="primary" class="editBtn" @Click="ShowConfig" size="tiny" circle>
        <template #icon>
          <XIcon name="EditOutlined" />
        </template>
      </n-button>
    </div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">系统名称</span>
        <span class="value"> {{ props.WssData.SysName }} </span>
      </div>
      <div class="block">
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(props.WssData.SysTime, true) }} </span>
      </div>
      <div class="block">
        <span class="label">系统IP</span>
        <span class="value"> {{ props.WssData.IP }} </span>
      </div>
      <div class="block">
        <span class="label">系统创建时间</span>
        <span class="value"> {{ DateFormat(props.WssData.CreateTime) }} </span>
      </div>
      <div class="block">
        <span class="label">最后修改配置时间</span>
        <span class="value"> {{ DateFormat(props.WssData.UpdateTime) }} </span>
      </div>
      <div class="block">
        <span class="label">已提供服务</span>
        <span class="value"> {{ CountTimeDiff(props.WssData.SysTime, props.WssData.CreateTime) }} </span>
      </div>
      <div class="block">
        <span class="label">系统描述</span>
        <span class="value"> {{ props.WssData.Describe }} </span>
      </div>
      <div class="block">
        <span class="label">管理员信息</span>
        <RouterLink class="value" :to="`/SatelliteServe/MainUser/${ServeIDToParam(props.WssData.ServeID)}`">
          <n-button size="medium" type="primary" text> {{ props.WssData.MainUser.NickName }} </n-button>
        </RouterLink>
      </div>
    </n-space>
    <hr />

    <div class="title">榜单状态<span class="hint">如果链接失效请及时通知开发者</span></div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">数据时间</span>
        <span class="value"> {{ DateFormat(props.WssData.NowTicker.TimeUnix) }} </span>
      </div>
      <br />
      <div class="block">
        <span class="label">榜单列表</span>
        <span class="value">
          <n-button
            v-for="(item, index) in props.WssData.NowTicker.TickerVol"
            :key="index"
            class="InstLink"
            size="tiny"
            tag="a"
            :href="`${OKXBaseUrl}/cn/trade-spot/${item}`"
            target="_blank"
            type="primary"
          >
            {{ index + 1 }} : {{ GetCcyName(item) }}
          </n-button>
        </span>
      </div>
    </n-space>
    <hr />
    <div class="title">正在运行的策略<span class="hint"> 多策略并行计算，您的账户可自由选择 </span></div>
    <HunterView :WssData="props.WssData" />

    <div class="title" v-if="props.WssData.ApiKeyList">
      APIKey 管理 ({{ props.WssData.ApiKeyList.length }}/{{ props.WssData.MaxApiKeyNum }})
      <span class="hint"> 添加交易所的 Api Key 开启全自动托管 </span>
      <RouterLink
        :to="`/SatelliteServe/AddKey/${ServeIDToParam(props.WssData.ServeID)}`"
        class="addBtn"
        v-if="props.WssData.ApiKeyList.length > 0"
      >
        <n-button type="primary" size="tiny" circle>
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
        </n-button>
      </RouterLink>
    </div>

    <div class="APIKeyWrapper" v-if="props.WssData.ApiKeyList">
      <RouterLink
        :to="`/SatelliteServe/AddKey/${ServeIDToParam(props.WssData.ServeID)}`"
        class="addBtn"
        v-if="props.WssData.ApiKeyList.length < 1"
      >
        <n-button type="primary">
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
          添加一个 OKX 秘钥
        </n-button>
      </RouterLink>

      <template v-if="props.WssData.ApiKeyList">
        <ApiKeyItem
          v-for="(item, index) in props.WssData.ApiKeyList"
          :key="index"
          :ApiKey="item"
          :ApiKeyIdx="index"
          :WssData="props.WssData"
          @ShowDetail="ShowKeyDetail"
        />
      </template>
    </div>

    <hr />

    <div class="title" v-if="props.WssData.ApiKeyList">显摆账户<span class="hint">(您的隐私是安全的)</span></div>

    <div>
      显摆的账户将在这里展示 该功能尚在开发中
      <br />
    </div>
    <hr />
    <div class="MainTradeBtn">
      <OrderBtn :WssData="props.WssData" KeyName="ALL" />
    </div>

    <n-drawer v-model:show="DrawerStatus" placement="bottom" height="80%" :on-after-leave="DrawerClose">
      <n-drawer-content :title="NowKey.Name" v-if="NowKey.Name">
        <AccountInfo :WssData="props.WssData" :ApiKey="NowKey" />
      </n-drawer-content>
      <n-drawer-content v-if="!NowKey.Name">
        <ServeConfig :WssData="props.WssData" />
      </n-drawer-content>
    </n-drawer>
    <hr />

    <div class="title">卫星服务使用基本步骤</div>
    <ol>
      <li>点击【APIKey管理】后面的黄色【小加号】</li>
      <li>根据提示注册和下载 OKX交易所</li>
      <li>打开 OKX个人中心去申请 API Key, 勾选【只读】和【交易】</li>
      <li>在本站填入你的 【API Key】</li>
      <li>用 OKX 手动成功下单 BTC合约 , 然后返回本系统【查看详情】，是否正常展示你的持仓</li>
      <li>点击【查看详情】选择一个策略【更新参数】</li>
      <li>选择一个策略【更新参数】</li>
      <li>进入详情点击【清除所有仓位】</li>
      <li>如果可以正常平仓，则表示本系统可以操作你的账户了。</li>
      <li>再次确认策略选择没问题。</li>
      <li>将你的USDT 都划转到 【okx交易账户】下。</li>
      <li>策略会在市场转变时，自动同步你的持仓。</li>
      <li>躺着等收钱（或者等着亏完[笑]）</li>
      <li>最好加个群,关于本系统的最新动向将会在群里第一时间发布</li>
    </ol>

    <n-button type="success" size="small" tag="a" href="https://doc.mo7.cc" target="_blank">
      查看图文步骤（感谢群友提供的文档）
    </n-button>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';

.title {
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  flex-wrap: wrap;
  .addBtn {
    display: block;
    margin-left: 12px;
  }

  .hint {
    font-size: 12px;
    color: #999;
    font-weight: 400;
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

.value {
  &.green {
    color: $greenColor;
  }
  &.red {
    color: $redColor;
  }
  &.gray {
    color: #999;
  }
}

.editBtn {
  margin-left: 12px;
}

.APIKeyWrapper {
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  .n-card {
    margin: 0 4px;
    margin-bottom: 8px;
    display: inline-block;
    width: 230px;
  }
  .n-card__content {
    padding: 12px;
    padding-top: 12px;
  }
}

.MainTradeBtn {
  padding: 20px;
}

.InstLink {
  margin: 6px;
}
</style>
