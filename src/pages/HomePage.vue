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
      基于<span class="fundText">大数据</span>和<span class="fundText">深度学习</span> , 打造属于您个人的交易服务。
    </div>

    <br />

    <br />
    <div class="HomeBtnItem">
      <RouterLink to="/CoinTicker">
        <n-button type="primary">
          <template #icon>
            <XIcon name="OkxLogo" />
          </template>
          数字货币 CoinTicker
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
      <RouterLink to="/StockTicker">
        <n-button type="primary" ghost color="#f00">
          <template #icon>
            <XIcon name="ZTSLogo" />
          </template>
          股票交易 StockTicker
        </n-button>
      </RouterLink>
    </div>
    <br />
    <div class="ServeDesc">分布式计算，毫秒级别响应，完善的警报体系，一行命令独立部署。</div>
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

.ServeDesc {
  color: #666;
  font-size: 14px;
  margin-top: 6px;
}
</style>
