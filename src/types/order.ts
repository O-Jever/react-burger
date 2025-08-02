export type Order = {
  ingredients: string[];
  _id: string;
  status: OrderStatus;
  number: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export enum OrderStatus {
  DONE = 'done',
  CREATED = 'created',
  PENDING = 'pending',
}