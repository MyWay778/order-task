<script setup lang="ts">
  import LoginForm from '@/components/LoginForm.vue';
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import InputVue from '@/components/UI/InputVue.vue';
</script>

<template>
  <main :class="['container', $style.container]">
    <form :class="$style.form">
      <h3 :class="$style.title">Добавить заказ</h3>
      <InputVue placeholder="Введите ваше имя" />
      <InputVue placeholder="Введите ваш адрес" />
      <InputVue placeholder="Комментарий" />
      <ButtonVue :class="$style.button" color="gray">Добавить заказ</ButtonVue>
    </form>
  </main>
</template>

<style module>
  .container {
    height: 100vh;
    padding: 45px;
  }

  .form {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
    max-width: 162px;
  }

  .title {
    margin-bottom: 27px;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
  }

  .button {
    align-self: flex-start;
  }
</style>
