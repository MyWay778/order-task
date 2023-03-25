import { useUserStore } from '@/stores/user';
import type { RouteLocationNormalized } from 'vue-router';

export function notFoundRedirect() {
  const user = useUserStore();

  if (user.isAuthenticated) {
    return { name: 'orders' };
  } else {
    // params чтобы скрыть ворнинг https://github.com/vuejs/router/issues/1617#issuecomment-1320941431
    return { name: 'login', params: {} };
  }
}

export async function authorizedToLoginRedirect() {
  const user = useUserStore();

  if (user.isAuthenticated) {
    return { name: 'orders' };
  } else {
    const success = await user.auth();

    if (success) {
      return { name: 'orders' };
    }
  }
}

export async function authorizationGuard(to: RouteLocationNormalized) {
  const user = useUserStore();

  if (!user.isAuthenticated) {
    const success = await user.auth();

    if (success) {
      return to;
    } else {
      return { name: 'login' };
    }
  }
}
