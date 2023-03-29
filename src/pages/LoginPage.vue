<script setup lang="ts">
  import PageContainer from '@/components/UI/PageContainer.vue';
  import InputVue from '@/components/UI/InputVue.vue';
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import { useUserStore } from '@/stores/user';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useValidation from '@/composables/useValidation';

  const user = reactive({
    login: '',
    password: ''
  });

  const isShowErrors = ref(false);

  const errors = useValidation(
    user,
    {
      login: {
        required: true
      },
      password: {
        required: true,
        min: 8
      }
    },
    { immediate: true }
  );

  const router = useRouter();
  const userStore = useUserStore();

  const onSubmit = async () => {
    if (Object.keys(errors).length) {
      isShowErrors.value = true;
      return;
    }

    const isAuth = await userStore.login(user);
    if (isAuth) {
      router.replace({ name: 'orders' });
    }
  };
</script>

<template>
  <PageContainer>
    <div :class="$style.window">
      <form :class="$style.form" @submit.prevent>
        <span :class="$style.message">{{ userStore.error?.message || '' }}</span>

        <!-- Логин -->
        <InputVue
          v-model.trim="user.login"
          placeholder="username"
          :error-message="isShowErrors ? errors.login : ''"
          required
          autocomplete="name"
          autofocus="true" />

        <!-- Пароль -->
        <InputVue
          v-model.trim="user.password"
          placeholder="password"
          type="password"
          :error-message="isShowErrors ? errors.password : ''"
          required
          autocomplete="password" />

        <ButtonVue :class="$style.button" type="button" color="white" @click="onSubmit" />
      </form>
    </div>
  </PageContainer>
</template>

<style module lang="scss">
  .window {
    width: 344px;
    height: 245px;
    margin-top: 9%;
    padding: 34px 38px;
    background-color: var(--color-gray-dark);
  }

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
