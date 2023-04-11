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

export const DateFormat = (val: string | number, isSecond = false, isMill = false, isFullYear = false): string => {
  const time = new Date(Number(val));
  const dayJsVal = dayjs(time);
  const year = dayJsVal.year();
  const mon = TwoDigits(dayJsVal.month() + 1);
  const day = TwoDigits(dayJsVal.date());
  const h = TwoDigits(dayJsVal.hour());
  const m = TwoDigits(dayJsVal.minute());
  const s = TwoDigits(dayJsVal.second());
  const mill = dayJsVal.millisecond();

  const nowTime = new Date();
  const nowDayJsVal = dayjs(nowTime);
  const nowYear = nowDayJsVal.year();

  let returnTime = '';

  if (nowYear - year == 0) {
    returnTime = `${mon}-${day}T${h}:${m}`;
    if (isFullYear) {
      returnTime = `${year}-${mon}-${day}T${h}:${m}`;
    }
  } else {
    returnTime = `${year}-${mon}-${day}T${h}:${m}`;
  }

  if (isSecond) {
    returnTime += `:${s}`;
  }

  if (isMill) {
    return `${returnTime} ${mill}`;
  } else {
    return `${returnTime}`;
  }
};

export const CountTimeDiff = (nowTime, AfterTime) => {
  const times = (nowTime - AfterTime) / 1000; // times是剩余时间总的秒数
  const d = parseInt(String(times / 60 / 60 / 24)); // 天
  const h = parseInt(String((times / 60 / 60) % 24)); //时
  const m = parseInt(String((times / 60) % 60)); // 分
  const s = parseInt(String(times % 60)); // 当前的秒
  return `${d}天${h}时${m}分${s}秒`;
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

export const WholeDirFormat = (n: any, isRatio = false) => {
  const ReturnObj = {
    text: '空',
    class: 'gray',
  };

  const Type = n - 0;

  switch (Type) {
    case 1:
      ReturnObj.text = '涨';
      ReturnObj.class = 'green';
      break;
    case -1:
      ReturnObj.text = '跌';
      ReturnObj.class = 'red';
      break;
    default:
      ReturnObj.text = '空';
      ReturnObj.class = 'gray';
      break;
  }

  if (isRatio) {
    if (Type < 0) {
      ReturnObj.class = 'red';
    }
    if (Type > 0) {
      ReturnObj.class = 'green';
    }
  }

  return ReturnObj;
};

export const Decimal = (num: string, Per = false) => {
  let returnNum = Number(num);
  if (Per) {
    returnNum = returnNum * 100;
  }
  return returnNum.toFixed(3);
};
