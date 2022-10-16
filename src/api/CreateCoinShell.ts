import { ajax_json } from '@/utils/http';

interface CreateCoinShellParam {
  Port: string;
  UserID?: string;
}
export const CreateCoinShell = (data: CreateCoinShellParam) => {
  return ajax_json({
    url: '/api/private/CreateCoinShell',
    data,
    method: 'post',
  });
};
