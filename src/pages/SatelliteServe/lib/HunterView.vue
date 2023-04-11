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

const GetDirText = (dir) => {
  if (dir > 0) {
    return '买涨';
  }

  if (dir < 0) {
    return '买跌';
  }

  if (dir == 0) {
    return '空仓';
  }

  return '数据异常';
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
    <div class="titleLitter">
      当前持仓 <span class="hint">(如果选择了该策略，您的OKX账户持仓应应与当前模拟持仓保持一致)</span>
    </div>

    <n-space class="data-wrapper">
      <div class="block">
        <span class="label">杠杆倍数</span>
        <span class="value"> {{ $lcg(item, 'TradeKdataOpt.MaxTradeLever') }} </span>
      </div>
      <div class="block">
        <span class="label">初始资金</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.InitMoney') }}</span>
      </div>
      <div class="block">
        <span class="label">手续费率</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.ChargeUpl') }}%</span>
      </div>
      <div class="block">
        <span class="label">持仓币种</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.InstID') }} </span>
      </div>
      <div class="block">
        <span class="label">当前余额</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.Money') }}</span>
      </div>
      <div class="block">
        <span class="label">开仓时间</span>
        <span class="value"> {{ DateFormat($lcg(item, 'NowVirtualPosition.OpenTime')) }} </span>
      </div>
      <div class="block">
        <span class="label">开仓价格</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.OpenAvgPx') }} </span>
      </div>
      <div class="block">
        <span class="label">持仓方向</span>
        <span class="value"> {{ GetDirText($lcg(item, 'NowVirtualPosition.NowDir')) }} </span>
      </div>
      <div class="block">
        <span class="label">当前持仓收益率</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.NowUplRatio') }}% </span>
      </div>
      <div class="block">
        <span class="label">预计本次持仓营收</span>
        <span class="value"> {{ $lcg(item, 'NowVirtualPosition.MakeMoney') }} </span>
      </div>
    </n-space>
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

.titleLitter {
  font-weight: 600;
  font-size: 14px;
  .hint {
    font-size: 12px;
    color: #999;
    font-weight: 400;
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
