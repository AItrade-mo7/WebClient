export default {
  '/api': {
    target: 'http://127.0.0.1:8999',
    // target: 'https://trade-api.mo7.cc',
    changeOrigin: true,
  },
  '/CoinMarket': {
    target: 'https://trade-api.mo7.cc',
    // target: 'http://127.0.0.1:8998',
    changeOrigin: true,
  },
  '/StockMarket': {
    target: 'https://trade-api.mo7.cc',
    // target: 'http://127.0.0.1:8997',
    changeOrigin: true,
  },
  '/CoinAI': {
    target: 'https://trade-api.mo7.cc',
    // target: 'http://127.0.0.1:9012',
    changeOrigin: true,
  },
  '/StockAI': {
    target: 'https://trade-api.mo7.cc',
    // target: 'http://127.0.0.1:xxxx',
    changeOrigin: true,
  },
};
