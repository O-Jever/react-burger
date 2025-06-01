import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Ingredient } from '../types/ingredient';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

type GetIngredientsResponse = {
  success: string;
  data: Ingredient[];
};

type CreateOrderRequest = {
  ingredients: string[];
};

type CreateOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (build) => ({
    getIngredients: build.query<Ingredient[], void>({
      query: () => 'ingredients',
      transformResponse: (response: GetIngredientsResponse) => {
        if (!response.success) {
          throw new Error('Get ingredients request is failed');
        }

        return response.data;
      },
    }),
    createOrder: build.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: ({ ingredients }) => ({
        url: 'orders',
        method: 'POST',
        body: {ingredients},
      }),
    }),
  }),
});

export const { useGetIngredientsQuery, useCreateOrderMutation } = serverApi;