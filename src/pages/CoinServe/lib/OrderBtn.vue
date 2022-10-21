<script setup lang="ts">
import { Order } from '@/api/CoinAI/index';

const props = defineProps({
  WssData: Object,
  NowIndex: Number,
});

const SendOrder = (Type: string) => {
  Order({
    CoinServeID: props.WssData.ServeID,
    Index: 1,
    Type,
  });
};
</script>

<template>
  <div class="TradeBtn">
    <n-button @click="SendOrder('Close')"> 全部清仓</n-button>
    <n-button type="primary" color="#18a058" @click="SendOrder('Buy')">开多</n-button>
    <n-button type="primary" color="#d03050" @click="SendOrder('Sell')">开空</n-button>
    <n-button type="primary" secondary color="#18a058" @click="SendOrder('BuySPOT')">买入现货</n-button>
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
