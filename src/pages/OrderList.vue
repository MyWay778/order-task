<script setup lang="ts">
import ButtonVue from '@/components/UI/ButtonVue.vue';
import IconClose from '@/components/icons/IconClose.vue';
import IconCheck from '@/components/icons/IconCheck.vue';
import ModalVue from '@/components/UI/ModalVue.vue';
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
        <td :class="$style.controlContainer">
          <div :class="$style.controls">
            <ButtonVue color="white" icon>
              <IconCheck />
            </ButtonVue>
            <ButtonVue color="white" icon>
              <IconClose />
            </ButtonVue>
          </div>
        </td>
      </tr>
    </table>

    <ModalVue>
      <div :class="$style.confirmDeleting">
        <p>Вы действительно хотите удалить заказ?</p>
        <div :class="$style.controls">
          <ButtonVue color="white">Ок</ButtonVue>
          <ButtonVue color="white">Отмена</ButtonVue>
        </div>
      </div>
    </ModalVue>
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

  td {
    &.controlContainer {
      border: none;
    }

    .controls {
      display: flex;
      column-gap: 6px;
    }
  }
}

.confirmDeleting {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 335px;
  height: 215px;
  padding: 64px 44px 42px;

  .controls {
    display: flex;
    justify-content: space-between;
  }
}
</style>
