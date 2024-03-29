import type { resDataType } from './utils.d';
import { logout } from '@/api/Account';

export const res_dispose = (response: any): resDataType => {
  const data = response.data;

  // 账号尚未注册
  if (data.Code == -7) {
    window.$message.warning(data.Msg);
    return data;
  }

  // Token 错误
  if (data.Code == -3) {
    window.$message.warning(`${data.Msg},请重新登陆`, {
      onAfterLeave() {
        logout();
      },
    });
    return data;
  }

  if (data.Code < 0) {
    window.$message.error(data.Msg);
    return data;
  }

  return data;
};
