<script setup lang="ts">
import { DateFormat } from '@/utils/filters';
import AuthModal from '@/lib/AuthModal';
import { defineAsyncComponent } from 'vue';
import { cloneDeep } from '@/utils/tools';
import { HandleKey } from '@/api/CoinAI/index';
import { UserInfoStore } from '@/store';
import { WholeDirFormat } from '@/utils/filters';
import { $lcg, ServeIDToParam } from '@/utils/tools';
import { OKXBaseUrl } from '@/config/constant';

const GetCcyName = (InstID: string): string => {
  const name = InstID.replace(/-USDT/gi, '');
  return name;
};

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const AccountInfo = defineAsyncComponent(() => import('./AccountInfo.vue'));
const ServeConfig = defineAsyncComponent(() => import('./ServeConfig.vue'));
const OrderBtn = defineAsyncComponent(() => import('./OrderBtn.vue'));

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

let HandleKeyStatus: boolean = $ref(false);
let HandleKeyFormValue = $ref({
  Name: '',
  Password: '',
  Type: '',
});

const SendForm = async () => {
  const res = await HandleKey({
    ...cloneDeep(HandleKeyFormValue),
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success(res.Msg);
  }
  window.$Event['CoinAIGetConfig']();
};

const HandleKeySubmit = async (type: string, name: string) => {
  HandleKeyFormValue = {};
  HandleKeyStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      HandleKeyStatus = false;
      HandleKeyFormValue.Password = param.Password;
      HandleKeyFormValue.Type = type;
      HandleKeyFormValue.Name = name;
      return SendForm();
    },
  });
  HandleKeyStatus = false;
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

    <div v-for="(item, key) in props.WssData.HunterData" :key="key">
      <div class="title">策略名称: {{ item.HunterName }}</div>
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
          <span class="label">当前交易对</span>
          <span class="value"> {{ item.TradeInstID }} </span>
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
        <n-card
          v-for="(item, index) in props.WssData.ApiKeyList"
          :key="index"
          :title="item.Name"
          embedded
          hoverable
          size="small"
        >
          <div class="Server__item">
            <span class="Server__label">ApiKey </span>
            <span class="Server__val">
              {{ item.ApiKey }}
            </span>
          </div>
          <div class="Server__item">
            <span class="Server__label">SecretKey </span>
            <span class="Server__val">
              {{ item.SecretKey }}
            </span>
          </div>
          <div class="Server__item">
            <span class="Server__label">Passphrase </span>
            <span class="Server__val"> {{ item.Passphrase }} </span>
          </div>

          <template #footer>
            <div class="card_footer" v-if="UserInfoStore.value.UserID == item.UserID">
              <n-button
                size="small"
                type="error"
                v-if="item.Status == 'disable'"
                :disabled="HandleKeyStatus"
                @click="HandleKeySubmit('delete', item.Name)"
              >
                删除
              </n-button>
              <n-button
                size="small"
                v-if="item.Status == 'enable'"
                type="success"
                :disabled="HandleKeyStatus"
                @click="HandleKeySubmit('disable', item.Name)"
              >
                已启用
              </n-button>

              <n-button
                class="disableBtn"
                size="small"
                v-if="item.Status == 'disable'"
                type="tertiary"
                :disabled="HandleKeyStatus"
                @click="HandleKeySubmit('enable', item.Name)"
              >
                已禁用
              </n-button>

              <n-button v-if="item.Status == 'enable'" size="small" type="primary" @click="ShowKeyDetail(index)">
                查看详情
              </n-button>
            </div>
          </template>
        </n-card>
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

.Server__item {
  word-break: break-all;
  display: flex;
  font-size: 12px;
  padding: 8px 0;
  align-items: center;
}
.Server__label {
  width: 74px;
  flex-grow: 0;
  flex-shrink: 0;
  color: #333;
  &::after {
    content: ':';
  }
}

.Server__val {
  color: #999;
}

.card_footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .n-button {
    margin-left: 6px;
  }
}

.disableBtn {
  animation: promptBorder 1.5s infinite;
}

.MainTradeBtn {
  padding: 20px;
}

.InstLink {
  margin: 6px;
}
</style>
