import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

const PwaConfig: any = {
  injectRegister: 'script',
  registerType: 'autoUpdate',
  workbox: {
    sourcemap: true,
  },
  manifest: {
    name: 'AITrade',
    short_name: 'AITrade',
    theme_color: '#F0B90B',
    description: 'AITrade, 个人智能 AI 基金',
    lang: 'zh',
    icons: [
      {
        src: '//file.mo7.cc/AITrade/logo/app.svg', //inside the scope!
        sizes: '48x48 72x72 96x96 128x128 256x256', //see the size in the devtools, not in editor. I've set up size 1200x1200 in Illustrator, but Chrome says it's 150x150. Also, "sizes":"any" not work.
        type: 'image/svg+xml', //not image/svg which is still visible in web
        purpose: 'any', //not "maskable any" as you may see there in answers.
      },
    ],
    start_url: './?mode=pwa',
    display: 'standalone',
    background_color: '#333333',
  },
};

import AppPackage from './package.json';

// const ProxyUrl = 'https://file.mo7.cc';
const ProxyUrl = `http://127.0.0.1:8999`;
const CoinAIHost = '';

// https://vitejs.dev/config/
const pathSrc = path.resolve(__dirname, 'src');
export default defineConfig({
  resolve: {
    alias: {
      '@': pathSrc,
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: path.resolve(pathSrc, 'components.d.ts'),
    }),
    VitePWA(PwaConfig),
  ],
  define: {
    ViteConst: JSON.stringify({
      AppVersion: AppPackage.version,
      AppName: AppPackage.name,
      ProxyUrl,
    }),
  },
  server: {
    host: true,
    port: 9000,
    strictPort: true, // 端口已被占用则会直接退出
    proxy: {
      '/api': {
        target: ProxyUrl,
        changeOrigin: true, // 允许跨域
      },
      '/CoinAI': {
        target: ProxyUrl,
        changeOrigin: true, // 允许跨域
      },
      '/StockAI': {
        target: ProxyUrl,
        changeOrigin: true, // 允许跨域
      },
      '/CoinMarket': {
        // target: 'https://trade.mo7.cc',
        target: 'http://127.0.0.1:8998',
        changeOrigin: true, // 允许跨域
      },
      '/StockMarket': {
        target: 'https://trade.mo7.cc',
        // target: 'http://127.0.0.1:8997',
        changeOrigin: true, // 允许跨域
      },
    },
  },
});
