export default {
  '/api': {
    target: '//127.0.0.1:8999',
    // target: '//trade-api.mo7.cc',
    changeOrigin: true,
  },
  '/CoinMarket': {
    target: '//trade-api.mo7.cc',
    // target: '//127.0.0.1:8998',
    changeOrigin: true,
  },
  '/StockMarket': {
    target: '//trade-api.mo7.cc',
    // target: '//127.0.0.1:8997',
    changeOrigin: true,
  },
  '/CoinAI': {
    target: '//trade-api.mo7.cc',
    // target: '//127.0.0.1:9012',
    changeOrigin: true,
  },
  '/StockAI': {
    target: '//trade-api.mo7.cc',
    // target: '//127.0.0.1:xxxx',
    changeOrigin: true,
  },
};
