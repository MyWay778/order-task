import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { setupAxios } from './config/axios';
import '@/styles/main.scss';

const app = createApp(App);

setupAxios();
app.use(createPinia());
app.use(router);

app.mount('#app');
