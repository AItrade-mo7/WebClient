import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import path from 'path';
import AppPackage from './package.json';
import legacy from '@vitejs/plugin-legacy';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// ========= PWA 配置  =========
const PwaConfig: Partial<VitePWAOptions> = {
  injectRegister: 'auto',
  registerType: 'autoUpdate',
  workbox: {
    sourcemap: true,
  },
  manifest: {
    name: 'AItrade',
    short_name: 'AItrade',
    theme_color: '#F0B90B',
    description: 'AItrade, 个人智能 AI 基金',
    lang: 'zh',
    icons: [
      {
        src: '//file.mo7.cc/AItrade/logo/app.svg', //inside the scope!
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

// ========= 处理 proxy.json 文件 =========
import ProxyFile from './proxy.js';
const ProxyConfig: any = ProxyFile;

// =========  https://vitejs.dev/config/  =========
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
  build: {
    target: 'chrome75',
  },
  define: {
    ViteConst: JSON.stringify({
      AppVersion: AppPackage.version,
      AppName: AppPackage.name,
      BaseUrl: ProxyConfig['/api'].target,
    }),
  },
  server: {
    host: true,
    port: 9000,
    strictPort: true, // 端口已被占用则会直接退出
    proxy: ProxyConfig,
  },
});
