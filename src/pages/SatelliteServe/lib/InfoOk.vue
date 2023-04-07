<script setup lang="ts">
import { DateFormat } from '@/utils/filters';
import { defineAsyncComponent } from 'vue';

import { WholeDirFormat } from '@/utils/filters';
import { $lcg, ServeIDToParam } from '@/utils/tools';
import { OKXBaseUrl } from '@/config/constant';
import { cloneDeep } from 'lodash';

const GetCcyName = (InstID: string): string => {
  const name = InstID.replace(/-USDT/gi, '');
  return name;
};

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const AccountInfo = defineAsyncComponent(() => import('./AccountInfo.vue'));
const ServeConfig = defineAsyncComponent(() => import('./ServeConfig.vue'));
const OrderBtn = defineAsyncComponent(() => import('./OrderBtn.vue'));
const ApiKeyItem = defineAsyncComponent(() => import('./ApiKeyItem.vue'));

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

const GetHunterNameArr = () => {
  const nameArr = Object.keys(props.WssData.HunterData).sort();
  const HunterArr = [];
  for (const key of nameArr) {
    const Hunter = cloneDeep(props.WssData.HunterData[key]);
    HunterArr.push(Hunter);
  }
  return HunterArr;
};
</script>

<template>
  <div class="InfoOk" v-if="props.WssData.DataSource">
    <div class="title">
      系统状态
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

    <div class="title">榜单状态</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">数据时间</span>
        <span class="value"> {{ DateFormat(props.WssData.NowTicker.TimeUnix) }} </span>
      </div>
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
    <div class="title">正在运行的策略：</div>
    <div v-for="(item, key) in GetHunterNameArr()" :key="key">
      <div class="title">{{ item.HunterName }}</div>
      <n-space class="data-wrapper">
        <div class="block">
          <span class="label">当前K线</span>
          <span class="value"> {{ item.KdataInstID }} </span>
        </div>
        <div class="block">
          <span class="label">当前价格</span>
          <span class="value" :class="WholeDirFormat($lcg(item, 'NowKdata.Dir')).class">
            {{ $lcg(item, 'NowKdata.C') }}
          </span>
        </div>
        <div class="block">
          <span class="label">K线时间</span>
          <span class="value"> {{ DateFormat(item.NowKdata.TimeUnix) }} </span>
        </div>

        <div class="block">
          <span class="label">K线长度</span>
          <span class="value"> {{ item.KdataLen }} </span>
        </div>
        <div class="block">
          <span class="label">策略数据长度</span>
          <span class="value"> {{ item.TradeKdataLen }} </span>
        </div>

        <div class="block">
          <span class="label">当前交易对</span>
          <span class="value"> {{ item.TradeInstID }} </span>
        </div>

        <div class="block">
          <span class="label">Param</span>
          <span class="value"> {{ item.TradeKdataOpt }} </span>
        </div>

        <div class="block">
          <span class="label">描述</span>
          <span class="value"> {{ item.Describe }} </span>
        </div>
      </n-space>
    </div>

    <hr />

    <div class="title" v-if="props.WssData.ApiKeyList">
      APIKey 管理 ({{ props.WssData.ApiKeyList.length }}/{{ props.WssData.MaxApiKeyNum }})
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
  .addBtn {
    display: block;
    margin-left: 12px;
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
