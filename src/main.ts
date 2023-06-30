import { createApp } from 'vue';
import { registerSW } from 'virtual:pwa-register';

registerSW({
  // 每小时检查一次
  onRegistered: (r) => r && setInterval(async () => await r.update(), 3600000),
  // 注册失败则报错到 console
  onRegisterError: (error) => console.error(error),
});

import App from '@/lib/router/App.vue';
import { router } from '@/lib/router';

import { MainBaseUrlMap, MsgBaseUrlMap } from '@/config/constant';

import '@/assets/js/AItrade.net';
import 'normalize.css';
import '@/assets/css/global.scss';

// 初始化全局和 axios 配置
import { set_axios_config } from '@/utils/http';
if (ViteConst) {
  window.ViteConst = {
    ...ViteConst,
    Author: 'https://mo7.cc',
  };
  window.$Event = {};
  window.$Const = {
    MainBaseUrlMap,
    MsgBaseUrlMap,
  };
  const { DevelopBaseUrl } = window.ViteConst;
  if (DevelopBaseUrl.Main) {
    window.$Const.MainBaseUrlMap.Develop = DevelopBaseUrl.Main;
  }
  if (DevelopBaseUrl.Msg) {
    window.$Const.MsgBaseUrlMap.Develop = DevelopBaseUrl.Msg;
  }

  set_axios_config();
}

const app = createApp(App);

app.use(router);

app.mount('#VueApp');
