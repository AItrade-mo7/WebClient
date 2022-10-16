import axios from 'axios';
import { res_dispose } from './res_dispose';
import { getToken, Encrypt } from './tools';
import { LoadingStore } from '@/store';

const service = axios.create();

function set_axios_config() {
  service.defaults.baseURL = window.ViteConst.BaseUrl; // 默认请求的 baseUrl
  service.defaults.timeout = 30000; // 超时 30 秒

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
}

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

export { ajax_json, axios, set_axios_config, service };
