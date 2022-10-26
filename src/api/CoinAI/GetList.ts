import { ajax_json } from '@/utils/http';
import { Md5, removeToken } from '@/utils/tools';

export const GetCoinAILIst = () => {
  return ajax_json({
    url: '/api/private/coinAI/List',
    data: null,
    method: 'post',
  });
};

interface RemoveCoinAIType {
  ServeID: string;
  Password: string;
}

export const RemoveCoinAI = (data: RemoveCoinAIType) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/private/coinAI/Remove',
    data: param,
    method: 'post',
  });
};
