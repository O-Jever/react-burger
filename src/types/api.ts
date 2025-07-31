import { Ingredient } from './ingredient';

export type CommonApiResponse = {
  success: boolean;
};

export type GetIngredientsResponse = CommonApiResponse & {
  data: Ingredient[];
};

export type CreateOrderRequest = {
  ingredients: string[];
  accessToken: string;
};

export type CreateOrderResponse = CommonApiResponse & {
  name: string;
  order: {
    number: number;
  };
};

export type ApiError = {
  status: number;
  data: {
    success: false;
    message: string;
  };
};

export type TokenRequest = {
  token: string;
};

export type TokenResponse = CommonApiResponse & {
  accessToken: string;
  refreshToken: string;
};

export type GetUserOrdersRequest = {
  token: string;
};
