import LoginPage from '@/pages/LoginPage.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { authorizationGuard, authorizedToLoginRedirect, notFoundRedirect } from './redirects';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: notFoundRedirect
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      beforeEnter: authorizedToLoginRedirect
    },
    {
      path: '/orders',
      name: 'orders',
      component: (): Promise<typeof import('@/pages/OrderList.vue')> =>
        import('@/pages/OrderList.vue'),
      beforeEnter: authorizationGuard
    },
    {
      path: '/order/add',
      name: 'add order',
      component: (): Promise<typeof import('@/pages/AddOrder.vue')> =>
        import('@/pages/AddOrder.vue'),
      beforeEnter: authorizationGuard
    }
  ]
});

export default router;
