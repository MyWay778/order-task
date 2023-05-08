<script setup lang="ts">
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import { useUserStore } from '@/stores/user';
  import { useRouter } from 'vue-router';

  const userStore = useUserStore();
  const router = useRouter();

  const onLogout = async (): Promise<void> => {
    await userStore.logout();
    router.replace({ name: 'login' });
  };
</script>

<template>
  <header :class="$style.header">
    <div :class="['container', $style.inner]">
      <nav :class="$style.nav">
        <router-link :to="{ name: 'orders' }">Все заказы</router-link>
        <router-link :to="{ name: 'add order' }">Добавить заказ</router-link>
      </nav>
      <div :class="$style.userPanel">
        <span>{{ userStore.user?.name }}</span>
        <ButtonVue @click="onLogout">Выйти</ButtonVue>
      </div>
    </div>
  </header>
</template>

<style module lang="scss">
  .header {
    padding: 18px 22px;
    background-color: var(--color-blue-dark);
  }

  .inner {
    display: flex;
    justify-content: space-between;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 196px;
    color: var(--color-white);
    column-gap: 10px;
  }

  .userPanel {
    display: flex;
    align-items: center;
    column-gap: 28px;
  }
</style>
