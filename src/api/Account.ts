import { ajax_json } from '@/utils/http';
import { Md5, removeToken } from '@/utils/tools';
import type {
  LoginParam,
  RegisterParam,
  SendCodeParam,
  ChangePasswordParam,
  EditProfileParam,
  GenshinCheckParam,
  AddEmailParam,
} from './api.d';

export const login = (data: LoginParam) => {
  const param = {
    ...data,
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/public/login',
    data: param,
    method: 'post',
  });
};

export const logout = () => {
  ajax_json({
    url: '/api/private/loginOut',
    data: null,
    method: 'post',
  }).then(() => {
    removeToken();
    window.location.replace('/Login');
  });
};

interface GetUserInfoParam {
  UserID: string;
}
export const getUserInfo = (data?: GetUserInfoParam) => {
  return ajax_json({
    url: '/api/private/get_user_info',
    data,
    method: 'get',
  });
};

export const Register = (data: RegisterParam) => {
  const param = {
    ...data,
    Code: Md5(data.Code),
  };

  return ajax_json({
    url: '/api/public/register',
    data: param,
    method: 'post',
  });
};

export const fetchSendCode = (data: SendCodeParam) => {
  return ajax_json({
    // BaseUrl: '//msg.mo7.cc',
    // url: '/api/await/SendEmailCode',
    url: '/api/public/send_code',
    data,
    method: 'post',
  });
};

export const ChangePassword = (data: ChangePasswordParam) => {
  const param = {
    ...data,
    Code: Md5(data.Code),
    Password: Md5(data.Password),
    AgainPassword: Md5(data.AgainPassword),
  };

  return ajax_json({
    url: '/api/public/change_password',
    data: param,
    method: 'post',
  });
};

export const EditProfile = (data: EditProfileParam) => {
  const param = {
    ...data,
    EmailCode: Md5(data.EmailCode),
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/private/edit_profile',
    data: param,
    method: 'post',
  });
};

export const GenshinCheck = (data: GenshinCheckParam) => {
  return ajax_json({
    url: '/api/private/genshin_check',
    data,
    method: 'post',
  });
};

export const GetGenshinCookie = () => {
  return ajax_json({
    url: '/api/private/get_genshin_cookie',
    data: null,
    method: 'post',
  });
};

// 新增邮箱

export const AddEmail = (data: AddEmailParam) => {
  const myData = {
    ...data,
    EmailCode: Md5(data.EmailCode),
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/private/AddEmail',
    data: myData,
    method: 'post',
  });
};

// 查询邮箱
export const GetEmailList = () => {
  return ajax_json({
    url: '/api/private/GetEmailList',
    data: null,
    method: 'post',
  });
};

// 设为主要
export const SetMainEmail = (data: AddEmailParam) => {
  const myData = {
    ...data,
    EmailCode: Md5(data.EmailCode),
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/private/SetMainEmail',
    data: myData,
    method: 'post',
  });
};

// 删除
export const DelEmail = (data: AddEmailParam) => {
  const myData = {
    ...data,
    EmailCode: Md5(data.EmailCode),
    Password: Md5(data.Password),
  };

  return ajax_json({
    url: '/api/private/DelEmail',
    data: myData,
    method: 'post',
  });
};

interface RemoveAccountParam {
  EmailCode: string;
  Password: string;
}

export const RemoveAccount = (data: RemoveAccountParam) => {
  const myData = {
    EmailCode: Md5(data.EmailCode),
    Password: Md5(data.Password),
  };
  return ajax_json({
    url: '/api/private/RemoveAccount',
    data: myData,
    method: 'post',
  });
};
