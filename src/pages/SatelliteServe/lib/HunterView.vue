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
  <div>
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
        当前持仓 <span class="hint">(如果选择了该策略，您的OKX账户持仓应与当前虚拟持仓保持一致)</span>
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

    虚拟持仓为系统内部的一个虚拟账户的计算仓位。所有策略均为并行计算，互不影响。BTC更稳健，ETH收益率更高(当然，亏起来也一样)。
    <br />
    您的账户托管逻辑为： <br />
    若当前虚拟持仓与算法计算结果不一致，则触发一次虚拟下单，改变当前的虚拟持仓跟算法结果一致并累加收益和扣除手续费，然后做一次持久化存储。<br />
    虚拟持仓被改变后会触发一次账户同步任务，程序会遍历当前的 OKX
    ApiKey，执行【清仓】，【开多】，【开空】等步骤。使您的账户跟虚拟持仓保持一致。<br />
    若您的账户持仓原本就与 虚拟账户 一致 ， 则系统不会对您的账户做出任何操作。<br />
    因此，在K线运行的两个开仓点位之间，您可以手动执行任何操作，到达算法计算点位时，会帮你平仓。<br />
    若您选择停止策略，则系统在同步持仓时会无视您的账户。
    <br />
    注：虚拟持仓的计算方式已经跟交易所尽量保持一致。
    <br />
    系统的拓展性极高，目前只对接了 okx
    交易所的下单接口。如有其他交易所的对接需求，可以私信开发者。（若对系统有任何改进建议也欢迎私信） <br />
    同一个卫星服务，设置了上限30个账户。每一台卫星服务均设置了计算节点的随机延迟，因此多个卫星服务的账户交易是随机错开的。
    <br />
    计算的节点和频率是平均分布在一小时的任意分钟数内。每小时计算12次。因此下单时间点会根据市场在任意时刻发生。
    <br />
    每次计算会同时计算当前最新交易所最近900条数据(24天左右)进行预热和错检，然后取当前最新数据结果。所有的计算全部基于内存。
    CoinAI 是一个 CPU 密集型的多线程任务。
    <br />
    算法是稳定不变的。但是策略和参数，大概每2个月会基于最新市场数据优化一次。
    <br />
    开发者鼓励每一个有条件的人进行卫星服务的私人部署，也鼓励你公开你的服务供大家使用。部署好的卫星服务可以一键升级,随时保持策略和代码的最新。
    <RouterLink to="/SatelliteServe/CreateCoinServe" class="addBtn">
      <n-button type="primary" size="tiny"> 部署私人卫星服务 </n-button>
    </RouterLink>
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
