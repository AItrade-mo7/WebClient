import '@/assets/js/AITrade.net';
import 'normalize.css';
import '@/assets/css/global.less';

console.log('222222222', window.ViteConst);

if (ViteConst) {
  window.ViteConst = {
    ...ViteConst,
    rmAgin: 'mo777',
  };
}
console.log('333333', window.ViteConst);

import { registerSW } from 'virtual:pwa-register';
registerSW({
  onOfflineReady() {},
});

import { createApp } from 'vue';

import App from '@/lib/router/App.vue';
import { router } from '@/lib/router';

const app = createApp(App);

app.use(router);

app.mount('#VueApp');
