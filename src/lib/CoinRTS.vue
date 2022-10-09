<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { WholeDirFormat } from '@/utils/filters';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));

const props = defineProps({
  type: String,
});

const IndexInfo = [
  {
    Value: 1,
    Text: WholeDirFormat(1).text,
    Style: WholeDirFormat(1).class,
    Desc: '表示当前市场买入情绪高涨，大部分币种在近3小时内价格都存在不同程度的上涨，当前市场一片欣欣向荣，并且在未来的一段时间内很难出现大幅度下跌。',
  },
  {
    Value: -1,
    Text: WholeDirFormat(-1).text,
    Style: WholeDirFormat(-1).class,
    Desc: '表示当前大部分币种在近3小时内价格都存在不同程度的下跌，当前市场存在浓浓的下跌情绪中，并且在未来的一段时间内很难出现大幅度上涨。',
  },
  {
    Value: 2,
    Text: WholeDirFormat(2).text,
    Style: WholeDirFormat(2).class,
    Desc: '表示存在些微的上涨情绪，但并不那么强烈，市场投资情绪属于多级分化状态，此时应该关注近3-5小时的切片做进一步分析。',
  },
  {
    Value: -2,
    Text: WholeDirFormat(-2).text,
    Style: WholeDirFormat(-2).class,
    Desc: '表示市场存在些微下跌情绪，依然不那么明显，此时需要关注近3-5小时切片做进一步分析。',
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
      <span class="name">上涨指数</span>
      <span class="desc">综合交易量靠前币种，在时间切片内的价格波动为正向的数量，大于50%则表示市场情绪为正。</span>
    </div>
    <div class="descWrapper">
      <span class="name">涨幅均值</span>
      <span class="desc">在时间切片内根据各个币种的涨跌计算得出综合的结果，为正则表示上涨，为负则表示下跌。</span>
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
    <div class="descWrapper">
      <span class="name"> 注 </span>
      <span class="desc"> 该指标并非该系统最终交易指标，但是它依然可以当做交易参考， </span>
    </div>
    <div style="text-align: center">
      <RouterLink to="/CoinEarning" class="RouterLinkBtn" v-if="props.type == 'Earning'">
        <n-button type="primary" size="small">
          <template #icon>
            <XIcon name="DollarCircleTwotone" />
          </template>
          指标收益计算器
        </n-button>
      </RouterLink>

      <RouterLink to="/Market/AnalyHistory" class="RouterLinkBtn" v-if="props.type == 'Market'">
        <n-button strong secondary type="error">
          <template #icon>
            <XIcon name="AreaChartOutlined" />
          </template>
          查看指标历史
        </n-button>
      </RouterLink>
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
    font-weight: bold;
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
