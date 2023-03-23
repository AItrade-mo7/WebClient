<script setup lang="ts">
import { Order } from '@/api/CoinAI/index';
import AuthModal from '@/lib/AuthModal';

const $emit = defineEmits(['Success']);
const props = defineProps({
  WssData: Object,
  KeyName: String,
});

let SubmitStatus: boolean = $ref(false);
const SendOrder = (Type: string) => {
  AuthModal({
    Title: props.KeyName == 'ALL' ? '该操作将同时操作所有账户进行交易！' : '操作当前账户',
    IsPassword: true,
    EmailAction: props.KeyName == 'ALL' ? '全账户交易操作' : '',
    async OkBack(param) {
      const Password = param.Password;
      const Code = param.Code;
      SubmitStatus = true;
      return Order({
        SatelliteServe: props.WssData.ServeID,
        Name: props.KeyName,
        Type,
        Password,
        Code,
      }).then((res) => {
        if (res.Code > 0) {
          window.$message.success(res.Msg);
          $emit('Success');
        }
        SubmitStatus = false;
      });
    },
  });
};
</script>

<template>
  <div class="TradeBtn">
    <div class="Hint">{{ props.KeyName }} :</div>
    <n-button :disabled="SubmitStatus" @click="SendOrder('Close')"> 全部清仓</n-button>
    <n-button :disabled="SubmitStatus" type="primary" color="#18a058" @click="SendOrder('Buy')">开多</n-button>
    <n-button :disabled="SubmitStatus" type="primary" color="#d03050" @click="SendOrder('Sell')">开空</n-button>
  </div>
</template>

<style lang="less" scoped>
.TradeBtn {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

  .n-button {
    width: 180px;
    margin-bottom: 16px;
  }
}

.Hint {
  font-size: 14px;
  margin-right: 6px;
  margin-bottom: 16px;
}
</style>
