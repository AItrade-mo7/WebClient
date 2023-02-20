<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetAnalyList, GetCoinHistory } from '@/api/CoinMarket';
import { cloneDeep, mStorage } from '@/utils/tools';
import { EchartsRender, MergeAnalyKdata } from './EchartsRender';
import { WholeDirFormat, DateFormat } from '@/utils/filters';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const ListPage = defineAsyncComponent(() => import('./TickerView.vue'));
const CoinRTS = defineAsyncComponent(() => import('@/lib/CoinRTS.vue'));

let CoinKdataList = $ref([]);
let HistoryList = $ref([]);
let AnalyKdataList = $ref([]);
let IsChartView = $ref(true);
let CurrentCoin = $ref('BTC');
let ShowCoinRTS = $ref(false);
let SetViewShow = $ref(false);
let ScreenDir = $ref('');

let TimeRange = $ref([0, 0]);

function TimeRangeChange(val) {
  TimeRange = cloneDeep(val);
  GetHistoryList();
}

const GetHistoryList = () => {
  GetAnalyList({
    TimeUnix: TimeRange,
  }).then((res) => {
    if (res.Code > 0) {
      HistoryList = res.Data.List;
      SwitchCoin(CurrentCoin);
    }
  });
};

const SwitchCoin = (Coin) => {
  CurrentCoin = Coin;

  GetCoinHistory({
    TimeUnix: TimeRange,
    InstID: CurrentCoin,
  }).then((res) => {
    CoinKdataList = res.Data.List;
    AnalyKdataList = MergeAnalyKdata(cloneDeep(HistoryList), cloneDeep(CoinKdataList));

    if (IsChartView) {
      const myChart = EchartsRender(cloneDeep(AnalyKdataList));
      myChart.on('click', (params: any) => {
        const itemData = params.data;
        const index = itemData[0];
        const AKListIndex = AnalyKdataList.length - (index + 1);
        const AKData = AnalyKdataList[AKListIndex];
        CheckItemFunc(AKData.Analy.TimeID);
      });
    }
  });
};

onMounted(() => {
  var timeEnd = Date.now();
  var timeStart = timeEnd - 3600 * 1000 * 72;

  TimeRange = [timeStart, timeEnd];

  GetHistoryList();
  var localScreen = mStorage.get('ScreenDir');
  if (localScreen == 'mobile') {
    ScreenDir = 'mobile';
  } else {
    ScreenDir = 'pc';
  }
});

const SwitchScreen = () => {
  if (ScreenDir == 'mobile') {
    ScreenDir = 'pc';
  } else {
    ScreenDir = 'mobile';
  }
  mStorage.set('ScreenDir', ScreenDir);
  window.location.reload();
};

// 详情展示

let DrawerStatus = $ref(false);
let DetailTimeID = $ref({});
const CheckItemFunc = (TimeId) => {
  DetailTimeID = TimeId;
  if (TimeId) {
    showDrawer();
  }
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
  GetHistoryList();
};
</script>
<template>
  <PageTitle> 系统测算历史 </PageTitle>
  <div class="AnalyHistory">
    <n-button
      type="warning"
      class="SetBtnShow"
      @click="
        SetViewShow = !SetViewShow;
        ShowCoinRTS = false;
      "
    >
      <template #icon>
        <XIcon v-if="SetViewShow" name="EyeOutlined" />
        <XIcon v-if="!SetViewShow" name="EyeInvisibleTwotone" />
      </template>
    </n-button>
    <div class="OperationWrapper" v-if="SetViewShow" :class="ScreenDir">
      <n-date-picker v-model:value="TimeRange" type="daterange" clearable :on-confirm="TimeRangeChange" />

      <div class="OperationWrapper_btnWrapper">
        <n-button @click="SwitchChart" type="warning" size="small">
          当前: {{ IsChartView ? '图表展示' : '数列展示' }}
        </n-button>
        <template v-if="IsChartView">
          <n-button
            v-if="CurrentCoin === 'ETH'"
            @click="SwitchCoin('BTC')"
            type="info"
            size="small"
            :disabled="CurrentCoin === 'BTC'"
          >
            当前:ETH走势
          </n-button>
          <n-button
            v-if="CurrentCoin === 'BTC'"
            @click="SwitchCoin('ETH')"
            type="info"
            size="small"
            :disabled="CurrentCoin === 'ETH'"
          >
            当前:BTC走势
          </n-button>
        </template>
        <n-button @click="SwitchScreen" type="warning" size="small">
          当前:{{ ScreenDir == 'mobile' ? '横屏' : '竖屏' }}
        </n-button>

        <n-button @click="ShowCoinRTS = !ShowCoinRTS" type="warning" strong secondary circle size="tiny">
          <template #icon>
            <XIcon v-if="ShowCoinRTS" name="ArrowUpOutlined" />
            <XIcon v-else name="ArrowDownOutlined" />
          </template>
        </n-button>
      </div>

      <div v-if="ShowCoinRTS">
        <CoinRTS type="Earning"></CoinRTS>
      </div>
    </div>

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
      <div id="EchartsCanvas" :class="ScreenDir"></div>
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

.SetBtnShow {
  position: absolute;
  z-index: 1001;
  right: 50px;
  top: 50px;
}
.OperationWrapper {
  text-align: left;
}

.SetBtn,
.SetBtnShow {
  width: 30px;
  height: 30px;
  .n-icon-slot {
    .XIcon {
      font-size: 20px;
    }
  }
}

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

.SwitchScreen {
  margin-left: 12px;
}

.OperationWrapper {
  position: absolute;
  max-width: 90vw;
  max-height: 80vh;
  right: 46px;
  top: 46px;
  z-index: 9;
  padding: 10px;
  border-radius: 6px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  overflow-y: scroll;

  .OperationWrapper_btnWrapper {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 14px;
    justify-content: space-between;
    .n-button {
      margin: 8px;
    }
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
  overflow: hidden;
}
#EchartsCanvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  max-height: 80vw;
  max-width: 100vw;
  &.mobile {
    width: 100vh;
    height: 100vw;
    max-height: 100vw;
    max-width: 100vh;
    left: 100vw;
    top: 0;
    transform-origin: 0 0 0;
    transform: rotate(90deg);
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
