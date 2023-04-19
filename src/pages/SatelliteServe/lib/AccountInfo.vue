<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetAccountDetail } from '@/api/CoinAI/index';
import { DateFormat, Decimal, WholeDirFormat } from '@/utils/filters';
import AuthModal from '@/lib/AuthModal';
import { cloneDeep } from '@/utils/tools';
import { SetAccountConfig } from '@/api/CoinAI/index';
const OrderBtn = defineAsyncComponent(() => import('./OrderBtn.vue'));

const props = defineProps({
  WssData: Object,
  ApiKey: Object,
});

let LeverOpt = $ref([1]);
let HunterOpt = $ref([]);
let HunterData = $ref({});

function GetNowKey() {
  const ApiKeyList = cloneDeep(props.WssData.ApiKeyList);
  let ApiKey = cloneDeep(props.ApiKey);
  for (const item of ApiKeyList) {
    if (item.Name == ApiKey.Name) {
      ApiKey = item;
      break;
    }
  }

  return ApiKey;
}

function NowHunter(): any {
  const ApiKey = GetNowKey();
  const HunterMap = cloneDeep(props.WssData.HunterData);
  let Hunter = {};
  if (ApiKey.Hunter) {
    Hunter = HunterMap[ApiKey.Hunter];
  }

  return Hunter;
}

function SetHunterOpt() {
  const HunterMap = cloneDeep(props.WssData.HunterData);

  const opt = [];
  opt.push({
    label: '停止使用策略',
    value: '',
  });

  for (const key in HunterMap) {
    if (Object.prototype.hasOwnProperty.call(HunterMap, key)) {
      const el = HunterMap[key];
      const obj = {
        label: el.HunterName,
        value: el.HunterName,
      };
      opt.push(obj);
    }
  }
  HunterOpt = opt;
}

function GetHunterInfo(val) {
  if (val < 1) {
    return;
  }
  const HunterMap = cloneDeep(props.WssData.HunterData);
  let hd: any = {};
  if (val.length > 1) {
    hd = HunterMap[val] || {};
  }
  HunterData = hd;

  if (!HunterData.HunterName) {
    return;
  }

  const opt = [];
  for (let index = 1; index <= HunterData.TradeKdataOpt.MaxTradeLever; index++) {
    opt.push(index);
  }

  LeverOpt = opt;

  return;
}

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Password: '',
  Hunter: GetNowKey().Hunter,
  Name: GetNowKey().Name,
  TradeLever: GetNowKey().TradeLever,
});

const SendForm = async () => {
  const res = await SetAccountConfig({
    ...cloneDeep(formValue),
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
    window.$Event['CoinAIGetConfig']();
    window.$message.success(res.Msg);
  }
};

const Submit = async () => {
  SubmitStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      SubmitStatus = false;
      formValue.Password = param.Password;
      return SendForm();
    },
  });
};

let Balance = $ref([]);
let Positions = $ref([]);

function GetDetail() {
  GetAccountDetail({
    SatelliteServe: props.WssData.ServeID,
    Name: GetNowKey().Name,
  }).then((res) => {
    if (res.Code > 0) {
      Balance = res.Data.Balance;
      Positions = res.Data.Positions;
    }
  });
}

const OrderEnd = () => {
  GetDetail();
};

const GetSliderMarks = () => {
  const returnObj = {};
  for (const item of LeverOpt) {
    returnObj[item] = `${item}X`;
  }
  return returnObj;
};

const handleUpdateValue = (val) => {
  formValue.Hunter = val;
  formValue.TradeLever = 1;
  GetHunterInfo(val);
};

onMounted(() => {
  GetDetail();
  GetSliderMarks();
  SetHunterOpt();
  GetHunterInfo(GetNowKey().Hunter);
});
</script>

<template>
  <div class="AccountInfo">
    <div class="title">账户余额 (USDT)</div>
    <div class="data-wrapper">
      <div class="block" v-for="(item, index) in Balance" :key="index">
        <span class="label">{{ item.CcyName }}</span>
        <span class="value">{{ Decimal(item.Balance) }}</span>
      </div>
    </div>
    <br />
    <div class="title" v-if="Positions.length > 0">当前持仓</div>
    <div class="data-wrapper" v-for="(item, index) in Positions" :key="index">
      <div class="block">
        <span class="label"> 持仓产品 </span>
        <span class="value"> {{ item.InstID }} </span>
      </div>
      <div class="block">
        <span class="label"> 开仓时间 </span>
        <span class="value"> {{ DateFormat(item.CTime, true) }} </span>
      </div>
      <div class="block">
        <span class="label"> 开仓均价 </span>
        <span class="value"> {{ item.AvgPx }} </span>
      </div>
      <div class="block">
        <span class="label"> 杠杆倍数 </span>
        <span class="value"> {{ item.Lever }} </span>
      </div>
      <div class="block">
        <span class="label"> 初始保证金 </span>
        <span class="value"> {{ Decimal(item.Imr) }} </span>
      </div>
      <div class="block">
        <span class="label"> 持仓数量 </span>
        <span class="value"> {{ item.Pos }} </span>
      </div>
      <div class="block">
        <span class="label"> 未实现收益 </span>
        <span class="value" :class="WholeDirFormat(item.Upl, true).class"> {{ Decimal(item.Upl) }} </span>
      </div>
      <div class="block">
        <span class="label"> 未实现收益率 </span>
        <span class="value" :class="WholeDirFormat(item.UplRatio, true).class">
          {{ Decimal(item.UplRatio, true) }}%
        </span>
      </div>
    </div>
    <br />
    <div class="title">设置账户参数:</div>
    <div class="data-wrapper">
      <n-form ref="CoinAIAccountForm" :model="formValue" size="small" class="myForm">
        <n-form-item class="myForm__item" label-placement="left" label="选择策略:">
          <n-select v-model:value="formValue.Hunter" :options="HunterOpt" :on-update:value="handleUpdateValue" />
        </n-form-item>
        <div class="input_hint_wrapper" v-if="GetNowKey().Hunter">
          <n-form-item class="myForm__item" label-placement="left" label="杠杆倍数:">
            <n-slider
              v-model:value="formValue.TradeLever"
              :marks="GetSliderMarks()"
              step="mark"
              :min="LeverOpt[0]"
              :max="LeverOpt[LeverOpt.length - 1]"
            />
          </n-form-item>
          <div class="input_hint">请根据当前账户资金数合理设置杠杆倍数，资金越大，建议杠杆倍数越小</div>
        </div>
        <n-form-item class="myForm__item">
          <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 更新参数 </n-button>
        </n-form-item>
      </n-form>
    </div>
    <br />

    <div class="title">当前策略信息</div>
    <div class="data-wrapper">
      <div class="block">
        <span class="label">策略名称</span>
        <span class="value"> {{ GetNowKey().Hunter }} </span>
      </div>
      <div class="block">
        <span class="label">选择的杠杆倍数</span>
        <span class="value"> {{ GetNowKey().TradeLever }}x </span>
      </div>
      <div class="block">
        <span class="label">交易对</span>
        <span class="value"> {{ NowHunter()?.TradeInstID }} </span>
      </div>
      <div class="block">
        <span class="label">当前现货价格</span>
        <span class="value"> {{ NowHunter()?.NowKdata?.C }} </span>
      </div>
    </div>
    <div class="TradeBtnWrapper" v-if="GetNowKey().Hunter">
      <OrderBtn :WssData="props.WssData" :KeyName="GetNowKey().Name" @Success="OrderEnd" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';

.TradeBtnWrapper {
  margin-top: 12px;
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

.title {
  font-size: 16px;
}
.data-wrapper {
  width: 100%;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 6px;
  margin-bottom: 6px;
}
.block {
  font-size: 14px;
  margin-right: 8px;
  .label {
    color: #666;
    &::after {
      content: ' : ';
    }
  }
  .value {
    font-weight: bold;
  }
}

.myForm {
  width: 80%;
  margin: 0 auto;
}

.input_hint {
  font-size: 12px;
}
</style>
