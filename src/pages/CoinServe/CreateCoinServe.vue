<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { CopyText } from '@/utils/tools';
import { UserInfoStore } from '@/store';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
let Port = $ref('');

const GenerateShell = () => {
  var BaseUrl = window.ViteConst.BaseUrl;
  var Url = `http:${BaseUrl}/api/public/InstallCoinAI.sh?Port=${Port}&UserID=${UserInfoStore.value.UserID}`;
  var shPoint = `sudo wget -qO- "${Url}" | sudo bash`;
  return shPoint;
};

const copyFun = () => {
  if (Port) {
    CopyText(GenerateShell());
  } else {
    window.$message.warning('请输入正确的端口号');
  }
};

const MyCopyText = (text) => {
  CopyText(text);
};
</script>

<template>
  <PageTitle>CreateCoinAI</PageTitle>
  <div class="PageWrapper">
    <div class="title">第一步：填写端口号</div>
    <div class="content">
      <n-input class="cont_input" v-model:value="Port" type="text" placeholder="例如: 9895" />
      <span class="hint">建议选择非常用端口号,该端口号用于启动监听服务。</span>
    </div>
    <br />
    <div class="title">第二步：复制指令</div>
    <div class="content">
      <div class="ShellAbout__urlBox">
        <div class="codeView" v-if="Port">{{ GenerateShell() }}</div>
        <n-button size="tiny" type="primary" @click="copyFun"> 复制 </n-button>
      </div>
    </div>
    <br />
    <div class="title">第三步：执行指令</div>
    <div class="content">
      <div class="ShellAbout_desc">
        <span class="label">注：</span>务必在 <span class="lineHight">安全组</span> 中开放云主机的
        <span class="lineHight">{{ Port ? Port : 'x' }}</span>
        端口 ！
        <br />
        <br />
        <span class="label">位置要求：</span> 主机必须位于 <span class="lineHight">香港</span>、
        <span class="lineHight">日本</span>、<span class="lineHight">新加坡</span>，可使用
        <span class="lineHight">阿里云</span> 或者 <span class="lineHight">AWS</span> 的云服务器。
        <span class="hint"><span class="lineHight">墙内</span>无法通过交易所执行下单指令</span>
        <br />
        <br />
        <span class="label">硬件配置：</span> 推荐 <span class="lineHight"> 2</span> 核芯、
        <span class="lineHight">2GB</span> 内存、<span class="lineHight">20GB</span> 存储。
        <span class="hint">
          程序采用 Go 语言编写, 会实时爬取交易所数据，并执行超高频复杂计算, 运行峰值内存消耗为 50M~80M 。
        </span>
        <br />
        <br />
        <span class="label">系统要求：</span>
        <span class="lineHight">aarch64</span> 或 <span class="lineHight"> x86_64 </span> 架构的
        <span class="lineHight">Ubuntu 20.04</span> 及以上版本

        <br />
        <br />
        <span class="label">系统时区：</span> 请务必设置为 <span class="lineHight">中国时区</span>。
        <span class="hint">时区必须统一，否则会出现计算结果错误。 </span>
        <div class="code">
          Ubuntu 可直接执行指令更改时区：
          <span class="codeView">sudo timedatectl set-timezone Asia/Shanghai</span>
          <n-button size="tiny" type="primary" @click="MyCopyText(`sudo timedatectl set-timezone Asia/Shanghai`)">
            复制
          </n-button>
        </div>
        <div class="code">
          查看当前Linux 系统时间的指令：
          <span class="codeView">date '+%m-%d %H:%M'</span>
          <n-button size="tiny" type="primary" @click="MyCopyText(`date '+%m-%d %H:%M'`)"> 复制 </n-button>
        </div>
        <br />
        <span class="label">脚本执行：</span> 当以上工作就绪，最好使用 root 权限执行当前指令
        <br />
        <br />
        <span class="desc">
          <span class="label">注：</span> 同一台云主机可以采用不同端口部署不超过
          <span class="lineHight">3</span> 个服务。运行服务越多，对服务器硬件配置要求越高。可以多个账户共用一台云主机。
          <span class="hint">
            若此步骤过于专业，可求助您身边的
            <span class="lineHight">程序员</span>
            好友。本页面可刷新并无限次重新生成脚本。
          </span>
        </span>
        <br />
        <br />
        <div>
          当然，您也可以热爱学习：
          <a href="https://meichangliang.feishu.cn/docx/doxcnZgnULZK8l5t2safbcnTtcf" target="_blank">
            <n-button secondary type="success" class="linkHref"> 海外虚拟主机购买教程 </n-button>
          </a>
          <a href="https://meichangliang.feishu.cn/docx/doxcnszFe2G6ReLP4rcqzW4O4Be" target="_blank">
            <n-button secondary type="success" class="linkHref"> CoinAI 部署图文教程 </n-button>
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
      执行完上述步骤后，如果没有出现错误，您的邮箱将会收到一封提醒邮件。
      <br />
      <br />
      整个的步骤简单理解为：
      <br />
      填写端口号
      <span class="lineHight"> -> </span>
      复制系统生成的指令
      <span class="lineHight"> -> </span>
      SSH 登录海外 Linux 服务器粘贴并执行该指令。
      <br />
      <br />

      1. 服务运行正常，可以在服务列表中看到 绿色的 【进入】 按钮，否则将是红色的【删除】按钮 <br />
      2. 若正常收到了启动邮件，服务列表依然显示红色删除按钮，请检查云主机对应的端口是否开放 <br />
      3.
      同一台服务器的同一个端口重复部署，则会更新对应的服务，不同端口重复部署则会创建新的服务。重新部署，数据不会丢失。<br />
      <br />
      <br />
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
  margin-right: 12px;
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
.codeView {
  color: #999;
  font-size: 14px;
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
