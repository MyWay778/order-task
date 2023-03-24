import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import type { IUserModal } from '@/typings/userModal';

const baseURL = 'http://localhost:3000';
const authApi = '/auth';

interface IUserAuth {
  login: string;
  password: string;
}

interface IError {
  status: number;
  message: string;
}

export const useUserStore = defineStore('user', () => {
  const user = ref<IUserModal | null>(null);
  const error = ref<IError | null>(null);

  async function auth(userAuth: IUserAuth) {
    try {
      const { data } = await axios.post<IUserModal>(authApi, userAuth, { baseURL });
      user.value = data;
      return true;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log('error message: ', e);
        error.value = {
          status: e.response?.status || 0,
          message: e.response?.data.message || 'Неизвестная ошибка'
        };
      } else {
        console.log('unexpected error: ', e);
      }
      return false;
    }
  }

  return { user, error, auth };
});
