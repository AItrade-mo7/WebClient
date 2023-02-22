<script setup lang="ts">
import { NewSocket } from '@/api/CoinAI/CoinAIWss';
import { onMounted, onUnmounted } from 'vue';
import type { WssDataType } from '@/api/CoinAI/WssType.d';
import type { resDataType } from '@/utils/utils.d';
import { defineAsyncComponent } from 'vue';
import { DateFormat } from '@/utils/filters';

const TradeBtn = defineAsyncComponent(() => import('./TradeBtn.vue'));

const props = defineProps({
  config: Object,
});

let WssData: WssDataType = $ref({});
let ResData: resDataType = $ref({});
let socketObj: any;

onMounted(() => {
  if (props.config.AppEnv.SatelliteServe) {
    socketObj = NewSocket({
      Host: props.config.AppEnv.SatelliteServe,
      MessageEvent(res) {
        ResData = res.Response;
        if (res.Response.Code == 1) {
          WssData = res.Response.Data;
        }
      },
    });
  }
});

onUnmounted(() => {
  socketObj.close();
});
</script>

<template>
  <div>{{ WssData }}</div>
  <div class="InfoOk" v-if="WssData.DataSource">
    <div class="title">系统状态</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">连接状态</span>
        <span class="value green">{{ ResData.Msg }}</span>
      </div>
      <div class="block">
        <span class="label">系统时间</span>
        <span class="value"> {{ DateFormat(WssData.SysTime) }} </span>
      </div>
    </n-space>
  </div>
  <TradeBtn v-if="WssData.SatelliteServe" :WssData="WssData" />
  <div v-if="!WssData.DataSource">
    正在连接到 <span class="lineHight">{{ props.config.AppEnv.SatelliteServe }}</span> .....
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.lineHight {
  color: @mainColor;
}

.title {
  font-weight: 700;
  font-size: 18px;
}
.value {
  color: #333;
}

.green {
  color: @greenColor;
}
.red {
  color: @redColor;
}

.data-wrapper {
  .block {
    font-size: 14px;
    .label {
      color: #666;
      font-size: 12px;
      &::after {
        content: ' : ';
      }
    }
  }
}
</style>
