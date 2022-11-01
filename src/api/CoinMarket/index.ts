import { ajax_json } from '@/utils/http';

export const GetNowTickerAnaly = () => {
  return ajax_json({
    url: '/CoinMarket/public/GetNowTickerAnaly',
    data: null,
    method: 'post',
  });
};

export interface CoinHistoryParam {
  InstID: string;
  TimeUnix: number[];
}

export const GetCoinHistory = (data: CoinHistoryParam) => {
  return ajax_json({
    url: '/CoinMarket/public/GetCoinHistory',
    data,
    method: 'post',
  });
};

export interface InstParam {
  InstType: 'SPOT' | 'SWAP';
}

export const GetInstList = (data: InstParam): Promise<any> => {
  return ajax_json({
    url: '/CoinMarket/public/Inst',
    data,
    method: 'post',
  });
};

export interface GetAnalyHistoryParam {
  TimeUnix: number[];
}

export const GetAnalyList = (data: GetAnalyHistoryParam): Promise<any> => {
  return ajax_json({
    url: '/CoinMarket/public/GetAnalyList',
    data: data,
    method: 'post',
  });
};

interface GetAnalyDetailParam {
  TimeID: string;
}

export const GetAnalyDetail = (data: GetAnalyDetailParam): Promise<any> => {
  return ajax_json({
    url: '/CoinMarket/public/GetAnalyDetail',
    data: data,
    method: 'post',
  });
};
