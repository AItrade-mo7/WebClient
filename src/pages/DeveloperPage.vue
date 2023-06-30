<script setup lang="ts">
import { GetBaseUrl } from '@/config/constant';
import { defineAsyncComponent, onMounted } from 'vue';
import { mStorage } from '@/utils/tools';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let MainUrlOpt = $ref([]);
let MainUrlVal = $ref('');

let MsgUrlOpt = $ref([]);
let MsgUrlVal = $ref('');

const UpdateUrlData = () => {
  MainUrlVal = mStorage.get('MainBaseUrlType');
  MsgUrlVal = mStorage.get('MsgBaseUrlType');

  const OptMap = window.$Const;

  MainUrlOpt = [];

  for (const key in OptMap.MainBaseUrlMap) {
    const val = OptMap.MainBaseUrlMap[key];
    MainUrlOpt.push({
      label: `${key} - ${val}`,
      value: key,
    });
  }

  MsgUrlOpt = [];

  for (const key in OptMap.MsgBaseUrlMap) {
    const val = OptMap.MsgBaseUrlMap[key];
    MsgUrlOpt.push({
      label: `${key} - ${val}`,
      value: key,
    });
  }
};

const MainUrlChange = (val) => {
  mStorage.set('MainBaseUrlType', val);
  UpdateUrlData();
};

const MsgUrlChange = (val) => {
  mStorage.set('MsgBaseUrlType', val);
  UpdateUrlData();
};

const ResetFunc = () => {
  mStorage.clearAll();

  UpdateUrlData();
};

onMounted(() => {
  UpdateUrlData();
});
</script>

<template>
  <PageTitle>开发者选项 Developer</PageTitle>
  <div class="PageWrapper ApiKey">
    {{ GetBaseUrl() }}

    <h2>选择 MainUrl</h2>
    <n-select v-model:value="MainUrlVal" :options="MainUrlOpt" @update:value="MainUrlChange" />

    <h2>选择 MsgUrl</h2>
    <n-select v-model:value="MsgUrlVal" :options="MsgUrlOpt" @update:value="MsgUrlChange" />

    <h2>重置</h2>
    <n-button type="primary" @click="ResetFunc"> 重置所有未默认 </n-button>
  </div>
</template>

<style lang="scss" scoped></style>
