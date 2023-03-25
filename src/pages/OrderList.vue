<script setup lang="ts">
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import IconClose from '@/components/icons/IconClose.vue';
  import IconCheck from '@/components/icons/IconCheck.vue';
  import ModalVue from '@/components/UI/ModalVue.vue';
  import { useUserStore } from '@/stores/user';
  import { userOrderStore } from '@/stores/orders';
  import { onMounted, ref, watch } from 'vue';
  import type { OrderModelKeysType } from '@/typings/orderModel';
  import TableCell from '@/components/UI/table/TableCell.vue';
  import PageContainer from '@/components/UI/PageContainer.vue';

  const user = useUserStore();

  const orderStore = userOrderStore();

  onMounted(() => {
    orderStore.fetchOrders();
  });

  // Сортировка
  const onSort = (property: OrderModelKeysType) => {
    const { filter } = orderStore;
    if (filter.property !== property) {
      orderStore.setFilter(property, 'asc');
    } else {
      orderStore.setFilter(property, filter.mode === 'asc' ? 'desc' : 'asc');
    }
  };

  // Изменение статуса
  const onComplete = (id: number) => {
    orderStore.changeStatus(id, 'Выполнен');
  };

  // Модальное окно
  const isOpenModal = ref(false);

  watch(isOpenModal, () => {
    if (isOpenModal.value) {
      window.addEventListener('click', onCloseModal);
    } else {
      window.removeEventListener('click', onCloseModal);
    }
  });

  const onCloseModal = () => {
    isOpenModal.value = false;

    orderToDelete = 0;
  };

  let orderToDelete = 0;

  // Удаление, подтверждение
  const onDelete = (id: number, event: Event) => {
    event.stopPropagation();

    isOpenModal.value = true;
    orderToDelete = id;
  };

  const onConfirmDelete = () => {
    orderStore.deleteOrder(orderToDelete);
    onCloseModal();
  };
</script>

<template>
  <PageContainer>
    <table v-if="orderStore.filteredOrders.length && !orderStore.error" :class="$style.table">
      <!-- TABLE HEAD -->
      <tr>
        <TableCell tag="th" sortable @click="onSort('id')">№</TableCell>
        <TableCell tag="th">Имя клиента</TableCell>
        <TableCell
          tag="th"
          sortable
          :active-sort="orderStore.filter.property === 'address'"
          :mode="orderStore.filter.mode"
          @click="onSort('address')">
          Адрес
        </TableCell>
        <TableCell
          tag="th"
          sortable
          :active-sort="orderStore.filter.property === 'date'"
          :mode="orderStore.filter.mode"
          @click="onSort('date')">
          Дата заказа
        </TableCell>
        <TableCell tag="th">Статус</TableCell>
        <TableCell tag="th">Комментарий</TableCell>
      </tr>

      <!-- TABLE BODY -->
      <tr
        v-for="order in orderStore.filteredOrders"
        :key="order.id"
        :class="{ [$style.completed]: order.status === 'Выполнен' }">
        <td>{{ order.id }}</td>
        <td>{{ order.name }}</td>
        <td>{{ order.address }}</td>
        <td class="text-center">{{ order.date }}</td>
        <td class="text-center">{{ order.status }}</td>
        <td>{{ order.comment }}</td>

        <!-- CONTROLS -->
        <td :class="$style.controlContainer">
          <div :class="$style.controls" v-if="user.isAdmin">
            <ButtonVue
              v-if="order.status !== 'Выполнен'"
              @click="onComplete(order.id)"
              color="white"
              icon>
              <IconCheck />
            </ButtonVue>
            <ButtonVue color="white" icon @click="onDelete(order.id, $event)">
              <IconClose />
            </ButtonVue>
          </div>
        </td>
      </tr>
    </table>

    <!-- Сообщения -->
    <p v-else-if="orderStore.error">Произошла ошибка...</p>
    <p v-else>Заказов нет</p>

    <!-- Модалка подтверждения удаления -->
    <ModalVue v-if="isOpenModal" @click.stop>
      <div :class="$style.confirmDeleting">
        <p>Вы действительно хотите удалить заказ № {{ orderToDelete }}?</p>
        <div :class="$style.rowControls">
          <ButtonVue color="white" @click="onConfirmDelete">Ок</ButtonVue>
          <ButtonVue color="white" @click="onCloseModal">Отмена</ButtonVue>
        </div>
      </div>
    </ModalVue>
  </PageContainer>
</template>

<style module lang="scss">
  .container {
    height: calc(100vh - 63px);
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
        justify-content: flex-end;
        column-gap: 6px;
      }
    }

    .completed td {
      color: #636363;
    }
  }

  .confirmDeleting {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 335px;
    min-height: 215px;
    padding: 64px 44px 42px;

    .rowControls {
      display: flex;
      justify-content: space-between;
    }
  }
</style>
