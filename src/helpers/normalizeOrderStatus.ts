import type { OrderStatusType } from '@/typings/orderModel';

type RowStatusType = 'new' | 'completed';

const orderStatuses: Record<RowStatusType, OrderStatusType> = {
  new: 'Новый',
  completed: 'Выполнен'
};

export function normalizeOrderStatus(status: RowStatusType): OrderStatusType {
  return orderStatuses[status];
}
