export interface LoginParam {
  Email: string;
  Password: string;
}

export interface AddCoinServerParam {
  OkxKeyID: string;
  Host: string;
  Port: string;
  Note: string;
  Password: string;
}

export interface DelCoinServerParam {
  SatelliteServe: string;
  Password: string;
}

export interface AddOkxKeyParam {
  ApiKey: string;
  SecretKey: string;
  Passphrase: string;
  IP: string;
  Name: string;
  Note: string;
  Password: string;
}

export interface DelOkxKeyParam {
  OkxKeyID: string;
  Password: string;
}

export interface RegisterParam {
  Email: string;
  Code: string;
}

export interface SendCodeParam {
  Email: string;
  Action: string;
  EntrapmentCode?: string;
}

export interface ChangePasswordParam {
  Email: string;
  Code: string;
  Password: string;
  AgainPassword: string;
}

export interface EditProfileParam {
  Avatar: string;
  NickName: string;
  EntrapmentCode: string;
  Password: string;
  EmailCode: string;
}

export interface GenshinCheckParam {
  Cookie: string;
}

export interface AddEmailParam {
  Email: string;
  EmailCode: string;
  Password: string;
}
