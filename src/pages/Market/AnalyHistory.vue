<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetAnalyList, GetCoinHistory } from '@/api/CoinMarket';
import { cloneDeep } from '@/utils/tools';
import { EchartsRender } from './EchartsRender';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const ListPage = defineAsyncComponent(() => import('./ListPage.vue'));

let CoinKdataList = $ref([]);
let HistoryList = $ref([]);
let Current = $ref(0);
let Total = $ref(0);
let Size = $ref(300);
let IsChartView = $ref(false);
IsChartView = true;
let CurrentCoin = $ref('BTC');

const GetHistoryList = (page: number) => {
  Current = page;
  GetAnalyList({
    Size: Size,
    Current: Current - 1,
    Sort: {
      TimeUnix: -1,
    },
  }).then((res) => {
    if (res.Code > 0) {
      HistoryList = res.Data.List;
      Total = res.Data.Total;
      Current = res.Data.Current + 1;
      Size = res.Data.Size;
      SwitchCoin(CurrentCoin);
    }
  });
};

const SwitchCoin = (Coin) => {
  CurrentCoin = Coin;
  GetCoinHistory({
    InstID: CurrentCoin,
    Size: Size,
    Current: Current - 1,
    Sort: {
      TimeUnix: -1,
    },
  }).then((res) => {
    CoinKdataList = res.Data.List;
    if (IsChartView) {
      EchartsRender(cloneDeep(HistoryList), cloneDeep(CoinKdataList));
    }
  });
};

onMounted(() => {
  GetHistoryList(1);
});

const WholeDirFormat = (n: any) => {
  var ReturnObj = {
    text: '空仓观望',
    class: 'gray',
  };

  var Type = n - 0;

  switch (Type) {
    case 1:
      ReturnObj.text = '看涨';
      ReturnObj.class = 'green';
      break;
    case 2:
      ReturnObj.text = '震荡上涨';
      ReturnObj.class = 'green';
      break;
    case -1:
      ReturnObj.text = '看跌';
      ReturnObj.class = 'red';
      break;
    case -2:
      ReturnObj.text = '震荡下跌';
      ReturnObj.class = 'red';
      break;
    default:
      ReturnObj.text = '空仓观望';
      ReturnObj.class = 'gray';
      break;
  }

  return ReturnObj;
};

// 详情展示

let DrawerStatus = $ref(false);
let AnalyInfo = $ref({});
const CheckItemFunc = (item) => {
  AnalyInfo = cloneDeep(item);
  showDrawer();
};

const closeDrawer = () => {
  DrawerStatus = false;
};
const showDrawer = () => {
  DrawerStatus = true;
};

const CountUR = (ur: any) => {
  if (ur - 0 > 0) {
    return 'green';
  }
  if (ur - 0 < 0) {
    return 'red';
  }
};

// 图标和列表切换

const SwitchChart = () => {
  IsChartView = !IsChartView;
  GetHistoryList(1);
};
</script>

<template>
  <PageTitle> 程序预测结果 </PageTitle>
  <div class="AnalyHistory">
    <div class="OperationWrapper">
      <n-pagination
        v-model:page="Current"
        size="small"
        :item-count="Total"
        :page-size="Size"
        :on-update:page="GetHistoryList"
        :page-slot="6"
      />
      <div class="OperationWrapper_btnWrapper">
        <n-button @click="SwitchChart" type="primary" size="tiny" class="SwitchBtn">
          查看{{ IsChartView ? '列表' : '折线图' }} {{ IsChartView }}
        </n-button>
        <n-button
          @click="SwitchCoin('BTC')"
          type="primary"
          size="tiny"
          class="SwitchCoinBtn"
          :disabled="CurrentCoin === 'BTC'"
        >
          BTC
        </n-button>
        <n-button
          @click="SwitchCoin('ETH')"
          type="primary"
          size="tiny"
          class="SwitchCoinBtn"
          :disabled="CurrentCoin === 'ETH'"
        >
          ETH
        </n-button>
      </div>
    </div>

    <div v-if="!IsChartView">
      <template v-for="(item, index) in HistoryList">
        <div class="DataBox" :class="WholeDirFormat(item.WholeDir).class">
          <n-space>
            <div class="time"><n-time :time="item.TimeUnix" /></div>
            <div class="dirText">{{ WholeDirFormat(item.WholeDir).text }}</div>
            <div class="CoinUR" :class="CountUR(item.MaxUP_RosePer)">{{ item.MaxUP }} {{ item.MaxUP_RosePer }}%</div>

            <div class="CoinUR" :class="CountUR(item.MaxDown_RosePer)">
              {{ item.MaxDown }} {{ item.MaxDown_RosePer }}%
            </div>
          </n-space>
          <n-button class="CheckBtn" size="small" @click="CheckItemFunc(item)">查看</n-button>
        </div>
      </template>
    </div>

    <div class="ChartWrapper" v-if="IsChartView">
      <div id="EchartsCanvas">
        <div style="text-align: center">图表加载中。。。。</div>
      </div>
    </div>

    <n-drawer
      display-directive="show"
      :auto-focus="false"
      height="80%"
      placement="top"
      :show="DrawerStatus"
      :on-mask-click="closeDrawer"
    >
      <n-drawer-content>
        <ListPage v-if="DrawerStatus" :AnalyInfo="AnalyInfo"></ListPage>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.DataBox {
  margin: 10px 0;
  border-width: 1;
  border-style: solid;
  padding: 2px 6px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .time {
    color: #000;
  }
  .dirText {
    width: 58px;
  }
  .CoinUR {
    width: 158px;
  }

  .CheckBtn {
    display: none;
    margin-left: 16px;
  }
  &:hover .CheckBtn {
    display: block;
  }
}

.SwitchBtn {
  margin-left: 8px;
}

.OperationWrapper {
  position: absolute;
  left: 10px;
  top: 46px;
  z-index: 9;
  padding: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  .OperationWrapper_btnWrapper {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 14px;
  }
}
.ChartWrapper {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
#EchartsCanvas {
  width: 100%;
  height: 100%;
}

.green {
  border-color: @greenColor;
  color: @greenColor;
}
.red {
  border-color: @redColor;
  color: @redColor;
}
</style>
