<script setup lang="ts">
import InputVue from '@/components/UI/InputVue.vue';
import ButtonVue from '@/components/UI/ButtonVue.vue';
</script>
<template>
  <form :class="$style.form">
    <InputVue placeholder="username" errorMessage="обязательное поле" />
    <InputVue placeholder="password" type="password" />
    <ButtonVue :class="$style.button" color="white" />
  </form>
</template>
<style module lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 14px;
  max-width: 180px;
}

.button {
  align-self: flex-end;
}
</style>
