<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { CopyText } from '@/utils/tools';
const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
let Port = $ref('');

let wgetSh = `sudo wget -qO- asdaasdasdsdasdasasas | sudo bash`;

const copyFun = () => {
  CopyText(wgetSh);
};
</script>

<template>
  <PageTitle>CreateCoinServe</PageTitle>
  <div class="PageWrapper">
    <div class="title">第一步：填写端口号</div>
    <div class="content">
      <n-input class="cont_input" v-model:value="Port" type="text" placeholder="例如: 9895" />
    </div>
    <br />
    <div class="title">第二步：生成自助部署指令</div>
    <div class="content">
      <n-button class="submitBtn" type="primary"> 指令生成 </n-button>
    </div>
    <br />
    <div class="title">第三步：复制指令</div>
    <div class="content">
      <div class="ShellAbout__urlBox">
        <n-code :code="wgetSh" word-wrap> </n-code>
        <n-button size="tiny" type="primary" @click="copyFun"> 复制 </n-button>
      </div>
    </div>
    <br />
    <div class="title">第四步：执行指令</div>
    <div class="content">
      <div class="ShellAbout_desc">
        <span class="label">注：</span>务必在 <span class="lineHight">策略组</span> 中开放云主机的
        <span class="lineHight">{{ Port ? Port : 'xxxx' }}</span>
        端口 ！
        <br />
        <span class="label">位置要求：</span> 优先推荐 AWS <span class="lineHight">美国</span>、
        <span class="lineHight">日本</span> 或 <span class="lineHight">香港</span> 等地的 海外 主机。
        <span class="hint"><span class="lineHight">墙内</span>无法通过交易所执行下单指令</span>
        <br />
        <span class="label">硬件配置：</span> 最低 <span class="lineHight"> 1GB </span> 内存
        <span class="lineHight">20GB</span> 存储。
        <span class="desc"> 程序采用 Go 语言编写, 会定时执行超高频计算, 运行峰值内存消耗为 50M~80M 。</span>
        <br />
        <span class="label">系统要求：</span>
        <span class="lineHight">aarch64</span> 或 <span class="lineHight"> x86_64 </span> 架构的
        <span class="lineHight">Ubuntu 20.04</span> 及以上版本

        <br />
        <span class="label">系统时区：</span> 请务必设置为 <span class="lineHight">中国时区</span>。
        <span class="hint">时区必须统一，否则会出现计算结果错误</span>
        <br />
        <span class="label">脚本执行：</span> 当以上工作就绪，最好使用 root 权限执行当前脚本
        <br />
        <span class="desc">
          <span class="label">注：</span> 同一台云主机可以采用不同端口部署不超过
          <span class="lineHight">4</span> 个服务。运行服务越多，对服务器硬件配置要求越高。可以多个账户共用一台云主机。
          <span class="hint">
            若此步骤过于专业，可求助您身边的
            <span class="lineHight">程序员</span>
            好友。本页面可刷新并无限次重新生成脚本。
          </span>
        </span>
        <br />
        <div>
          当然，您也可以热爱学习：
          <a href="https://meichangliang.feishu.cn/docx/doxcnZgnULZK8l5t2safbcnTtcf" target="_blank">
            <n-button secondary type="success" class="linkHref"> AWS云服务器购买教程 </n-button>
          </a>
          <a href="https://meichangliang.feishu.cn/docx/doxcnszFe2G6ReLP4rcqzW4O4Be" target="_blank">
            <n-button secondary type="success" class="linkHref"> CoinAI 部署指南 </n-button>
          </a>
        </div>
        <div>
          或者联系开发者本人：
          <a href="mailto:mo7@mo7.cc" target="_blank">
            <n-button text type="warning" class="linkHref">e-mail: mo7@mo7.cc </n-button>
          </a>
        </div>
      </div>
    </div>
    <br />
    <div class="title">第五步：返回 CoinServe 列表并刷新</div>
    <div class="content">
      <RouterLink to="/CoinServe">
        <n-button type="warning" class="submitBtn">
          <template #icon>
            <XIcon name="ClusterOutlined" />
          </template>
          返回服务列表
        </n-button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/config/constant.less';
.title {
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 6px;
}

.cont_input {
  width: 160px;
}

.submitBtn {
  width: 160px;
}
.lineHight {
  color: @mainColor;
}

.ShellAbout_desc {
  font-size: 14px;
  line-height: 28px;
  color: #333;
}
.label {
  font-weight: bold;
  font-size: 16px;
}
.hint {
  font-size: 12px;
  color: #999;
}

.linkHref {
  margin-right: 20px;
}
.ShellAbout__urlBox {
  color: #24292f;
  background-color: #f6f8fa;
  margin: 16px 0;
  padding: 10px;
  position: relative;
  padding-bottom: 40px;
  .n-button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 10px;
    float: right;
    font-size: 12px;
  }
  .n-code {
    font-size: 12px;
    color: #999;
    background-color: @mainColor;
  }
}
</style>
