export interface OrderModelInterface {
  id: number;
  name: string;
  address: string;
  date: string;
  status: OrderStatusType;
  comment: string;
}

export type OrderModelKeysType = keyof OrderModelInterface;

export type OrderStatusType = 'Выполнен' | 'Новый';
