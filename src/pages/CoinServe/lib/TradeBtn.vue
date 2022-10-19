<script setup lang="ts">
import { Buy, Sell, Close, BuySPOT } from '@/api/CoinAI/Trade';

const props = defineProps({
  WssData: Object,
  NowIndex: Number,
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
    <n-button @click="CloseAll"> 全部清仓</n-button>
    <n-button type="primary" color="#18a058" @click="BuyUp">开多</n-button>
    <n-button type="primary" color="#d03050" @click="SellDown">开空</n-button>
    <n-button type="primary" secondary color="#18a058" @click="BuySPOTFun">买入现货</n-button>
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
