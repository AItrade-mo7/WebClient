<script setup lang="ts">
import { onMounted, defineAsyncComponent } from 'vue';
import { GetParamServeID } from '@/utils/tools';
import { useRoute } from 'vue-router';

import { GetVirtualOrderList } from '@/api/CoinAI/index';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
let ServeID = $ref('');
let HunterName = $ref('');

const PageData = $ref({
  Size: 10,
  Current: 0,
  Sort: { CreateTime: -1 },
  Query: {},
});

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

  GetVirtualOrderList({
    SatelliteServe: ServeID,
    ...PageData,
  }).then((res) => {
    console.log(res);
  });
});
</script>

<template>
  <PageTitle>虚拟持仓列表</PageTitle>
  <div class="PageWrapper VirtualPositionList">虚拟持仓列表 {{ ServeID }} {{ HunterName }}</div>
</template>

<style lang="scss" scoped></style>
