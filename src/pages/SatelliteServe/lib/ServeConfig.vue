<script setup lang="ts">
import { EditConfig } from '@/api/CoinAI/index';
import AuthModal from '@/lib/AuthModal';
import { cloneDeep } from '@/utils/tools';

const props = defineProps({
  WssData: Object,
});

let SubmitStatus: boolean = $ref(false);
const formValue = $ref({
  Password: '',
  EmailCode: '',
  SysName: props.WssData.SysName,
  MaxApiKeyNum: props.WssData.MaxApiKeyNum,
  Describe: props.WssData.Describe,
});

const SendForm = async () => {
  const res = await EditConfig({
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
    EmailAction: '修改系统设置',
    async OkBack(param) {
      SubmitStatus = false;
      formValue.Password = param.Password;
      formValue.EmailCode = param.Code;
      return SendForm();
    },
  });
};
</script>

<template>
  <div class="ServeConfig">
    <div class="title">修改系统参数</div>
    <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
      <n-form-item class="myForm__item" label-placement="left" label="系统名称:">
        <n-input
          name="SysName"
          v-model:value="formValue.SysName"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="系统名称"
        >
        </n-input>
      </n-form-item>

      <n-form-item class="myForm__item" label-placement="left" label="系统名称:">
        <n-input
          class="textarea"
          name="Describe"
          v-model:value="formValue.Describe"
          :inputProps="{ autocomplete: 'password' }"
          type="textarea"
          placeholder="系统描述"
        >
        </n-input>
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

<style lang="scss" scoped>
@import '@/config/constant.scss';
.title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
}

.textarea {
  text-align: left;
}
input {
  text-align: left;
}
</style>
