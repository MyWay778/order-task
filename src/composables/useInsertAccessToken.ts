import { removeAuthToken, setAuthToken } from '@/config/axios';
import { useUserStore } from '@/stores/user';
import { watch } from 'vue';

export function useInsertAccessToken() {
  const userStore = useUserStore();

  watch(
    () => userStore.user,
    (isAuthenticated) => {
      if (isAuthenticated && userStore.user?.accessToken) {
        setAuthToken(userStore.user?.accessToken);
      } else {
        removeAuthToken();
      }
    }
  );
}
