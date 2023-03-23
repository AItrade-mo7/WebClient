import { ajax_json } from '@/utils/http';

export const MsgPing = () => {
  return ajax_json({
    BaseUrl: '//msg.mo7.cc',
    url: '/ping',
    data: null,
    method: 'post',
  });
};
