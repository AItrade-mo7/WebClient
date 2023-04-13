<script setup lang="ts">
import { defineAsyncComponent, onMounted } from 'vue';
import { CopyText } from '@/utils/tools';
import { UserInfoStore } from '@/store';
import { RouterLink, useRoute } from 'vue-router';

const PageTitle = defineAsyncComponent(() => import('@/lib/PageTitle.vue'));
const XIcon = defineAsyncComponent(() => import('@/lib/XIcon.vue'));
let Port = $ref('');

const GenerateShell = () => {
  const BaseUrl = window.ViteConst.BaseUrl;
  const Url = `http:${BaseUrl}/api/public/InstallCoinAI.sh?Port=${Port}&UserID=${UserInfoStore.value.UserID}`;
  const shPoint = `sudo curl -o- "${Url}" | sudo bash`;
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

onMounted(() => {
  const route = useRoute();
  Port = route.query.port;
});
</script>

<template>
  <PageTitle>CreateCoinAI</PageTitle>
  <div class="PageWrapper">
    <div class="title">第一步：填写端口号</div>
    <div class="content">
      <n-input
        class="cont_input"
        :disabled="!UserInfoStore.value.UserID"
        v-model:value="Port"
        type="text"
        placeholder="例如: 9895"
      />

      <RouterLink to="/Login" v-if="!UserInfoStore.value.UserID">
        <n-button size="tiny" type="success"> 请先登录 </n-button>
      </RouterLink>

      <div class="hint">
        建议选择非常用端口号(例如: 9000-9999),该端口号用于启动 Web 服务用于通信。
        <br />
        同一个IP下的同一个端口号则会视为同一个卫星服务。如： 如果已存在
        <span class="lineHight">123.456.789.123:9012</span>服务，若填写 <span class="lineHight">9012</span> 并且在IP为
        <span class="lineHight">123.456.789.123</span>的服务器上重新执行部署，则会视为服务重启，数据不会丢失。
      </div>
    </div>
    <br />
    <div class="title">第二步：执行指令</div>
    <div class="content">
      <div class="ShellAbout_desc">
        <span class="label">注：</span>务必在 <span class="lineHight">安全组</span> 中开放云主机的
        <span class="lineHight">TCP: {{ Port ? Port : 'x' }}</span>
        端口 ！
        <div class="content">
          <div class="ShellAbout__urlBox">
            <div class="codeView" v-if="Port">{{ GenerateShell() }}</div>
            <n-button size="tiny" type="primary" @click="copyFun"> 复制 </n-button>
          </div>
        </div>
        <br />
        云主机要求:
        <br />
        <span class="label">位置要求：</span> 主机必须位于 <span class="lineHight">香港</span>、
        <span class="lineHight">日本</span>或<span class="lineHight">新加坡</span>，可使用
        <span class="lineHight">阿里云、腾讯云</span> 或者 <span class="lineHight">AWS</span> 的云服务器。
        <span class="hint"><span class="lineHight">墙内</span>无法通过交易所执行下单指令</span>
        <br />
        <br />
        <span class="label">最低硬件配置：</span> <span class="lineHight"> 2</span> 核芯、
        <span class="lineHight">2GB</span> 内存、<span class="lineHight">30GB</span> 存储。
        <span class="hint">
          程序采用 Go 语言编写, 会实时爬取交易所数据，并执行超高频复杂计算, 运行峰值内存消耗为 80M~200M 。
        </span>
        <br />
        <br />
        <span class="label">系统要求：</span>
        <span class="lineHight">aarch64</span> 或 <span class="lineHight"> x86_64 </span> 架构的
        <span class="lineHight"> Debian 11+ / Ubuntu 20+ </span> （其它 Linux 发行版尚未进行过测试）
        <RouterLink to="/About/SatelliteServe">
          <n-button size="tiny" type="primary"> 手动部署步骤 </n-button>
        </RouterLink>

        <br />
        <br />
        <span class="label">系统时区：</span> 请务必设置为 <span class="lineHight">中国时区</span>。
        <span class="hint">时区必须统一，否则会出现计算结果错误。 </span>
        <div class="code">
          Debian/Ubuntu 可直接执行指令更改时区：
          <span class="codeView">sudo timedatectl set-timezone Asia/Shanghai</span>
          <n-button size="tiny" type="primary" @click="MyCopyText(`sudo timedatectl set-timezone Asia/Shanghai`)">
            复制
          </n-button>
        </div>
        <div class="code">
          查看当前Linux 系统时间的指令：
          <span class="codeView">date '+%Y-%m-%d %H:%M'</span>
          <n-button size="tiny" type="primary" @click="MyCopyText(`date '+%Y-%m-%d %H:%M'`)"> 复制 </n-button>
        </div>
        <br />
        <span class="label">指令执行：</span> 当以上工作就绪，最好使用 root 权限执行当前指令。
        <br />
        <br />
        <span class="desc">
          <span class="label">注：</span> 建议同一台云主机可以采用不同端口部署不超过
          <span class="lineHight">3</span> 个服务。运行服务越多，对服务器硬件配置要求越高。可以多个账户共用一台云主机。
          <span class="hint">
            若此步骤过于专业，可求助您身边的
            <span class="lineHight">程序员</span>
            好友。本页面可刷新并无限次重新生成指令。
          </span>
        </span>
        <br />
        <br />
        <div>
          当然，您也可以热爱学习：
          <a href="https://zhuanlan.zhihu.com/p/360837901" target="_blank">
            <n-button secondary type="success" class="linkHref"> 海外云主机购买教程 </n-button>
          </a>
          <a href="/About/SatelliteServe" target="_blank">
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
    <div class="title">第五步：注意事项</div>
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
      登录海外 Linux 服务器粘贴并执行该指令。
      <br />
      <br />

      1. 服务运行正常，可以在服务列表中看到 绿色的 【进入】 按钮，否则将是红色的【删除】按钮 <br />
      2. 若正常收到了启动邮件，服务列表依然显示红色删除按钮，请检查云主机对应的<span class="lineHight">安全组</span>
      端口是否开放 <br />
      3.
      同一台服务器的同一个端口重复部署，则会视为更新并重启服务，不同端口重复部署则会创建新的服务。重新部署，数据不会丢失。<br />
      4. 建议使用具有弹性IP的独立云主机，且永远不要更换IP。<br />
      5. 服务的进程管理依赖于
      <a href="https://pm2.fenxianglu.cn" class="lineHight" target="_blank"> pm2 </a>您也可以手动安装 pm2
      加速脚本执行过程。
      <span class="hint">
        整个安装脚本其实只用到了 apt-get 和 curl 两个系统指令。本质上程序主体支持所有的 Linux x86_64 和 aarch64 发行版,
        但作者只测试过 Debian/Ubuntu 。 若对Linux比较了解, 也可以自行手动部署，或联系作者。
        <RouterLink to="/About/SatelliteServe">
          <n-button size="tiny" type="primary"> 手动部署步骤 </n-button>
        </RouterLink>
      </span>
      <br />
      6. 若是通过系统生成的指令安装的服务，可使用<span class="codeView"> pm2 ls </span> 指令 查看卫星服务的运行状态。<br />
      7. 若服务出现问题，可以手动执行程序安装目录下的 <span class="codeView"> ./Reboot.sh </span> 进行重启或更新。<br />

      <br />
      <RouterLink to="/SatelliteServe">
        <n-button type="warning" class="submitBtn">
          <template #icon>
            <XIcon name="ClusterOutlined" />
          </template>
          返回服务列表查看服务状态
        </n-button>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/config/constant.scss';
.title {
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 6px;
}

.lineHight {
  color: $mainColor;
}

.cont_input {
  width: 160px;
  margin-right: 12px;
}

.submitBtn {
  width: 260px;
}

.codeView {
  color: #999;
  font-size: 14px;
  background-color: #f6f8fa;
  padding: 3px 4px;
  border-radius: 6px;
  margin: 4px;
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

.Code {
  background-color: #f6f8fa;
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
    background-color: $mainColor;
  }
}
</style>
