import axios from 'axios';
import { res_dispose } from './res_dispose';
import { getToken, Encrypt } from './tools';
import { LoadingStore } from '@/store';

const service = axios.create();

(() => {
  // 需要初始化
  console.log('11111', window.ViteConst);
  let axios_baseURL = null;
  if (window.ViteConst.RunMod == 0) {
    axios_baseURL = '//trade-api.mo7.cc';
  }

  service.defaults.baseURL = axios_baseURL; // 默认请求的 baseUrl
  service.defaults.timeout = 20000; // 超时 20 秒
  // 请求拦截
  service.interceptors.request.use(
    (config) => {
      LoadingStore.open(`正在请求: ${config.url}`);
      return config;
    },
    (error) => {
      LoadingStore.close();
      // window.$message.error(error.response.status);
      return Promise.reject(error);
    },
  );

  // 响应拦截
  service.interceptors.response.use(
    (response: any) => {
      LoadingStore.close();
      return res_dispose(response);
    },
    (error) => {
      LoadingStore.close();
      // window.$message.error(error.response.status);
      return Promise.reject(error);
    },
  );
})();

import type { axiosParam, resDataType } from './utils.d';
const ajax_json = (param: axiosParam): Promise<resDataType> => {
  const config: axiosParam = {
    headers: {
      Token: getToken(),
      'Auth-Encrypt': Encrypt(param.url + window.navigator.userAgent),
    },
    ...param,
  };

  if (param?.data?.CoinServeID) {
    config.headers['Coin-Serve-ID'] = param.data.CoinServeID;
  }

  // 请求参数转换
  if (config.method === 'get' || !config.method) {
    config.params = config.data;
    delete config.data;
  }

  return service(config) as any;
};

export { ajax_json, axios };
