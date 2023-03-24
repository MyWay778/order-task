<script setup lang="ts">
import ButtonVue from '@/components/UI/ButtonVue.vue';
import IconClose from '@/components/icons/IconClose.vue';
</script>

<template>
  <main :class="['container', $style.container]">
    <table :class="$style.table">
      <tr>
        <th>№</th>
        <th>Имя клиента</th>
        <th>Адрес</th>
        <th>Дата заказа</th>
        <th>Статус</th>
        <th>Комментарий</th>
      </tr>
      <tr>
        <td>1</td>
        <td>Иван Иванов</td>
        <td>Знаменка ул., 19, Москва</td>
        <td>11 ноября 2022</td>
        <td>Выполнено</td>
        <td>привезти не позднее 18:00</td>
        <div :class="$style.controls">
          <ButtonVue color="white" icon>
            <IconClose />
          </ButtonVue>
          <ButtonVue color="white" icon>
            <IconClose />
          </ButtonVue>
        </div>
      </tr>
    </table>
  </main>
</template>
<style module lang="scss">
.container {
  height: 100vh;
  padding: 45px;
}

.table {
  border-collapse: collapse;

  th,
  td {
    padding: 9px 25px;
    border: 1px solid black;
  }
}
</style>
