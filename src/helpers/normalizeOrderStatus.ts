import type { OrderStatusType } from '@/typings/orderModel';

const orderStatuses: Record<string, OrderStatusType> = {
  new: 'Новый',
  completed: 'Выполнен'
};

export function normalizeOrderStatus(status: OrderStatusType) {
  return orderStatuses[status];
}
