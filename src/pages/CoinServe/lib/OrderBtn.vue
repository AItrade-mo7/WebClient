<script setup lang="ts">
import { h, defineEmits } from 'vue';
import { Order } from '@/api/CoinAI/index';
import AuthModal from '@/lib/AuthModal';

const $emit = defineEmits(['Success']);
const props = defineProps({
  WssData: Object,
  NowIndex: Number,
});

let SubmitStatus: boolean = $ref(false);
const SendOrder = (Type: string) => {
  SubmitStatus = true;
  AuthModal({
    IsPassword: true,
    async OkBack(param) {
      const Password = param.Password;
      return Order({
        CoinServeID: props.WssData.ServeID,
        Index: props.WssData.NowIndex,
        Type,
        Password,
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
    <n-button :disabled="SubmitStatus" @click="SendOrder('Close')"> 全部清仓</n-button>
    <n-button :disabled="SubmitStatus" type="primary" color="#18a058" @click="SendOrder('Buy')">开多</n-button>
    <n-button :disabled="SubmitStatus" type="primary" color="#d03050" @click="SendOrder('Sell')">开空</n-button>
    <n-button :disabled="SubmitStatus" type="primary" secondary color="#18a058" @click="SendOrder('BuySPOT')"
      >买入现货</n-button
    >
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
</style>
