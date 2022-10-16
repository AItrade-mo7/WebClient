import { ajax_json } from '@/utils/http';

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
export const SetKey = (data: AITradeNetParam): Promise<any> => {
  return ajax_json({
    url: '/CoinAI/SetKey',
    data,
    method: 'post',
  });
};
