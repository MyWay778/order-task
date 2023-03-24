<script setup lang="ts">
  import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
  <main :class="['container', $style.container]">
    <div :class="$style.window">
      <LoginForm />
    </div>
  </main>
</template>

<style module>
  .container {
    height: 100vh;
    padding: 45px;
  }

  .window {
    width: 344px;
    height: 245px;
    margin-top: 9%;
    padding: 34px 38px;
    background-color: var(--color-gray-dark);
  }
</style>
