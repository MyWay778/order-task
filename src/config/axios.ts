import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) console.warn('api url not configured!');

export const api = {
  baseUrl: apiUrl,
  login: `/login`,
  auth: '/auth',
  refresh: '/refresh',
  logout: '/logout',
  orders: '/orders'
};

export function setupAxios() {
  axios.defaults.baseURL = api.baseUrl;
}

export function setAuthToken(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}

export function removeAuthToken() {
  axios.defaults.headers.common['Authorization'] = undefined;
}
