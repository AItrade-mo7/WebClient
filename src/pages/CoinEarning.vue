<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const CoinRTS = defineAsyncComponent(() => import('@/lib/CoinRTS.vue'));

let OperationStatus = $ref(false);
const OperationSwitch = () => {
  OperationStatus = !OperationStatus;
};
</script>

<template>
  <PageTitle>
    Coin-RTS 收益模拟器
    <template #after>
      <n-button size="tiny" quaternary @click="OperationSwitch">
        <template #icon>
          <XIcon spin name="SettingOutlined" />
        </template>
      </n-button>
    </template>
  </PageTitle>
  <div class="PageWrapper">
    <n-modal v-model:show="OperationStatus" :block-scroll="false">
      <div class="OperationWrapper">
        <CoinRTS type="Market"></CoinRTS>
      </div>
    </n-modal>
  </div>
</template>

<style lang="less" scoped>
.OperationWrapper {
  position: absolute;
  max-width: 90vw;
  max-height: 90vh;
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
