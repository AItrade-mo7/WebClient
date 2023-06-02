import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';
import { ProduceBaseUrl, TestBaseUrl } from '@/config/constant';

registerSW({
  // 每小时检查一次
  onRegistered: (r) => r && setInterval(async () => await r.update(), 3600000),
  // 注册失败则报错到 console
  onRegisterError: (error) => console.error(error),
});

import App from '@/lib/router/App.vue';
import { router } from '@/lib/router';

import '@/assets/js/AItrade.net';
import 'normalize.css';
import '@/assets/css/global.scss';

// 初始化全局和 axios 配置
import { set_axios_config } from '@/utils/http';
if (ViteConst) {
  window.ViteConst = {
    ...ViteConst,
    Author: 'http://mo7.cc',
  };
  window.$Event = {};
  // 如果在正式环境下运行，则强制切换为 ProduceBaseUrl
  if (window.location.hostname == 'trade.mo7.cc') {
    window.ViteConst.BaseUrl = ProduceBaseUrl;
  }
  // 如果在测试环境下运行，则强制切换为 TestBaseUrl
  if (window.location.hostname == 'test-trade.mo7.cc') {
    window.ViteConst.BaseUrl = TestBaseUrl;
  }

  set_axios_config();
}

const app = createApp(App);

app.use(router);

app.mount('#VueApp');
