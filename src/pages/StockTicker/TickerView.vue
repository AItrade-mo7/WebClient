<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
</script>

<template>
  <PageTitle>StockTicker</PageTitle>
  <div class="PageWrapper">
    股票 市场分析 相关功能尚在规划当中。
    <br />
    您的打赏将是开发者的动力
    <img class="wx_proceeds" src="//file.mo7.cc/static/img/wx_proceeds.jpg" alt="" />
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
    <a target="_blank"> 程序架构设计稿(飞书被封文档丢失) </a>
    <br />
    <br />
    群二维码：
    <img class="feishu_code" src="//file.mo7.cc/disk/feishu_code.jpg" alt="" srcset="" />
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.wx_proceeds {
  width: 200px;
  display: block;
}
.lineHeight {
  color: @mainColor;
}

.feishu_code {
  max-width: 80%;
}
</style>
