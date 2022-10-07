import * as echarts from 'echarts';
import { ChartFormatDate } from '@/utils/filters';

const data0 = splitData([
  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
  ['2013/1/25', 2300, 2291.3, 2288.26, 2308.38],
]);
// [时间 o c l h ]

const upColor = '#ec0000';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';

function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values,
  };
}

function FormateKdata(list) {
  for (let i = list.length - 1; i >= 0; i--) {
    const el = list[i];
    const Time = ChartFormatDate(el.TimeUnix);
    console.log(Time);
  }
}

export const EchartsRender = (AnalyList, KdataList) => {
  FormateKdata(KdataList);

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
      },
    ],
  };

  option && myChart.setOption(option);
};
