<script setup lang="ts">
import { h, onMounted } from 'vue';
import { GetAccountDetail } from '@/api/CoinAI/index';
import { DateFormat, Decimal, WholeDirFormat } from '@/utils/filters';

const props = defineProps({
  WssData: Object,
  NowIndex: Number,
});

let Balance = $ref([]);
let Positions = $ref([]);

function GetDetail() {
  GetAccountDetail({
    CoinServeID: props.WssData.ServeID,
    Index: props.NowIndex,
  }).then((res) => {
    if (res.Code > 0) {
      if (res.Data.Balance.length > 0) {
        Balance = res.Data.Balance;
      }
      if (res.Data.Positions.length > 0) {
        Positions = res.Data.Positions;
      }
    }
  });
}

onMounted(() => {
  GetDetail();
});
</script>

<template>
  <div class="AccountInfo">
    <div class="title">账户余额 (USDT)</div>
    <div class="data-wrapper">
      <div class="block" v-for="item in Balance">
        <span class="label">{{ item.CcyName }}</span>
        <span class="value">{{ Decimal(item.Balance) }}</span>
      </div>
    </div>
    <br />
    <div class="title">当前持仓</div>
    <div class="data-wrapper" v-for="item in Positions">
      <div class="block">
        <span class="label"> 持仓产品 </span>
        <span class="value"> {{ item.InstID }} </span>
      </div>
      <div class="block">
        <span class="label"> 开仓时间 </span>
        <span class="value"> {{ DateFormat(item.CTime, true) }} </span>
      </div>
      <div class="block">
        <span class="label"> 杠杆倍数 </span>
        <span class="value"> {{ item.Lever }} </span>
      </div>
      <div class="block">
        <span class="label"> 初始保证金 </span>
        <span class="value"> {{ Decimal(item.Imr) }} </span>
      </div>
      <div class="block">
        <span class="label"> 未实现收益 </span>
        <span class="value" :class="WholeDirFormat(item.Upl, true).class"> {{ Decimal(item.Upl) }} </span>
      </div>
      <div class="block">
        <span class="label"> 未实现收益率 </span>
        <span class="value" :class="WholeDirFormat(item.UplRatio, true).class">
          {{ Decimal(item.UplRatio, true) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.value {
  &.green {
    color: @greenColor;
  }
  &.red {
    color: @redColor;
  }
  &.gray {
    color: #999;
  }
}

.title {
  font-size: 16px;
}
.data-wrapper {
  width: 100%;
  border-bottom: 1px solid #000;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 6px;
  margin-bottom: 6px;
}
.block {
  font-size: 14px;
  margin-right: 8px;
  .label {
    color: #666;
    &::after {
      content: ' : ';
    }
  }
  .value {
    font-weight: bold;
  }
}
</style>
