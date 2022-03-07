import { createRouter, createWebHashHistory } from 'vue-router';
import localCacheInstance from '../utils/cache';
import { firstRoute } from '../utils/mapMenu';

const routes = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/main.vue')
  },
  {
    path: '/:patchMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/notFound/notFound.vue')
  }
];
const router = createRouter({
  routes,
  history: createWebHashHistory()
});
router.beforeEach((to, from) => {
  if (to.path == '/login') {
    const token = localCacheInstance.getCache('token');
    if (token) {
      router.go(-1);
    }
  } else if (to.path == '/main') {
    return firstRoute.url;
  } else {
    localCacheInstance.getCache('token') ?? router.push('/login');
  }
  // if (to.name == '/login') {
  //   localCacheInstance.getCache('token') ?? console.log(123);
  // }
});

export default router;
