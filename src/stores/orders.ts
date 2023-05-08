import { api } from '@/config/axios';
import sortFunctions from '@/helpers/sortFunctions';
import type { OrderModelInterface, OrderStatusType } from '@/typings/orderModel';
import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from './user';

interface orderFilter {
  property: keyof OrderModelInterface | '';
  mode: 'asc' | 'desc';
}

type FilterModeType = 'asc' | 'desc';

export interface NewOrderInterface extends Omit<OrderModelInterface, 'id'> {}

export const userOrderStore = defineStore('orders', () => {
  const orders = ref<OrderModelInterface[]>([]);
  const filter = reactive<orderFilter>({
    property: '',
    mode: 'asc'
  });
  const error = ref(false);

  const filteredOrders = computed(() => {
    if (filter.property === 'address') {
      return sortFunctions.byText(orders.value, 'address', filter.mode);
    }
    if (filter.property === 'date') {
      return sortFunctions.byDate(orders.value, 'date', filter.mode);
    }
    return orders.value;
  });

  async function fetchOrders(): Promise<void> {
    try {
      const { data } = await axios.get<OrderModelInterface[]>(api.orders);
      orders.value = data;
      error.value = false;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const response = e.response;

        if (response?.status === 403) {
          const userStore = useUserStore();

          const success = await userStore.auth();
          if (success) {
            fetchOrders();
          } else {
            useRouter().push({ name: 'login' });
          }
          return;
        }
      } else {
        console.warn(e);
      }

      orders.value = [];
      error.value = true;
    }
  }

  function setFilter(property: keyof OrderModelInterface, mode: FilterModeType = 'asc'): void {
    filter.property = property;
    filter.mode = mode;
  }

  async function changeStatus(id: number, status: OrderStatusType): Promise<boolean> {
    const userStore = useUserStore();
    if (userStore.user?.role !== 'admin') return false;

    try {
      const { data } = await axios.patch<OrderModelInterface>(`${api.orders}/${id}`, { status });

      const foundOrderIdx = orders.value.findIndex((o) => o.id === data.id);
      orders.value[foundOrderIdx] = data;
      return true;
    } catch (e) {
      console.warn(e);
      return false;
    }
  }

  async function deleteOrder(id: number): Promise<void> {
    const userStore = useUserStore();
    if (userStore.user?.role !== 'admin') return;

    try {
      await axios.delete(`${api.orders}/${id}`);
      fetchOrders();
    } catch (e) {
      console.warn(e);
    }
  }

  async function addOrder(order: NewOrderInterface): Promise<boolean> {
    try {
      await axios.post(api.orders, order);
      return true;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const response = e.response;

        if (response?.status === 403) {
          const userStore = useUserStore();

          const success = await userStore.auth();
          if (success) {
            await axios.post(api.orders, order);
            return true;
          }
        }
      } else {
        console.warn('Неизвестная ошибка:', e);
      }
      return false;
    }
  }

  return {
    filteredOrders,
    filter,
    error,
    fetchOrders,
    changeStatus,
    setFilter,
    deleteOrder,
    addOrder
  };
});
