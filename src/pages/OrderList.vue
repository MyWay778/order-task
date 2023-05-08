<script setup lang="ts">
  import ButtonVue from '@/components/UI/ButtonVue.vue';
  import IconClose from '@/components/icons/IconClose.vue';
  import IconCheck from '@/components/icons/IconCheck.vue';
  import ModalVue from '@/components/UI/ModalVue.vue';
  import { useUserStore } from '@/stores/user';
  import { userOrderStore } from '@/stores/orders';
  import { onMounted, ref } from 'vue';
  import type { OrderModelKeysType } from '@/typings/orderModel';
  import TableCell from '@/components/UI/table/TableCell.vue';
  import PageContainer from '@/components/UI/PageContainer.vue';

  const user = useUserStore();

  const orderStore = userOrderStore();

  onMounted(() => {
    orderStore.fetchOrders();
  });

  // Сортировка
  const onSort = (property: OrderModelKeysType): void => {
    const { filter } = orderStore;
    if (filter.property !== property) {
      orderStore.setFilter(property, 'asc');
    } else {
      orderStore.setFilter(property, filter.mode === 'asc' ? 'desc' : 'asc');
    }
  };

  // Изменение статуса
  const onComplete = (id: number): void => {
    orderStore.changeStatus(id, 'Выполнен');
  };

  // Удаление, подтверждение удаления
  let orderToDelete = 0;

  const onDelete = (id: number, event: Event): void => {
    event.stopPropagation();

    showDeleteModal.value = true;
    orderToDelete = id;
  };

  const onConfirmDelete = (): void => {
    orderStore.deleteOrder(orderToDelete);
    onCloseDeleteModal();
  };

  // Модальное окно удаления
  const showDeleteModal = ref(false);

  const onCloseDeleteModal = (): void => {
    showDeleteModal.value = false;

    orderToDelete = 0;
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
    <ModalVue :show-modal="showDeleteModal" @outside-click="onCloseDeleteModal">
      <div :class="$style.confirmDeleting">
        <p>Вы действительно хотите удалить заказ № {{ orderToDelete }}?</p>
        <div :class="$style.rowControls">
          <ButtonVue color="white" @click="onConfirmDelete">Ок</ButtonVue>
          <ButtonVue color="white" @click="onCloseDeleteModal">Отмена</ButtonVue>
        </div>
      </div>
    </ModalVue>
  </PageContainer>
</template>

<style module lang="scss">
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
