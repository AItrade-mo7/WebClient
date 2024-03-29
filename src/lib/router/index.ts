import { createRouter, createWebHistory } from 'vue-router';
import { getToken } from '@/utils/tools';
const routes: any = [
  {
    path: '/',
    component: () => import('@/pages/HomePage.vue'),
  },
  {
    path: '/Login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/Register',
    component: () => import('@/pages/RegisterPage.vue'),
  },
  {
    path: '/Developer',
    component: () => import('@/pages/DeveloperPage.vue'),
  },
  {
    path: '/CoinTicker',
    component: () => import('@/pages/CoinTicker/IndexPage.vue'),
    children: [
      {
        path: '',
        description: 'TickerView',
        component: () => import('@/pages/CoinTicker/TickerView.vue'),
      },
      {
        path: 'AnalyHistory',
        description: 'AnalyHistory',
        component: () => import('@/pages/CoinTicker/AnalyHistory.vue'),
      },
    ],
  },
  {
    path: '/SatelliteServe',
    component: () => import('@/pages/SatelliteServe/IndexPage.vue'),
    children: [
      {
        path: '',
        isLogin: true,
        description: 'ServerList',
        component: () => import('@/pages/SatelliteServe/ServerList.vue'),
      },
      {
        path: 'CreateCoinServe',
        description: 'CreateCoinServe',
        component: () => import('@/pages/SatelliteServe/CreateCoinServe.vue'),
      },
      {
        path: 'VirtualPositionList/:id',
        isLogin: true,
        description: 'VirtualPositionList',
        component: () => import('@/pages/SatelliteServe/VirtualPositionList.vue'),
      },
      {
        path: 'CoinAI/:id',
        isLogin: true,
        description: 'CoinAI',
        component: () => import('@/pages/SatelliteServe/CoinAI.vue'),
      },
      {
        path: 'AddKey/:id',
        isLogin: true,
        description: 'AddKey',
        component: () => import('@/pages/SatelliteServe/AddKey.vue'),
      },
      {
        path: 'MainUser/:id',
        isLogin: true,
        description: 'MainUser',
        component: () => import('@/pages/SatelliteServe/MainUser.vue'),
      },
    ],
  },
  {
    path: '/About',
    component: () => import('@/pages/About/IndexPage.vue'),
    children: [
      {
        path: '',
        description: 'List',
        component: () => import('@/pages/About/ListPage.vue'),
      },

      {
        path: 'PWA',
        description: 'PWA应用科普',
        component: () => import('@/pages/About/PWA.vue'),
      },
      {
        path: 'Duty',
        description: '用户协议',
        component: () => import('@/pages/About/DutyPage.vue'),
      },
      {
        path: 'ReleaseNotes',
        description: '版本说明',
        component: () => import('@/pages/About/ReleaseNotes.vue'),
      },
      {
        path: 'OkxKey',
        description: 'OKX API Key 申请指南',
        component: () => import('@/pages/About/OkxKey.vue'),
      },
      {
        path: 'SatelliteServe',
        description: '卫星服务使用说明',
        component: () => import('@/pages/About/SatelliteServe.vue'),
      },
      {
        path: 'EmailList',
        description: '系统邮件地址',
        component: () => import('@/pages/About/EmailList.vue'),
      },
    ],
  },
  {
    path: '/StockTicker',
    component: () => import('@/pages/StockTicker/IndexPage.vue'),
    children: [
      {
        path: '',
        description: 'List',
        component: () => import('@/pages/StockTicker/TickerView.vue'),
      },
    ],
  },
  {
    path: '/Personal',
    isLogin: true,
    component: () => import('@/pages/PersonalPage.vue'),
  },
  {
    path: '/ApiKey',
    isLogin: true,
    component: () => import('@/pages/ApiKey.vue'),
  },
  {
    path: '/OrderList',
    isLogin: true,
    component: () => import('@/pages/OrderList.vue'),
  },
  {
    path: '/ManageEmail',
    isLogin: true,
    component: () => import('@/pages/ManageEmail.vue'),
  },
  {
    path: '/EditProfile',
    isLogin: true,
    component: () => import('@/pages/EditProfile.vue'),
  },
  {
    path: '/ChangePassword',
    component: () => import('@/pages/ChangePassword.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/pages/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  const Token = getToken();
  let isToLogin = false;
  if (!Token) {
    TraverseRouter((path, isLogin) => {
      if (to.path == path) {
        if (isLogin) {
          isToLogin = true;
        }
      }
    });
  }

  if (isToLogin) {
    return { path: '/Login' };
  }
});

function TraverseRouter(callBack) {
  for (const route of routes) {
    const path = route.path;
    if (route.children?.length > 0) {
      for (const children of route.children) {
        let NewPath = path;
        if (children.path) {
          NewPath = `${path}/${children.path}`;
        }
        callBack(NewPath, children.isLogin);
      }
    } else {
      callBack(path, route.isLogin);
    }
  }
}

export { router, routes };
