import { Order } from '@/types/order';

export type GetOrderResponse = {
  success: boolean;
  orders: Order[];
};
