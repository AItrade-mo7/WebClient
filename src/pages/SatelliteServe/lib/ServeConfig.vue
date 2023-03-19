<script setup lang="ts">
import { EditConfig } from '@/api/CoinAI/index';
import AuthModal from '@/lib/AuthModal';
import { cloneDeep } from '@/utils/tools';

const props = defineProps({
  WssData: Object,
});

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  ServerName: props.WssData.Name,
  Password: '',
  Lever: props.WssData.TradeLever,
  MaxApiKeyNum: props.WssData.MaxApiKeyNum,
});

const SendForm = async () => {
  const res = await EditConfig({
    ...cloneDeep(formValue),
    SatelliteServe: props.WssData.ServeID,
  });
  if (res.Code > 0) {
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

const LeverOpt = $ref({
  2: '2x',
});
let TradeLeverMax = $ref(0);
let TradeLeverMin = $ref(1);

function FormatLeverOpt() {
  const len = props.WssData.LeverOpt.length;
  TradeLeverMax = props.WssData.LeverOpt[len - 1];
  TradeLeverMin = props.WssData.LeverOpt[0];

  for (const key of props.WssData.LeverOpt) {
    LeverOpt[key] = `${key}x`;
  }
}
FormatLeverOpt();
</script>

<template>
  <div class="ServeConfig">
    <div class="title">修改系统参数</div>
    <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
      <n-form-item class="myForm__item" label-placement="left" label="系统名称:">
        <n-input
          name="ServerName"
          v-model:value="formValue.ServerName"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="系统名称"
        >
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label="杠杆倍数:">
        <n-slider
          :tooltip="false"
          name="Lever"
          v-model:value="formValue.Lever"
          :marks="LeverOpt"
          step="mark"
          :max="TradeLeverMax"
          :min="TradeLeverMin"
        />
      </n-form-item>

      <n-form-item class="myForm__item" label-placement="left" label="ApiKey 数量上限 :">
        <n-input-number
          name="MaxApiKeyNum"
          v-model:value="formValue.MaxApiKeyNum"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="ApiKey 数量上限"
        >
        </n-input-number>
      </n-form-item>

      <n-form-item class="myForm__item">
        <n-button class="Submit" :disabled="SubmitStatus" type="primary" @click="Submit"> 提交 </n-button>
      </n-form-item>
    </n-form>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
}
</style>
