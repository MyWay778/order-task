import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { UserModelInterface } from '@/typings/userModel';
import { api } from '@/config/axios';

interface IUserAuth {
  login: string;
  password: string;
}

interface IError {
  status: number;
  message: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserModelInterface | null>(null);
  const error = ref<IError | null>(null);

  const isAuthenticated = computed(() => {
    if (user.value !== null) {
      return true;
    }
    return false;
  });

  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(userAuth: IUserAuth): Promise<boolean> {
    try {
      const { data } = await axios.post<UserModelInterface>(api.login, userAuth, {
        withCredentials: true
      });

      user.value = data;
      error.value = null;
      return true;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        error.value = {
          status: e.response?.status || 0,
          message: e.response?.data.message || 'Неизвестная ошибка'
        };
      } else {
        console.warn('unexpected error: ', e);
      }
      return false;
    }
  }

  async function auth(): Promise<boolean> {
    try {
      const { data } = await axios.get<UserModelInterface>(api.refresh, {
        withCredentials: true
      });
      user.value = data;
      return true;
    } catch (e) {
      return false;
    }
  }

  async function logout(): Promise<void> {
    try {
      await axios.get<UserModelInterface>(api.logout, {
        withCredentials: true
      });
      user.value = null;
    } catch (e) {
      console.warn('logout error: ', e);
    }
  }

  return { user, error, isAuthenticated, isAdmin, login, auth, logout };
});
