import { ajax_json } from '@/utils/http';

export const Ping = (data?: any) => {
  return ajax_json({
    url: '/api/ping',
    data,
    method: 'post',
  });
};

export const GetSysEmailList = () => {
  return ajax_json({
    url: '/api/public/GetSysEmailList',
    data: '',
    method: 'post',
  });
};
