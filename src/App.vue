<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import HelloWorld from './components/HelloWorld.vue';
  import TheHeader from './components/TheHeader.vue';
  import { useUserStore } from '@/stores/user';
  import { computed } from 'vue';

  const userStore = useUserStore();
  const showHeader = computed(() => {
    if (userStore.user) return true;
    return false;
  });
</script>

<template>
  <TheHeader v-if="showHeader" />
  <RouterView />
</template>
