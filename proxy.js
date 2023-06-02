import { ProduceBaseUrl, TestBaseUrl } from './src/config/constant';

const BaseUrl = ProduceBaseUrl;
// const BaseUrl = TestBaseUrl;

export default {
  '/api': {
    target: BaseUrl,
    // target: '//127.0.0.1:8999',
    changeOrigin: true,
  },
  '/CoinMarket': {
    target: BaseUrl,
    // target: '//127.0.0.1:8998',
    changeOrigin: true,
  },
  '/StockMarket': {
    target: BaseUrl,
    // target: '//127.0.0.1:8997',
    changeOrigin: true,
  },
  '/CoinAI': {
    target: BaseUrl,
    // target: '//127.0.0.1:9012',
    changeOrigin: true,
  },
  '/StockAI': {
    target: BaseUrl,
    // target: '//127.0.0.1:xxxx',
    changeOrigin: true,
  },
};
