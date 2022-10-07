import dayjs from 'dayjs';

export const VolumeFormat = (val: string): string => {
  interface paramType {
    value: number | string;
    unit: string;
  }

  const value = parseInt(val, 10);

  const param: paramType = {
    value: 0,
    unit: '',
  };

  const k = 10000;
  const sizes = ['', '万', '亿', '万亿'];
  let i;

  if (value < k) {
    param.value = value;
    param.unit = '';
  } else {
    i = Math.floor(Math.log(value) / Math.log(k));
    param.value = (value / Math.pow(k, i)).toFixed(2);
    param.unit = sizes[i];
  }

  return param.value + param.unit;
};

export const TwoDigits = (val: string | number): string => {
  const num = Number(val) - 0;
  let returnVal = '';
  if (num < 10) {
    returnVal = `0${num}`;
  } else {
    returnVal = `${num}`;
  }

  return returnVal;
};

export const DateFormat = (val: string, isMill = false): string => {
  const time = new Date(Number(val));
  const dayJsVal = dayjs(time);
  const year = dayJsVal.year();
  const mon = TwoDigits(dayJsVal.month());
  const day = TwoDigits(dayJsVal.date());
  const h = TwoDigits(dayJsVal.hour());
  const m = TwoDigits(dayJsVal.minute());
  const s = TwoDigits(dayJsVal.second());
  const mill = dayJsVal.millisecond();
  if (isMill) {
    return `${year}-${mon}-${day} ${h}:${m}:${s} ${mill}`;
  } else {
    return `${year}-${mon}-${day} ${h}:${m}:${s}`;
  }
};

export const ChartFormatDate = (val: string): string => {
  const time = new Date(Number(val));
  const dayJsVal = dayjs(time);
  const year = dayJsVal.year();
  const mon = TwoDigits(dayJsVal.month());
  const day = TwoDigits(dayJsVal.date());
  const h = TwoDigits(dayJsVal.hour());
  const m = TwoDigits(dayJsVal.minute());
  const s = TwoDigits(dayJsVal.second());
  const mill = dayJsVal.millisecond();

  const nowTime = new Date();
  const nowDayJsVal = dayjs(nowTime);
  const nowYear = nowDayJsVal.year();
  if (nowYear - year == 0) {
    return `${mon}-${day} ${h}:${m}`;
  } else {
    return `${year}-${mon}-${day} ${h}:${m}`;
  }
};

export const ChartToStr = (val: string): string => {
  let txt = '';
  switch (val) {
    case 'Register':
      txt = `注册`;
      break;
    case 'Login':
      txt = `登录`;
      break;
    case 'EditPassword':
      txt = `修改密码`;
      break;
    default:
      break;
  }
  return txt;
};
