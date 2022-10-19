<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { GetAccountDetail } from '@/api/CoinAI/index';

const props = defineProps({
  WssData: Object,
});

function GetDetail() {
  GetAccountDetail({
    CoinServeID: props.WssData.ServeID,
  }).then((res) => {
    if (res.Code > 0) {
    }
  });
}

onMounted(() => {
  GetDetail();
});
</script>

<template>
  <div class="TradeBtn">{{}}</div>
</template>

<style lang="less" scoped>
.TradeBtn {
  display: block;
  .n-button {
    margin: 20px;
  }
}
</style>
