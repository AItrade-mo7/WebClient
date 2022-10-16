import { ajax_json } from '@/utils/http';

export const GetCoinAILIst = () => {
  return ajax_json({
    url: '/api/private/coinAI/List',
    data: null,
    method: 'post',
  });
};

interface RemoveCoinAIType {
  ServeID: string;
}

export const RemoveCoinAI = (data: RemoveCoinAIType) => {
  return ajax_json({
    url: '/api/private/coinAI/Remove',
    data,
    method: 'post',
  });
};
