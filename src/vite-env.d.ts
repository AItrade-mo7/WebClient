/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

import type { MessageApiInjection, NotificationApiInjection, DialogApiInjection } from 'naive-ui';
import type { UrlMapType } from '@/config/constant';

declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}

declare global {
  declare const $ref: any;
  declare const ViteConst: any;

  interface Window {
    mo7Encrypt: (msg: string) => string;
    mo7AseEncrypt: (msg: string) => string;
    mo7Md5: (msg: string) => string;
    mo7SecretKey: string;
    deferredPrompt: any;
    $message: MessageApiInjection;
    $dialog: DialogApiInjection;
    $notification: NotificationApiInjection;
    ViteConst: {
      AppVersion: string;
      AppName: string;
      ProxyUrl: string;
      rmAgin: string;
      DevelopBaseUrl: {
        Main: string;
        Msg: string;
      };
    };
    $Event: {
      [string]: any;
    };
    $Const: {
      MainBaseUrlMap: UrlMapType;
      MsgBaseUrlMap: UrlMapType;
    };
  }
}

export {};
