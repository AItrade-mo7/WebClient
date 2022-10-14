<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { TopBarStore } from '@/store';
import { Logo } from '@/config/constant';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle :Back="false">Home</PageTitle>
  <div class="PageWrapper">
    <img class="logo" :src="Logo" alt="" srcset="" />
    <div class="appName"><span class="aiText">AI</span><span class="fundText">Trade</span></div>
    <div>
      基于<span class="fundText">大数据</span>和<span class="fundText">深度学习</span> , 打造属于您个人的 AI 交易服务。
    </div>
    <br />

    <br />
    <div class="HomeBtnItem">
      <RouterLink to="/CoinServe">
        <n-button type="primary">
          <template #icon>
            <XIcon name="OkxLogo" />
          </template>
          数字货币 CoinAI
        </n-button>
      </RouterLink>
    </div>
    <br />
    <div class="HomeBtnItem">
      <RouterLink to="/Market">
        <n-button strong secondary type="error">
          <template #icon>
            <XIcon name="AreaChartOutlined" />
          </template>
          查看数字货币行情
        </n-button>
      </RouterLink>
    </div>
    <br />

    <div class="HomeBtnItem">
      <RouterLink to="/CoinEarning">
        <n-button type="primary">
          <template #icon>
            <XIcon name="DollarCircleTwotone" />
          </template>
          Coin-RTS 收益模拟器
        </n-button>
      </RouterLink>
    </div>
    <br />
    <div class="HomeBtnItem">
      <n-button type="info" @click="TopBarStore.open()">
        <template #icon>
          <XIcon name="MenuFoldOutlined" />
        </template>
        开始
      </n-button>
    </div>
    <br />
    <div class="HomeBtnItem">
      <RouterLink to="/StockServe">
        <n-button type="primary" ghost color="#f00">
          <template #icon>
            <XIcon name="StockOutlined" />
          </template>
          股票交易 StockAI
        </n-button>
      </RouterLink>
    </div>
    <br />
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';

.PageWrapper {
  text-align: center;
}

.logo {
  width: 30%;
  max-width: 240px;
}
.appName {
  font-size: 36px;
}
.aiText {
  color: @blueColor;
}

.fundText {
  color: @mainColor;
}

.HomeBtnItem {
  width: 200px;
  margin: 0 auto;
  & > a {
    display: block;
    width: 100%;
  }
  .n-button {
    width: 100%;
  }
}
</style>
