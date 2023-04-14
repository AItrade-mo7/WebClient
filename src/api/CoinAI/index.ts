import { ajax_json } from '@/utils/http';
import { Md5, AseEncrypt } from '@/utils/tools';

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
    ApiKey: AseEncrypt(data.ApiKey),
    SecretKey: AseEncrypt(data.SecretKey),
    Passphrase: AseEncrypt(data.Passphrase),
    Password: AseEncrypt(Md5(data.Password)),
  };

  return ajax_json({
    url: '/CoinAI/SetKey',
    data: param,
    method: 'post',
  });
};

interface HandleKeyParam {
  SatelliteServe: string;
  Name: string;
  Password: string;
}

export const HandleKey = (data: HandleKeyParam): Promise<any> => {
  const param = {
    ...data,
    Password: AseEncrypt(Md5(data.Password)),
  };

  return ajax_json({
    url: '/CoinAI/HandleKey',
    data: param,
    method: 'post',
  });
};

interface AccountDetailParam {
  SatelliteServe: string;
  Name: string;
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
  Name: string;
  Type: string;
  Password: string;
  Code: string;
}

export const Order = (data: OrderParam) => {
  const param = {
    ...data,
    Password: AseEncrypt(Md5(data.Password)),
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
  Describe: string;
  EmailCode: string;
  MaxApiKeyNum: number;
}

export const EditConfig = (data: EditConfigParam) => {
  const param = {
    ...data,
    Password: AseEncrypt(Md5(data.Password)),
    EmailCode: Md5(data.EmailCode),
  };

  return ajax_json({
    url: '/CoinAI/EditConfig',
    data: param,
    method: 'post',
  });
};

interface SetAccountConfigParam {
  SatelliteServe: string;
  Name: string;
  Password: string;
  Hunter: string;
  TradeLever: number;
}

export const SetAccountConfig = (data: SetAccountConfigParam) => {
  const param = {
    ...data,
    Password: AseEncrypt(Md5(data.Password)),
  };

  return ajax_json({
    url: '/CoinAI/SetAccountConfig',
    data: param,
    method: 'post',
  });
};
