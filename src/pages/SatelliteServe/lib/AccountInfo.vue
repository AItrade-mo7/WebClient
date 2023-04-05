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

function SetHunterOpt() {
  const HunterMap = cloneDeep(props.WssData.HunterData);
  const opt = [];
  opt.push({
    label: 'Null',
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

function GetHunterInfo() {
  if (props.ApiKey.Hunter < 1) {
    return;
  }
  const HunterMap = cloneDeep(props.WssData.HunterData);
  let hd: any = {};
  if (props.ApiKey.Hunter.length > 1) {
    hd = HunterMap[props.ApiKey.Hunter];
  }
  HunterData = hd;

  if (!HunterData.HunterName) {
    return;
  }

  const opt = [];
  for (let index = 1; index <= HunterData.MaxTradeLever; index++) {
    opt.push(index);
  }

  LeverOpt = opt;

  return;
}

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Password: '',
  Hunter: props.ApiKey.Hunter,
  Name: props.ApiKey.Name,
  TradeLever: props.ApiKey.TradeLever,
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
    Name: props.ApiKey.Name,
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

onMounted(() => {
  GetDetail();
  GetSliderMarks();
  SetHunterOpt();
  GetHunterInfo();
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
        <span class="label"> 杠杆倍数 </span>
        <span class="value"> {{ item.Lever }} </span>
      </div>
      <div class="block">
        <span class="label"> 初始保证金 </span>
        <span class="value"> {{ Decimal(item.Imr) }} </span>
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
    <div class="title">设置账户参数:</div>
    <div class="data-wrapper">
      <n-form ref="CoinAIAccountForm" :model="formValue" size="small" class="myForm">
        <n-form-item class="myForm__item" label-placement="left" label="选择策略:">
          <n-select v-model:value="formValue.Hunter" :options="HunterOpt" />
        </n-form-item>

        <div class="input_hint_wrapper">
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

    <div class="TradeBtnWrapper">
      <OrderBtn :WssData="props.WssData" :KeyName="props.ApiKey.Name" @Success="OrderEnd" />
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
