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
    path: '/CoinServe',
    component: () => import('@/pages/CoinServe/IndexPage.vue'),
    children: [
      {
        path: '',
        isLogin: true,
        description: 'ServerList',
        component: () => import('@/pages/CoinServe/ServerList.vue'),
      },
      {
        path: 'CreateCoinServe',
        description: 'CreateCoinServe',
        component: () => import('@/pages/CoinServe/CreateCoinServe.vue'),
      },
      {
        path: 'CoinAI',
        description: 'CoinAI',
        component: () => import('@/pages/CoinServe/CoinAI.vue'),
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
        description: 'PWA应用安装指南',
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
        description: 'Okx 密钥',
        component: () => import('@/pages/About/OkxKey.vue'),
      },
      {
        path: 'CoinServe',
        description: 'CoinServe 使用说明',
        component: () => import('@/pages/About/CoinServe.vue'),
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
  var isToLogin = false;
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
    var path = route.path;
    if (route.children?.length > 0) {
      for (const children of route.children) {
        var NewPath = path;
        if (children.path) {
          NewPath = path + '/' + children.path;
        }
        callBack(NewPath, children.isLogin);
      }
    } else {
      callBack(path, route.isLogin);
    }
  }
}

export { router, routes };
