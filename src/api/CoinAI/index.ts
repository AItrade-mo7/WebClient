import { ajax_json } from '@/utils/http';
import { Md5 } from '@/utils/tools';

interface AITradeNetParam {
  CoinServeID: string;
}

export const GetCoinAIConfig = (data: AITradeNetParam): Promise<any> => {
  return ajax_json({
    url: '/CoinAI/config',
    data,
    method: 'get',
  });
};

interface SetKeyParam {
  CoinServeID: string;
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
  CoinServeID: string;
  ApiKey: string;
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
