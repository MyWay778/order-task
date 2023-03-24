<script setup lang="ts">
import ButtonVue from '@/components/UI/ButtonVue.vue';
</script>
<template>
  <header :class="$style.header">
    <div :class="['container', $style.inner]">
      <nav :class="$style.nav">
        <a href="/order/all">Все заказы</a>
        <a href="/order/add">Добавить заказ</a>
      </nav>
      <div :class="$style.userPanel">
        <span>ИмяФамилия</span>
        <ButtonVue class="">Выйти</ButtonVue>
      </div>
    </div>
  </header>
</template>

<style module>
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
