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

import '@/assets/js/AITrade.net';
import 'normalize.css';
import '@/assets/css/global.less';

// 初始化 axios 配置
import { set_axios_config } from '@/utils/http';
if (ViteConst) {
  window.ViteConst = {
    ...ViteConst,
    rmAgin: 'mo777',
  };

  window.$Event = {};

  set_axios_config();
}

const app = createApp(App);

app.use(router);

app.mount('#VueApp');
