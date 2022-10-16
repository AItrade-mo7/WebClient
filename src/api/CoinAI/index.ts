import { ajax_json } from '@/utils/http';

interface AITradeNetParam {
  CoinServeID: string;
}

export const GetCoinFundConfig = (data: AITradeNetParam): Promise<any> => {
  return ajax_json({
    url: '/CoinAI/config',
    data,
    method: 'get',
  });
};
