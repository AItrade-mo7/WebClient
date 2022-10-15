<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetAnalyList, GetCoinHistory } from '@/api/CoinMarket';
import { cloneDeep } from '@/utils/tools';
import { EchartsRender, MergeAnalyKdata } from './EchartsRender';
import { WholeDirFormat } from '@/utils/filters';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const ListPage = defineAsyncComponent(() => import('./TickerView.vue'));
const CoinRTS = defineAsyncComponent(() => import('@/lib/CoinRTS.vue'));

let CoinKdataList = $ref([]);
let HistoryList = $ref([]);
let AnalyKdataList = $ref([]);
let Current = $ref(0);
let Total = $ref(0);
let Size = $ref(300);
let IsChartView = $ref(false);
let CurrentCoin = $ref('BTC');
let OperationStatus = $ref(false);
let ShowCoinRTS = $ref(false);

const GetHistoryList = (page: number) => {
  Current = page;
  GetAnalyList({
    Size: Size,
    Current: Current - 1,
    Sort: {
      TimeUnix: -1,
    },
  }).then((res) => {
    console.log(res);

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
    AnalyKdataList = MergeAnalyKdata(cloneDeep(HistoryList), cloneDeep(CoinKdataList));

    if (IsChartView) {
      const myChart = EchartsRender(cloneDeep(AnalyKdataList));
      myChart.on('click', function (params: any) {
        CheckItemFunc(params.data.AKData.Analy.TimeID);
      });
    }

    OperationStatus = true;
  });
};

onMounted(() => {
  GetHistoryList(1);
});

// 详情展示

let DrawerStatus = $ref(false);
let DetailTimeID = $ref({});
const CheckItemFunc = (TimeId) => {
  DetailTimeID = TimeId;
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

const OperationSwitch = () => {
  OperationStatus = !OperationStatus;
};
</script>

<template>
  <PageTitle>
    72h系统测算结果
    <template #after>
      <n-button size="tiny" quaternary @click="OperationSwitch">
        <template #icon>
          <XIcon spin name="SettingOutlined" />
        </template>
      </n-button>
    </template>
  </PageTitle>
  <div class="AnalyHistory">
    <n-modal v-model:show="OperationStatus">
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
          <n-button @click="SwitchChart" type="warning" size="tiny" class="SwitchBtn">
            当前: {{ IsChartView ? '图表展示' : '数列展示' }}
          </n-button>
          <template v-if="IsChartView">
            <n-button
              v-if="CurrentCoin === 'ETH'"
              @click="SwitchCoin('BTC')"
              type="info"
              size="tiny"
              class="SwitchCoinBtn"
              :disabled="CurrentCoin === 'BTC'"
            >
              当前:ETH走势
            </n-button>
            <n-button
              v-if="CurrentCoin === 'BTC'"
              @click="SwitchCoin('ETH')"
              type="info"
              size="tiny"
              class="SwitchCoinBtn"
              :disabled="CurrentCoin === 'ETH'"
            >
              当前:BTC走势
            </n-button>
          </template>
        </div>
        <div v-if="ShowCoinRTS">
          <CoinRTS type="Earning"></CoinRTS>
        </div>

        <div class="EarnCountShowBtn">
          <n-button @click="ShowCoinRTS = !ShowCoinRTS" type="warning" strong secondary circle size="tiny">
            <template #icon>
              <XIcon v-if="ShowCoinRTS" name="ArrowUpOutlined" />
              <XIcon v-else name="ArrowDownOutlined" />
            </template>
          </n-button>
        </div>
      </div>
    </n-modal>

    <div v-if="!IsChartView">
      <template v-for="item in AnalyKdataList">
        <div class="DataBox" :class="WholeDirFormat(item.Analy.WholeDir).class">
          <n-space>
            <div class="time">{{ item.TimeDate }}</div>
            <div class="dirText">{{ WholeDirFormat(item.Analy.WholeDir).text }}</div>
            <div class="CoinUR" :class="CountUR(item.Analy.MaxUP_RosePer)">
              {{ item.Analy.MaxUP }} {{ item.Analy.MaxUP_RosePer }}%
            </div>

            <div class="CoinUR" :class="CountUR(item.Analy.MaxDown_RosePer)">
              {{ item.Analy.MaxDown }} {{ item.Analy.MaxDown_RosePer }}%
            </div>
          </n-space>
          <n-button class="CheckBtn" size="small" @click="CheckItemFunc(item.Analy.TimeID)">查看</n-button>
        </div>
      </template>
    </div>

    <div class="ChartWrapper" v-if="IsChartView">
      <div id="EchartsCanvas"></div>
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
        <ListPage v-if="DrawerStatus" :TimeID="DetailTimeID"></ListPage>
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
  margin-right: 8px;
  margin-left: 12px;
}

.OperationWrapper {
  position: absolute;
  max-width: 90vw;
  max-height: 80vh;
  right: 2vw;
  top: 2vh;
  z-index: 9;
  padding: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  overflow-y: scroll;

  .OperationWrapper_btnWrapper {
    margin-top: 14px;
  }
  .n-pagination {
    justify-content: center;
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
  width: 100vw;
  max-height: 100vw;
  height: 100vh;
}

.EarnCountShowBtn {
  float: right;
  height: 0px;
  position: relative;
  .n-button {
    position: absolute;
    right: 0;
    bottom: 0;
  }
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