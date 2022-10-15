import { ajax_json } from '@/utils/http';

export const GetCoinHistory = (data) => {
  return ajax_json({
    url: '/CoinMarket/public/GetCoinHistory',
    data,
    method: 'post',
  });
};
