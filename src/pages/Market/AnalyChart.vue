<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { EchartsRender } from './EchartsRender';
import { GetAnalyList } from '@/api/CoinMarket';

let HistoryList = $ref([]);
let Current = $ref(0);
let Total = $ref(0);
let Size = $ref(300);
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
    }
  });
};

onMounted(() => {
  GetHistoryList(1);
  EchartsRender();
});
</script>

<template>
  <div class="AnalyChart">
    <div id="EchartsCanvas">asda</div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.AnalyChart {
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
}

#EchartsCanvas {
  width: 100%;
  height: 100%;
}
</style>
