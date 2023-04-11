<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>StockTicker</PageTitle>
  <div class="PageWrapper">
    股票 市场分析 相关功能尚在规划当中。
    <br />
    <br />
    <a class="lineHeight" href="https://github.com/mo7cc" target="_blank">开发者的 Github 主页</a>
    <br />
    <br />
    <a class="lineHeight" href="https://mo7.cc/" target="_blank">开发者 个人 主页</a>
    <br />
    <br />
    <a class="lineHeight" href="https://github.com/AItrade-mo7" target="_blank"> 项目仓库地址(目前为非开源) </a>
    <br />
    <br />
    <a target="_blank"> 程序架构设计稿(之前的文档被飞书没收了) </a>
    <br />
    <br />
    群二维码：
    <br />
    <img class="feishu_code" src="//file.mo7.cc/disk/feishu_code.jpg" alt="" srcset="" />
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.wx_proceeds {
  width: 200px;
  display: block;
}
.lineHeight {
  color: $mainColor;
}

.feishu_code {
  max-width: 100%;
}
</style>
