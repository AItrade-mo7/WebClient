<script setup lang="ts">
import { cloneDeep } from 'lodash';
import { WholeDirFormat, DateFormat } from '@/utils/filters';
import { $lcg } from '@/utils/tools';

const props = defineProps({
  WssData: Object,
});

const GetHunterNameArr = () => {
  const nameArr = Object.keys(props.WssData.HunterData).sort();
  const HunterArr = [];
  for (const key of nameArr) {
    const Hunter = cloneDeep(props.WssData.HunterData[key]);
    HunterArr.push(Hunter);
  }
  return HunterArr;
};
</script>

<template>
  <div v-for="(item, key) in GetHunterNameArr()" :key="key">
    <div class="title">{{ item.HunterName }}</div>
    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">当前K线</span>
        <span class="value"> {{ item.KdataInstID }} </span>
      </div>
      <div class="block">
        <span class="label">当前价格</span>
        <span class="value" :class="WholeDirFormat($lcg(item, 'NowKdata.Dir')).class">
          {{ $lcg(item, 'NowKdata.C') }}
        </span>
      </div>
      <div class="block">
        <span class="label">K线时间</span>
        <span class="value"> {{ DateFormat(item.NowKdata.TimeUnix) }} </span>
      </div>

      <div class="block">
        <span class="label">K线长度</span>
        <span class="value"> {{ item.KdataLen }} </span>
      </div>
      <div class="block">
        <span class="label">策略数据长度</span>
        <span class="value"> {{ item.TradeKdataLen }} </span>
      </div>

      <div class="block">
        <span class="label">当前交易对</span>
        <span class="value"> {{ item.TradeInstID }} </span>
      </div>
      <br />
      <div class="block">
        <span class="label">参数</span>
        <span class="value"> {{ item.TradeKdataOpt }} </span>
      </div>
      <br />
      <div class="block">
        <span class="label">描述</span>
        <span class="value"> {{ item.Describe }} </span>
      </div>
    </n-space>
    <div class="block">
      <span class="label">当前持仓:</span>
      <span class="value"> asasdas </span>
    </div>

    <hr />
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.title {
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  .addBtn {
    display: block;
    margin-left: 12px;
  }
}
.data-wrapper {
  margin-bottom: 12px;
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

.value {
  &.green {
    color: $greenColor;
  }
  &.red {
    color: $redColor;
  }
  &.gray {
    color: #999;
  }
}
</style>
