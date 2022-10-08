<script setup lang="ts">
import { WholeDirFormat } from '@/utils/filters';

const IndexInfo = [
  {
    Value: 1,
    Text: WholeDirFormat(1).text,
    Style: WholeDirFormat(1).class,
    Desc: '表示当前市场买入情绪高涨，大部分币种在近3小时内价格都存在不同程度的上涨，当前市场一片欣欣向荣，并且在未来的一段时间内还会继续上涨。',
  },
  {
    Value: -1,
    Text: WholeDirFormat(-1).text,
    Style: WholeDirFormat(-1).class,
    Desc: '表示当前大部分币种在近3小时内价格都存在不同程度的下跌，当前市场存在浓浓的下跌情绪中，并且在未来的一段时间内很难出现转机。',
  },
  {
    Value: 2,
    Text: WholeDirFormat(2).text,
    Style: WholeDirFormat(2).class,
    Desc: '表示上涨情绪受阻，市场出现多级分化的情况，交易量靠前的主流币种价格在上涨，但是其它币种却存在下跌的情况，一段时间后，市场有概率转跌。',
  },
  {
    Value: -2,
    Text: WholeDirFormat(-2).text,
    Style: WholeDirFormat(-2).class,
    Desc: '主流币种下跌的过程中其它币种开始出现价位回暖的情况，一段时间后，主流币种将会停止下跌。',
  },
  {
    Value: 0,
    Text: WholeDirFormat(0).text,
    Style: WholeDirFormat(0).class,
    Desc: '系统未能计算出当前的市场情绪偏向，可能是因为程序或者数据异常，也可能是当前市场交易分化严重，市场走向不明，此时不建议执行任何操作，静静等待市场反馈即可。',
  },
];
</script>

<template>
  <div class="EarnCount">
    <div class="title">数字货币实时交易情绪分析<b>(Coin-RTS)</b></div>
    <div v-for="item in IndexInfo" class="descWrapper">
      <span class="name" :class="item.Style">{{ item.Text }}</span>
      <span class="desc">{{ item.Desc }} </span>
    </div>
    <div class="descWrapper">
      <span class="name">
        <b>指标讲解</b>
      </span>
      <span class="desc">
        同时爬取多家交易所成交数据，通过自研算法同时对多个币种进行实时分析并得出结果。我将其称之为
        <b>Coin Real-time Trading Sentiment Analysis</b>简称<b>(RTS)</b>。
        期间经过多次重构和改动，目前数据库最早的分析结果记录为"2022-09-06T12:43:19"。
        因为算法需要庞大的实时成交数据做支撑，所以很难进行历史回测。因该指标与价格和历史无关，可以有效抗住假信号和震荡。
      </span>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.EarnCount {
  margin-top: 6px;
}
.title {
  font-size: 16px;
}

.green {
  border-color: @greenColor;
  color: @greenColor;
}
.red {
  border-color: @redColor;
  color: @redColor;
}

.descWrapper {
  margin-bottom: 8px;
  .name {
    font-size: 14px;
    margin-right: 6px;
    &::after {
      content: ':';
    }
  }
  .desc {
    font-size: 12px;
  }
}
</style>

<!-- 

收益计算器
开始时间某日0:00 至 当前

选择币种,币种目前就两种 BTC 和 ETH 
选择策略 1 种 为 粗狂策略

-->
