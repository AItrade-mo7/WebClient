<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
</script>

<template>
  <PageTitle>
    CoinServe
    <template #after>
      <RouterLink to="/About/CoinServe" className="CoinServe__about">
        <n-button circle quaternary size="tiny" class="About__btn">
          <template #icon> <XIcon name="QuestionCircleOutlined" /> </template>
        </n-button>
      </RouterLink>
    </template>
  </PageTitle>
  <div class="PageWrapper">
    <div>ServerList</div>
    <div>
      <RouterLink to="/CoinServe/CreateCoinServe">
        <n-button type="primary">
          <template #icon>
            <XIcon name="OkxLogo" />
          </template>
          创建一个 CoinAI.net 服务
        </n-button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.CoinServe__about {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .n-button {
    color: @mainColor;
  }
}
</style>
