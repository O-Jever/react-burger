import { Order } from '@/types/order';

export type GetOrdersAllResponse = {
  success: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
};
