<script setup lang="ts">
import { VolumeFormat } from '@/utils/filters';

const props = defineProps({
  Data: Object,
  Volume: String,
  Bourse: String, // 'Binance' || 'OKX' || 'ALL'
});
</script>

<template>
  <div class="VolumeView">
    <div :class="props.Bourse">{{ VolumeFormat(props.Volume) }}</div>
    <div class="rose" v-if="props.Bourse === 'OKX'">{{ props.Data.OkxVolRose }}%</div>
    <div class="rose" v-if="props.Bourse === 'Binance'">{{ props.Data.BinanceVolRose }}%</div>
  </div>
</template>

<style lang="scss" scoped>
.VolumeView {
  font-size: 14px;
  color: #666;
  .rose {
    font-size: 12px;
  }
  .Volume {
    font-size: 18px;
  }
}
</style>
