<script setup lang="ts">
  import InputVue from '@/components/UI/InputVue.vue';
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import { useUserStore } from '@/stores/user';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    onSubmit?: () => void;
  }>();

  const userStore = useUserStore();

  const user = reactive({
    login: '',
    password: ''
  });

  const router = useRouter();

  const onSubmit = async () => {
    const isAuth = await userStore.auth(user);
    if (isAuth) {
      router.push({ name: 'orders' });
    }
  };
</script>

<template>
  <form :class="$style.form" @submit.prevent>
    <span :class="$style.message">{{ userStore.error?.message || '' }}</span>
    <InputVue v-model="user.login" placeholder="username" />
    <InputVue v-model="user.password" placeholder="password" type="password" />
    <ButtonVue :class="$style.button" type="button" color="white" @click="onSubmit" />
  </form>
</template>

<style module>
  .form {
    position: relative;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    max-width: 180px;
  }

  .message {
    height: 15px;
    color: var(--color-error);
    white-space: nowrap;
  }

  .button {
    align-self: flex-end;
  }
</style>
