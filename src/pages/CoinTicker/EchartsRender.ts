import * as echarts from 'echarts';
import { DateFormat, WholeDirFormat } from '@/utils/filters';

const downColor = '#ec0000';
const downBorderColor = '#8A0000';

const upColor = '#00da3c';
const upBorderColor = '#008F28';

function SplitData(AKList) {
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

  for (let i = AKList.length - 1; i >= 0; i--) {
    const AKEl = AKList[i];
    const KdataTime = DateFormat(AKEl.TimeUnix);
    const KdataVal = [];
    KdataVal.push(AKEl.O - 0);
    KdataVal.push(AKEl.C - 0);
    KdataVal.push(AKEl.L - 0);
    KdataVal.push(AKEl.H - 0);

    values.push(KdataVal);
    categoryData.push(KdataTime);

    const point = CreatePointData(AKEl);
    pointData.push(point);
  }

  return {
    categoryData: categoryData,
    values: values,
    pointData,
  };
}

function CreatePointData(AKData) {
  const AnyTime = DateFormat(AKData.TimeUnix);
  let text = '';
  let color = '';
  let yAxis = AKData.C;
  let textOffset = 0;

  switch (AKData.Analy.WholeDir) {
    case 1:
      text = '涨';
      color = '#1D8348';
      yAxis = AKData.L;
      textOffset = 10;
      break;
    case -1:
      text = '跌';
      color = '#E74C3C';
      yAxis = AKData.H;
      break;
    default:
      text = '空';
      color = '#808B96';
      yAxis = AKData.C;
      break;
  }
  if (!AKData.Analy.WholeDir) {
    return {};
  }
  return {
    coord: [AnyTime, yAxis],
    value: text,
    WholeDir: AKData.Analy.WholeDir,
    AKData,
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

export const MergeAnalyKdata = (AnalyList, KdataList) => {
  const List = [];

  for (let i = 0; i < KdataList.length; i++) {
    const KdataEl = KdataList[i];
    const KdataTime = DateFormat(KdataEl.TimeUnix);
    const KdataObj = {
      ...KdataEl,
      TimeDate: KdataTime,
      Analy: {},
    };
    for (var j = AnalyList.length - 1; j >= 0; j--) {
      const AnyEl = AnalyList[j];
      const AnyTime = DateFormat(AnyEl.TimeUnix);
      if (AnyTime == KdataTime) {
        KdataObj.Analy = AnyEl;
      }
    }
    List.push(KdataObj);
  }

  return List;
};

export const EchartsRender = (AKList) => {
  const data0 = SplitData(AKList);

  const myChart = echarts.init(document.getElementById('EchartsCanvas'));
  const option = {
    tooltip: {
      trigger: 'axis',
      className: 'EchartsTooltip',
      axisPointer: {
        type: 'cross',
      },
      formatter(params) {
        const itemData = params[0];
        const index = itemData.data[0];
        const AKListIndex = AKList.length - (index + 1);
        const data = AKList[AKListIndex];

        return `<div class="AKItem ${WholeDirFormat(data.Dir).class}">
          <div class="warn">V=<span>${data.Analy.Version}</span></div>
          <div>开=<span>${data.O}</span></div>
          <div>高=<span>${data.H}</span></div>
          <div>低=<span>${data.L}</span></div>
          <div>收=<span>${data.C}</span></div>
          <div><span>(${data.RosePer}%)</span></div>
        </div>`;
      },
    },
    grid: {
      top: '40',
      left: '16',
      right: '16',
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

  return myChart;
};
