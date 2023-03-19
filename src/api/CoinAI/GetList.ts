import { ajax_json } from '@/utils/http';
import { Md5 } from '@/utils/tools';

export const GetCoinAILIst = () => {
  return ajax_json({
    url: '/api/private/coinAI/List',
    data: null,
    method: 'post',
  });
};

export const GetPublicCoinAILIst = () => {
  return ajax_json({
    url: '/api/private/coinAI/PublicList',
    data: null,
    method: 'post',
  });
};

interface RemoveCoinAIType {
  ServeID: string;
  Password: string;
  EmailCode: string;
}

export const RemoveCoinAI = (data: RemoveCoinAIType) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
    EmailCode: Md5(data.EmailCode),
  };

  return ajax_json({
    url: '/api/private/coinAI/Remove',
    data: param,
    method: 'post',
  });
};
