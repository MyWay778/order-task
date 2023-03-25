<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import TheHeader from '@/components/TheHeader.vue';
  import { useInsertAccessToken } from '@/composables/useInsertAccessToken';
  import { useUserStore } from '@/stores/user';

  const userStore = useUserStore();

  // установка access токена в заголовки
  useInsertAccessToken();
</script>

<template>
  <TheHeader v-if="userStore.isAuthenticated" />
  <RouterView />
</template>
