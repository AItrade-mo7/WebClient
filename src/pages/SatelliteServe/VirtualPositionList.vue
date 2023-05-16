<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetParamServeID } from '@/utils/tools';
import { useRoute } from 'vue-router';
import { DateFormat } from '@/utils/filters';
import { GetVirtualOrderList } from '@/api/CoinAI/index';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
let ServeID = $ref('');
let HunterName = $ref('');
let TableList = $ref([]);

const PageData = $ref({
  Size: 10,
  Current: 1,
  TotalNum: 0,
  Sort: { CreateTime: -1 },
  Query: {},
});

const GetTableList = () => {
  GetVirtualOrderList({
    SatelliteServe: ServeID,
    ...PageData,
    Current: PageData.Current - 1,
  }).then((res) => {
    if (res.Code > 0) {
      const Data = res.Data;
      PageData.Size = Data.Size;
      PageData.Current = Data.Current + 1;
      PageData.TotalNum = Math.ceil(Data.Total / Data.Size);
      TableList = Data.List;
    }
  });
};

onMounted(() => {
  ServeID = GetParamServeID();
  const route = useRoute();
  HunterName = route.query.HunterName;

  if (!ServeID || !HunterName) {
    window.$message.error('页面缺少参数!', {
      onAfterLeave() {
        window.location.replace('/SatelliteServe');
      },
    });
  }

  PageData.Query.HunterName = HunterName;
  PageData.Query.ServeID = ServeID;
  GetTableList();
});

const PageChange = (page) => {
  PageData.Current = page;
  GetTableList();
};
</script>

<template>
  <PageTitle>虚拟持仓历史</PageTitle>
  <div class="PageWrapper VirtualPositionList">
    <div class="tableView" v-for="(item, index) in TableList" :key="index">
      <n-space class="data-wrapper">
        <div class="block">
          <span class="label">策略名称</span>
          <span class="value"> {{ item.HunterName }} </span>
        </div>
        <div class="block">
          <span class="label">下单交易对</span>
          <span class="value"> {{ item.InstID }} </span>
        </div>
        <div class="block">
          <span class="label">下单时K线时间</span>
          <span class="value"> {{ item.NowTimeStr }} </span>
        </div>
        <div class="block">
          <span class="label">下单实际时间</span>
          <span class="value"> {{ DateFormat(item.NowTime) }} </span>
        </div>
        <div class="block">
          <span class="label">下单价格</span>
          <span class="value"> {{ item.NowC }} </span>
        </div>
        <div class="block">
          <span class="label">下单时参数</span>
          <span class="value"> {{ item.HunterConfig }} </span>
        </div>
        <div class="block">
          <span class="label">开仓价格</span>
          <span class="value"> {{ item.OpenAvgPx }} </span>
        </div>
        <div class="block">
          <span class="label">开仓K线时间</span>
          <span class="value"> {{ item.OpenTimeStr }} </span>
        </div>
        <div class="block">
          <span class="label">开仓实际时间</span>
          <span class="value"> {{ DateFormat(item.OpenTime) }} </span>
        </div>
        <div class="block">
          <span class="label">订单类型</span>
          <span class="value"> {{ item.Type }} </span>
        </div>
        <div class="block">
          <span class="label">持仓方向</span>
          <span class="value"> {{ item.NowDir }} </span>
        </div>
        <div class="block">
          <span class="label">订单创建时间</span>
          <span class="value"> {{ DateFormat(item.CreateTime) }} </span>
        </div>
        <div class="block">
          <span class="label">初始金钱</span>
          <span class="value"> {{ item.InitMoney }} </span>
        </div>
        <div class="block">
          <span class="label">账户余额</span>
          <span class="value"> {{ item.Money }} </span>
        </div>
        <div class="block">
          <span class="label">TimeID</span>
          <span class="value"> {{ item.TimeID }} </span>
        </div>
      </n-space>
      <hr />
    </div>

    <n-pagination
      v-model:page="PageData.Current"
      :page-size="PageData.Size"
      :page-count="PageData.TotalNum"
      @update:page="PageChange"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';

.tableView {
  margin-bottom: 20px;
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
