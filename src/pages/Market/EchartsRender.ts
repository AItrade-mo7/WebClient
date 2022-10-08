import * as echarts from 'echarts';
import { ChartFormatDate } from '@/utils/filters';

const downColor = '#ec0000';
const downBorderColor = '#8A0000';

const upColor = '#00da3c';
const upBorderColor = '#008F28';

function SplitData(KdataList, AnalyList) {
  const categoryData = []; // 只要日期
  const values = []; // 只要 o c l h
  const pointData = [];
  /* 
    pointData
    {
      coord: ['10-07 06:45', 20000],
      value: 2300,
      itemStyle: {
        color: 'rgb(41,60,85)',
      },
    },
  */

  for (let i = KdataList.length - 1; i >= 0; i--) {
    const KdataEl = KdataList[i];
    const KdataTime = ChartFormatDate(KdataEl.TimeUnix);
    const KdataVal = [];
    KdataVal.push(KdataEl.O - 0);
    KdataVal.push(KdataEl.C - 0);
    KdataVal.push(KdataEl.L - 0);
    KdataVal.push(KdataEl.H - 0);

    values.push(KdataVal);
    categoryData.push(KdataTime);

    for (var j = AnalyList.length - 1; j >= 0; j--) {
      const AnyEl = AnalyList[j];
      const AnyTime = ChartFormatDate(AnyEl.TimeUnix);
      if (AnyTime == KdataTime) {
        const point = CreatePointData(AnyEl, KdataEl);
        pointData.push(point);
      }
    }
  }

  return {
    categoryData: categoryData,
    values: values,
    pointData,
  };
}

function CreatePointData(Analy, Kdata) {
  const AnyTime = ChartFormatDate(Analy.TimeUnix);
  let text = '';
  let color = '';
  let yAxis = Kdata.C;
  let textOffset = 0;
  switch (Analy.WholeDir) {
    case 1:
      text = '涨';
      color = '#1D8348';
      yAxis = Kdata.L;
      textOffset = 10;
      break;
    case 2:
      text = '震';
      color = '#82E0AA';
      yAxis = Kdata.L;
      textOffset = 10;
      break;
    case -1:
      text = '跌';
      color = '#E74C3C';
      yAxis = Kdata.H;
      break;
    case -2:
      text = '震';
      color = '#F1948A';
      yAxis = Kdata.H;
      break;
    default:
      text = '空';
      color = '#808B96';
      yAxis = Kdata.C;
      break;
  }
  return {
    coord: [AnyTime, yAxis],
    value: text,
    WholeDir: Analy.WholeDir,
    label: {
      show: true,
      color: '#fff',
      offset: [0, textOffset],
    },
    itemStyle: {
      color: color,
      opacity: 1,
      borderType: 'solid',
      borderColor: '#000',
      borderWidth: 1,
    },
  };
}

export const EchartsRender = (AnalyList, KdataList) => {
  const data0 = SplitData(KdataList, AnalyList);

  const myChart = echarts.init(document.getElementById('EchartsCanvas'));
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    grid: {
      top: '40',
      left: '50',
      right: '50',
      bottom: '30',
    },
    xAxis: {
      type: 'category',
      data: data0.categoryData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: true },
      min: 'dataMin',
      max: 'dataMax',
    },
    yAxis: {
      scale: true,
      splitArea: {
        show: true,
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 30,
        end: 100,
      },
      {
        show: true,
        type: 'slider',
        bottom: '15',
        start: 90,
        end: 100,
      },
    ],

    series: [
      {
        name: 'K线',
        type: 'candlestick',
        data: data0.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        markPoint: {
          symbol: 'pin',
          symbolRotate(value, params) {
            if (params.data.WholeDir > 0) {
              return 180;
            } else {
              return 0;
            }
          },
          symbolSize: 40,
          data: data0.pointData,
        },
      },
    ],
  };

  option && myChart.setOption(option);
};
