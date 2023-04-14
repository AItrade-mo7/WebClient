import { ajax_json } from '@/utils/http';
import { Md5, AseEncrypt } from '@/utils/tools';

interface SysParam {
  Password: string;
  Code: string;
  SatelliteServe: string;
}

export const ReStart = (param: SysParam) => {
  const data = {
    ...param,
    Password: AseEncrypt(Md5(param.Password)),
    Code: Md5(param.Code),
  };

  return ajax_json({
    url: '/CoinAI/sys/restart',
    data,
    method: 'post',
    SatelliteServe: data.SatelliteServe,
  });
};

export const Remove = (param: SysParam): Promise<any> => {
  const data = {
    ...param,
    Password: AseEncrypt(Md5(param.Password)),
    Code: Md5(param.Code),
  };

  return ajax_json({
    url: '/CoinAI/sys/remove',
    data,
    method: 'post',
    SatelliteServe: data.SatelliteServe,
  });
};

export const TheOpen = (param: SysParam): Promise<any> => {
  const data = {
    ...param,
    Password: AseEncrypt(Md5(param.Password)),
    Code: Md5(param.Code),
  };

  return ajax_json({
    url: '/CoinAI/sys/TheOpen',
    data,
    method: 'post',
    SatelliteServe: data.SatelliteServe,
  });
};
