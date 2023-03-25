import axios from 'axios';

export const api = {
  baseUrl: 'http://localhost:3000',
  login: '/login',
  auth: '/auth',
  refresh: '/refresh',
  logout: '/logout',
  orders: '/orders'
};

export function setupAxios() {
  axios.defaults.baseURL = api.baseUrl;
  // axios.defaults.withCredentials = true;
}

export function setAuthToken(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}

export function removeAuthToken() {
  axios.defaults.headers.common['Authorization'] = undefined;
}
