<script setup lang="ts">
import { h, onMounted, onUnmounted } from 'vue';
import { GetNowTickerAnaly, GetAnalyDetail } from '@/api/CoinMarket';
import { defineAsyncComponent } from 'vue';
import { DateFormat } from '@/utils/filters';
import { WholeDirFormat } from '@/utils/filters';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const PriceView = defineAsyncComponent(() => import('./lib/PriceView.vue'));
const VolumeView = defineAsyncComponent(() => import('./lib/VolumeView.vue'));
const TickerAnalyWhole = defineAsyncComponent(() => import('./lib/TickerAnalyWhole.vue'));
const TickerAnalySingle = defineAsyncComponent(() => import('./lib/TickerAnalySingle.vue'));
const CoinRTS = defineAsyncComponent(() => import('@/lib/CoinRTS.vue'));

const props = defineProps({
  TimeID: String,
});

let CoinTickerList = $ref([]);
let AnalyWhole = $ref([]);
let AnalySingle = $ref({});
let Unit = $ref('');
let WholeDir = $ref(0);
let OperationStatus = $ref(false);

const GetCoinTickerList = async (TimeID?: string) => {
  let res: any = {};
  if (TimeID) {
    res = await GetAnalyDetail({
      TimeID: TimeID,
    });
  } else {
    res = await GetNowTickerAnaly();
  }

  if (res.Code > 0) {
    CoinTickerList = res.Data.TickerVol;
    AnalyWhole = res.Data.AnalyWhole;
    AnalySingle = res.Data.AnalySingle;
    Unit = res.Data.Unit;
    WholeDir = res.Data.WholeDir;
  }
};

let timer: any = null;
onMounted(() => {
  console.log(props.TimeID);

  if (props.TimeID) {
    GetCoinTickerList(props.TimeID);
    return;
  }

  GetCoinTickerList();

  clearInterval(timer);
  timer = setInterval(() => {
    GetCoinTickerList();
  }, 180000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const columns: any[] = [
  {
    type: 'expand',
    expandable: () => {
      return true;
    },
    renderExpand: (row) => {
      const Single = AnalySingle[row.InstID];
      return h(TickerAnalySingle, {
        Single,
      });
    },
  },
  {
    title: '#',
    width: 34,
    render: (_, index) => {
      return `${index + 1}`;
    },
  },
  {
    title: 'Coin',
    key: 'CcyName',
    width: 68,
    fixed: 'left',
    align: 'left',
  },
  {
    title: 'OKX',
    width: 86,
    className: 'OKX',
    align: 'right',
    render(row) {
      return h(VolumeView, {
        Data: row,
        Volume: row.OKXVol24H,
        Bourse: 'OKX',
      });
    },
  },
  {
    title: 'Binance',
    width: 86,
    className: 'Binance',
    align: 'right',
    render(row) {
      return h(VolumeView, {
        Data: row,
        Volume: row.BinanceVol24H,
        Bourse: 'Binance',
      });
    },
  },
  {
    title: 'Volume',
    width: 104,
    className: 'Volume',
    align: 'right',
    render(row) {
      return h(VolumeView, {
        Data: row,
        Volume: row.Volume,
        Bourse: 'Volume',
      });
    },
  },
  {
    title: '24h',
    width: 100,
    align: 'right',
    render(row) {
      return h(PriceView, {
        data: row,
      });
    },
  },
];

const RowClassName = (rowData) => {
  // if (AnalyWhole.MaxUP.InstID == rowData.InstID) {
  //   return 'MaxUP';
  // }
  // if (AnalyWhole.MaxDown.InstID == rowData.InstID) {
  //   return 'MaxDown';
  // }
};

let RowOpenKey = $ref([]);

const RowOpen = (keys) => {
  RowOpenKey = keys;
};

const RowKey = (rowData) => {
  return rowData.CcyName;
};

const OperationSwitch = () => {
  OperationStatus = !OperationStatus;
};
</script>

<template>
  <PageTitle v-if="!props.TimeID"> CoinTicker </PageTitle>
  <div class="ListWrapper">
    <div v-if="CoinTickerList.length" class="Describe">
      <n-space class="data-title">
        <div class="data-item">锚定货币: {{ Unit }} ;</div>
        <div class="RTSWrapper" @click="OperationSwitch">
          <span class="RTS">Coin-RTS</span>:
          <span class="value" :class="WholeDirFormat(WholeDir).class">
            {{ WholeDirFormat(WholeDir).text }}
          </span>
          <XIcon class="RTS-icon" name="QuestionCircleTwotone" />
          ;
        </div>
        <div class="data-item">测算时间: {{ DateFormat(CoinTickerList[0].Ts, true) }} ;</div>
        <RouterLink to="/CoinTicker/AnalyHistory" class="RouterLinkBtn" v-if="!props.TimeID">
          <n-button size="small" type="success" secondary> 查看测算历史 </n-button>
        </RouterLink>
        <RouterLink to="/CoinServe" class="RouterLinkBtn">
          <n-button type="warning">
            <template #icon>
              <XIcon name="ClusterOutlined" />
            </template>
            绑定账户开启程序化交易
          </n-button>
        </RouterLink>
      </n-space>
    </div>
    <div class="TableWrapper">
      <n-data-table
        :expanded-row-keys="RowOpenKey"
        :on-update:expanded-row-keys="RowOpen"
        :xx-row-class-name="RowClassName"
        :row-key="RowKey"
        size="small"
        striped
        bordered
        :columns="columns"
        :data="CoinTickerList"
      />
    </div>
    <div v-for="item in AnalyWhole">
      <TickerAnalyWhole :Analy="item" />
    </div>

    <n-modal v-model:show="OperationStatus">
      <div class="OperationWrapper">
        <CoinRTS type="Earning"></CoinRTS>
      </div>
    </n-modal>
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

.Describe {
  font-size: 16px;
  margin-top: 16px;
  margin-bottom: 12px;
}

.data-title {
  align-items: center;
}

.RTSWrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #f0b90b;
}

.RTS-icon {
  color: #000;
  margin-left: 4px;
}

.RouterLinkBtn {
  display: flex;
  align-items: center;
  height: 100%;
  .n-button {
    width: 100%;
  }
}

.TableWrapper {
  .OKX {
    color: #999;
  }
  .Binance {
    color: #f0b90b;
  }
  .Volume {
    color: #000;
  }
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
}
</style>

<style lang="less">
@import '@/config/constant.less';

.n-data-table-tbody .n-data-table-tr {
  &.MaxUP {
    td {
      border-top: 2px solid @greenColor;
      border-bottom: 2px solid @greenColor;
      &:first-child {
        border-left: 2px solid @greenColor;
      }
      &:last-child {
        border-right: 2px solid @greenColor;
      }
    }
  }
  &.MaxDown {
    td {
      border-top: 2px solid @redColor;
      border-bottom: 2px solid @redColor;
      &:first-child {
        border-left: 2px solid @redColor;
      }
      &:last-child {
        border-right: 2px solid @redColor;
      }
    }
  }
}
</style>
