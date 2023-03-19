import axios from 'axios';
import { res_dispose } from './res_dispose';
import { getToken, Encrypt, Md5 } from './tools';
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
      return res_dispose(response) as any;
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
    },
    ...param,
  };

  // 处理 SatelliteServe
  if (param?.data?.SatelliteServe) {
    config.headers['Satellite-Serve'] = param.data.SatelliteServe;
  }

  // 请求参数转换
  if (config.method === 'get' || !config.method) {
    config.params = config.data;
    config.data = '';
  }

  // 添加加密验证
  let datastr = '';
  if (config.data) {
    datastr = JSON.stringify(config.data);
  }
  const headersAuth = Encrypt(param.url + window.navigator.userAgent + Md5(datastr));
  config.headers['Auth-Encrypt'] = headersAuth;

  // 处理请求地址
  if (config.BaseUrl?.length > 1) {
    config.url = config.BaseUrl + config.url;
    delete config.BaseUrl;
  }

  return service(config) as any;
};

export { ajax_json, axios, set_axios_config, service };
