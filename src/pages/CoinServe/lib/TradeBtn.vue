<script setup lang="ts">
import { Buy, Sell, Close, BuySPOT } from '@/api/CoinAI/Trade';

const props = defineProps({
  WssData: Object,
});

const BuyUp = () => {
  Buy({
    CoinServeID: props.WssData.ServeID,
  });
};

const SellDown = () => {
  Sell({
    CoinServeID: props.WssData.ServeID,
  });
};

const CloseAll = () => {
  Close({
    CoinServeID: props.WssData.ServeID,
  });
};

const BuySPOTFun = () => {
  BuySPOT({
    CoinServeID: props.WssData.ServeID,
  });
};
</script>

<template>
  <div class="TradeBtn">
    <n-button type="primary" color="#18a058" @click="BuyUp">开多</n-button>
    <n-button type="primary" color="#d03050" @click="SellDown">开空</n-button>
    <n-button type="primary" @click="CloseAll"> 清空所有持仓兑换成为USDT </n-button>
    <n-button type="primary" color="#18a058" @click="BuySPOTFun">现货买入</n-button>
  </div>
</template>

<style lang="less" scoped>
.TradeBtn {
  display: block;
  .n-button {
    margin: 20px;
  }
}
</style>
