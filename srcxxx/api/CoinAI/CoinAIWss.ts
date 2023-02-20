import { getToken, Encrypt } from '@/utils/tools';

import type { resDataType } from '@/utils/utils.d';

interface ReturnType {
  Socket: WebSocket;
  Event: 'open' | 'message';
  Response: resDataType;
}

export type ResFunc = (res: ReturnType) => void;

interface WssType {
  Host?: string;
  MessageEvent: ResFunc;
  OpenEvent?: ResFunc;
}

export function NewSocket(opt: WssType) {
  let protocol = 'wss:';
  let host = window.ViteConst.BaseUrl;
  let pathname = '/api/wss';

  const location = window.location;

  if (location.protocol === 'http:') {
    protocol = 'ws:';
  }

  if (opt.Host) {
    pathname = `/CoinAI/wss?host=${opt.Host}`;
  }

  let socketUrl = protocol + host + pathname;

  // const socketUrl = 'ws://trade-api.mo7.cc/api/wss';
  // const socketUrl = 'ws://trade.mo7.cc/wss';
  // const socketUrl = 'ws://localhost:8999/wss';
  // const socketUrl = `ws://50.18.29.218:9210/CoinAI/wss?host=${opt.Host}`;
  // const socketUrl = `ws://trade-api.mo7.cc:9210/CoinAI/wss?host=${opt.Host}`;

  const Auth = {
    Token: getToken(),
    Encrypt: Encrypt(`/wss`),
  };

  const SocketObj = new WebSocket(socketUrl);

  // Connection opened
  SocketObj.addEventListener('open', (event) => {
    SocketObj.send(JSON.stringify(Auth));
    if (opt.OpenEvent) {
      opt.OpenEvent({
        Socket: SocketObj,
        Event: 'open',
        Response: {
          Code: 1,
          Data: event,
          Msg: 'open',
        },
      });
    }
  });

  // Listen for messages
  SocketObj.addEventListener('message', (event) => {
    let dataObj: resDataType = {
      Code: -1,
      Data: {},
      Msg: 'message',
    };

    try {
      const data = event.data;
      const dataJson = JSON.parse(data);
      dataObj = dataJson;
    } catch {
      dataObj = {
        Code: 1,
        Data: {},
        Msg: event.data,
      };
    }

    opt.MessageEvent({
      Socket: SocketObj,
      Event: 'message',
      Response: dataObj,
    });
  });

  return SocketObj;
}
