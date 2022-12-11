<script setup lang="ts">
import { DateFormat } from '@/utils/filters';
import AuthModal from '@/lib/AuthModal';
import { defineAsyncComponent } from 'vue';
import { cloneDeep, ParseOkxKey } from '@/utils/tools';
import { HandleKey } from '@/api/CoinAI/index';
import { UserInfoStore } from '@/store';
import { WholeDirFormat } from '@/utils/filters';
import { $lcg } from '@/utils/tools';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const AccountInfo = defineAsyncComponent(() => import('./AccountInfo.vue'));
const ServeConfig = defineAsyncComponent(() => import('./ServeConfig.vue'));
const OrderBtn = defineAsyncComponent(() => import('./OrderBtn.vue'));

const props = defineProps({
  WssData: Object,
});

let DrawerStatus = $ref(false);
let NowIndex = $ref(-1);
let NowKey = $ref({});

const ShowKeyDetail = (index) => {
  DrawerStatus = true;
  NowIndex = index;
  NowKey = props.WssData.AppEnv.ApiKeyList[NowIndex];
};
const DrawerClose = () => {
  DrawerStatus = false;
  NowIndex = -1;
  NowKey = {};
};

const ShowConfig = (index) => {
  DrawerStatus = true;
};

let HandleKeyStatus: boolean = $ref(false);
let HandleKeyFormValue = $ref({
  Index: -1,
  Password: '',
  Type: '',
});

const SendForm = async () => {
  const res = await HandleKey({
    ...cloneDeep(HandleKeyFormValue),
    CoinServeID: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$message.success(res.Msg);
  }
  window.$Event['CoinAIGetConfig']();
};

const HandleKeySubmit = async (type: string, Index: number) => {
  HandleKeyFormValue = {};
  HandleKeyStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      HandleKeyStatus = false;
      HandleKeyFormValue.Password = param.Password;
      HandleKeyFormValue.Type = type;
      HandleKeyFormValue.Index = Index;
      return SendForm();
    },
  });
  HandleKeyStatus = false;
};

function GetWholeDir(wss) {
  const Last = $lcg(props.WssData, 'TradeKdataLast', {});
  console.log();
  let WholeDir = 0;
  if (Last.CAP_EMA - 0 > 1) {
    WholeDir = 1;
  } else {
    WholeDir = -1;
  }
  return {
    ...WholeDirFormat(WholeDir),
    CAP_EMA: Last.CAP_EMA,
  };
}
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
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(props.WssData.SysTime, true, true) }} </span>
      </div>
      <div class="block">
        <span class="label">系统名称</span>
        <span class="value"> {{ props.WssData.Name }} </span>
      </div>
      <div class="block">
        <span class="label">计价货币</span>
        <span class="value"> {{ $lcg(props.WssData, 'NowTicker.Unit') }} </span>
      </div>
      <div class="block">
        <span class="label">杠杆倍数</span>
        <span class="value"> {{ props.WssData.TradeLever }} </span>
      </div>
    </n-space>

    <div class="title">监听数据</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">当前监听</span>
        <span class="value"> {{ $lcg(props.WssData, 'TradeKdataLast.InstID') }} </span>
      </div>
      <div class="block">
        <span class="label">当前价格</span>
        <span class="value" :class="WholeDirFormat($lcg(props.WssData, 'TradeKdataLast.Dir')).class">
          {{ $lcg(props.WssData, 'TradeKdataLast.C') }}
        </span>
      </div>
      <div class="block">
        <span class="label">上涨指数</span>
        <RouterLink to="/CoinTicker">
          <span class="value" :class="GetWholeDir(props.WssData).class">
            {{ GetWholeDir(props.WssData).CAP_EMA }}
          </span>
        </RouterLink>
      </div>
      <div class="block">
        <span class="label">数据时间</span>
        <span class="value"> {{ $lcg(props.WssData, 'NowTicker.TimeStr') }} </span>
      </div>
    </n-space>

    <div class="title" v-if="props.WssData.AppEnv.ApiKeyList">
      APIKey 管理 ({{ props.WssData.AppEnv.ApiKeyList.length }}/{{ props.WssData.MaxApiKeyNum }})
      <RouterLink
        :to="`/CoinServe/AddKey?id=${props.WssData.ServeID}`"
        class="addBtn"
        v-if="props.WssData.AppEnv.ApiKeyList.length > 0"
      >
        <n-button type="primary" size="tiny" circle>
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
        </n-button>
      </RouterLink>
    </div>
    <div class="APIKeyWrapper" v-if="props.WssData.AppEnv.ApiKeyList">
      <RouterLink
        :to="`/CoinServe/AddKey?id=${props.WssData.ServeID}`"
        class="addBtn"
        v-if="props.WssData.AppEnv.ApiKeyList.length < 1"
      >
        <n-button type="primary">
          <template #icon>
            <XIcon name="PlusOutlined" />
          </template>
          添加一个 OKX 秘钥
        </n-button>
      </RouterLink>
      <template v-if="props.WssData.AppEnv.ApiKeyList">
        <n-card
          v-for="(item, index) in props.WssData.AppEnv.ApiKeyList"
          :key="item.Name"
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
            <span class="Server__val">
              {{ item.Passphrase }}
            </span>
          </div>

          <template #footer>
            <div class="card_footer" v-if="UserInfoStore.value.UserID == item.UserID">
              <n-button
                size="small"
                v-if="item.IsTrade"
                type="success"
                :disabled="HandleKeyStatus"
                @click="HandleKeySubmit('embed', index)"
              >
                已启用
              </n-button>
              <n-button
                size="small"
                v-if="!item.IsTrade"
                type="tertiary"
                :disabled="HandleKeyStatus"
                @click="HandleKeySubmit('embed', index)"
              >
                已禁用
              </n-button>
              <n-button size="small" type="error" :disabled="HandleKeyStatus" @click="HandleKeySubmit('del', index)">
                删除
              </n-button>
              <n-button size="small" type="primary" @click="ShowKeyDetail(index)"> 查看详情 </n-button>
            </div>
          </template>
        </n-card>
      </template>
    </div>

    <div class="MainTradeBtn">
      <OrderBtn :WssData="props.WssData" :NowIndex="-1" />
    </div>

    <n-drawer v-model:show="DrawerStatus" placement="bottom" height="80%" :on-after-leave="DrawerClose">
      <n-drawer-content :title="NowKey.Name" v-if="NowKey.Name">
        <AccountInfo :WssData="props.WssData" :NowIndex="NowIndex" />
      </n-drawer-content>
      <n-drawer-content v-if="!NowKey.Name">
        <ServeConfig :WssData="props.WssData" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

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
    color: @greenColor;
  }
  &.red {
    color: @redColor;
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
  justify-content: space-between;
}

.MainTradeBtn {
  padding: 20px;
}
</style>
