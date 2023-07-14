<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { TopBarStore } from '@/store';
import { Logo } from '@/config/constant';

const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));

let GoToDevelopPageCount = $ref(0);
let Timer: any = null;
const GoToDevelopPage = () => {
  GoToDevelopPageCount++;

  clearTimeout(Timer);
  Timer = setTimeout(() => {
    GoToDevelopPageCount = 0;
  }, 1000);

  if (GoToDevelopPageCount > 10) {
    alert('即将前往开发者选项');
    window.location.href = '/Developer';
  }
};
</script>

<template>
  <PageTitle :Back="false">
    <span class="Touch" @click="GoToDevelopPage"> Home </span>
    {{ GoToDevelopPageCount > 5 ? GoToDevelopPageCount : '' }}
  </PageTitle>
  <div class="PageWrapper">
    <img class="logo" :src="Logo" alt="" srcset="" />
    <div class="appName"><span class="aiText">AI</span><span class="fundText">trade</span></div>
    <div>
      基于<span class="fundText">大数据</span>和<span class="fundText">深度学习</span> , 打造属于您个人的交易服务。
    </div>

    <br />
    <div class="ServeDesc">分布式计算，毫秒级别响应，完善的警报体系，一行命令独立部署。</div>

    <br />

    <div class="NewOtterTrade">
      <a class="OtBtn" href="https://ottertrade.com" target="_blank">
        重磅更新 ！！ <br />
        <span class="red"> OtterTrade.com </span> 量化平台 <br />
        <span class="hint"> 即日起，当前 AItrade 平台将停止维护！</span>
        <br />
        更稳定的架构，更快的响应速度，更准确的市场判断，更简单的使用方式，更美观的用户界面！
        <br />
        <span class="hint red">点我进入新平台</span>
      </a>
    </div>

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

    <div class="HomeBtnItem">
      <a href="https://doc.mo7.cc" target="_blank">
        <n-button color="#999"> 使用说明【必读】 </n-button>
      </a>
    </div>

    <br />
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';

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
  color: $blueColor;
}

.fundText {
  color: $mainColor;
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

.Touch {
  user-select: none;
  cursor: pointer;
}

.NewOtterTrade {
}
.OtBtn {
  display: block;
  border-radius: 100px;
  border: 1px solid #000;
  width: 300px;
  margin: 0 auto;
  margin-bottom: 20px;
  cursor: pointer;
  .hint {
    font-weight: bolder;
  }
  padding: 20px;
  font-size: 16px;
  background-color: aliceblue;
  text-align: center;
}
</style>
