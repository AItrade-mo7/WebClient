<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { EditConfig } from '@/api/CoinAI/index';
import AuthModal from '@/lib/AuthModal';
import { cloneDeep, ParseOkxKey } from '@/utils/tools';

const props = defineProps({
  WssData: Object,
});

let SubmitStatus: boolean = $ref(false);
let formValue = $ref({
  ServerName: props.WssData.Name,
  Password: '',
});

const SendForm = async () => {
  const res = await EditConfig({
    ...cloneDeep(formValue),
    CoinServeID: props.WssData.ServeID,
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
</script>

<template>
  <div class="ServeConfig">
    <div class="title">修改系统参数</div>
    <n-form ref="loginForm" :model="formValue" size="small" class="myForm">
      <n-form-item class="myForm__item" label="系统名称">
        <n-input
          name="ServerName"
          v-model:value="formValue.ServerName"
          :inputProps="{ autocomplete: 'password' }"
          placeholder="系统名称"
        >
        </n-input>
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
