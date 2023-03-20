import { ajax_json } from '@/utils/http';
import { Md5 } from '@/utils/tools';

interface AItradeNetParam {
  SatelliteServe: string;
}

export const GetCoinAIConfig = (data: AItradeNetParam): Promise<any> => {
  return ajax_json({
    url: '/CoinAI/config',
    data,
    method: 'get',
  });
};

interface SetKeyParam {
  SatelliteServe: string;
  Name: string;
  ApiKey: string;
  SecretKey: string;
  Passphrase: string;
  Password: string;
}

export const SetKey = (data: SetKeyParam): Promise<any> => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/CoinAI/SetKey',
    data: param,
    method: 'post',
  });
};

interface HandleKeyParam {
  SatelliteServe: string;
  Index: number;
  Password: string;
}

export const HandleKey = (data: HandleKeyParam): Promise<any> => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/CoinAI/HandleKey',
    data: param,
    method: 'post',
  });
};

interface AccountDetailParam {
  SatelliteServe: string;
  Index: number;
}

export const GetAccountDetail = (data: AccountDetailParam): Promise<any> => {
  return ajax_json({
    url: '/CoinAI/GetAccountDetail',
    data,
    method: 'post',
  });
};

interface OrderParam {
  SatelliteServe: string;
  Index: number;
  Type: string;
  Password: string;
  Code: string;
}

export const Order = (data: OrderParam) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
    Code: Md5(data.Code),
  };

  return ajax_json({
    url: '/CoinAI/Order',
    data: param,
    method: 'post',
  });
};

interface EditConfigParam {
  SatelliteServe: string;
  Password: string;
  SysName: string;
}

export const EditConfig = (data: EditConfigParam) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/CoinAI/EditConfig',
    data: param,
    method: 'post',
  });
};
