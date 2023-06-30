import { mStorage } from '@/utils/tools';
export const Logo = '//file.mo7.cc/AItrade/logo/app.svg';
export const OkxLogo = '//file.mo7.cc/AItrade/logo/okx.png';
export const ZTSLogo = '//file.mo7.cc/AItrade/logo/zts.png';
export const OKXBaseUrl = 'https://www.cnouyi.expert';

export const OKXjoinCode = '11352015';
export const OKXjoin = `${OKXBaseUrl}/join/11352015`;

export interface UrlMapType {
  Develop: string;
  Test: string;
  Production: string;
}

export const MainBaseUrlMap: UrlMapType = {
  Develop: '',
  Test: '//test-trade-api.mo7.cc',
  Production: '//trade-api.mo7.cc',
};

export const MsgBaseUrlMap: UrlMapType = {
  Develop: '',
  Test: '//test-msg.mo7.cc',
  Production: '//msg.mo7.cc',
};

export const GetBaseUrl = () => {
  const ReturnObj = {
    MainUrl: MainBaseUrlMap['Production'],
    MsgUrl: MsgBaseUrlMap['Production'],
  };

  let MainBaseUrlType = mStorage.get('MainBaseUrlType');
  if (!MainBaseUrlType) {
    MainBaseUrlType = 'Production';
    mStorage.set('MainBaseUrlType', MainBaseUrlType);
  }
  const MainUrl = MainBaseUrlMap[MainBaseUrlType];
  if (MainUrl) {
    ReturnObj.MainUrl = MainUrl;
  }

  let MsgBaseUrlType = mStorage.get('MsgBaseUrlType');
  if (!MsgBaseUrlType) {
    MsgBaseUrlType = 'Production';
    mStorage.set('MsgBaseUrlType', MsgBaseUrlType);
  }
  const MsgUrl = MsgBaseUrlMap[MsgBaseUrlType];
  if (MsgUrl) {
    ReturnObj.MsgUrl = MsgUrl;
  }

  return ReturnObj;
};
