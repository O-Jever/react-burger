import { createApi, fetchBaseQuery, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

import { RegisterRequest } from '@/pages/RegisterPage/types/RegisterRequest';
import { LoginRequest } from '@/pages/LoginPage/types/LoginRequest';
import { LoginResponse } from '@/pages/LoginPage/types/LoginResponse';
import { RegisterResponse } from '@/pages/RegisterPage/types/RegisterResponse';
import { ForgotPasswordRequest } from '@/pages/ForgotPasswordPage/types/ForgotPasswordRequest';
import { ForgotPasswordResponse } from '@/pages/ForgotPasswordPage/types/ForgotPasswordResponse';
import { ResetPasswordRequest } from '@/pages/ResetPasswordPage/types/ResetPasswordRequest';
import { ResetPasswordResponse } from '@/pages/ResetPasswordPage/types/ResetPasswordResponse';
import { UpdateUserResponse } from '@/pages/ProfilePage/types/UpdateUserResponse';
import { GetUserRequest } from '@/pages/ProfilePage/types/GetUserRequest';
import { UpdateUserRequest } from '@/pages/ProfilePage/types/UpdateUserRequest';
import { GetUserResponse } from '@/pages/ProfilePage/types/GetUserResponse';
import { LogoutRequest } from '@/pages/LogoutPage/types/LogoutRequest';
import { LogoutResponse } from '@/pages/LogoutPage/types/LogoutResponse';
import { GetOrdersAllResponse } from '@/pages/FeedPage/types/GetOrdersAllResponse';
import { GetOrderResponse } from '@/pages/FeedPage/types/GetOrderResponse';
import type {
  CommonApiResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetIngredientsResponse,
  GetUserOrdersRequest,
  TokenRequest,
  TokenResponse,
} from '@/types/api';
import { Ingredient } from '@/types/ingredient';
import { Order } from '@/types/order';

const BASE_URL = 'https://norma.nomoreparties.space/api/';

const transformResponse = <T extends CommonApiResponse>(response: T, meta?: FetchBaseQueryMeta) => {
  if (!response.success) {
    const path = meta?.request.url.replace(BASE_URL, '') || 'unknown';
    throw new Error(`${path} request is failed`);
  }

  return response;
};

export const serverApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    getIngredients: build.query<Ingredient[], void>({
      query: () => 'ingredients',
      transformResponse: (res: GetIngredientsResponse, meta) => transformResponse(res, meta).data,
    }),
    createOrder: build.mutation<CreateOrderResponse, CreateOrderRequest>({
      query: ({ ingredients, accessToken }) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients },
        headers: {
          authorization: accessToken
        }
      }),
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      transformResponse: (res: LoginResponse, meta) => transformResponse(res, meta),
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      transformResponse: (res: RegisterResponse, meta) => transformResponse(res, meta),
    }),
    forgotPassword: build.mutation<ForgotPasswordResponse, ForgotPasswordRequest>({
      query: (body) => ({
        url: 'password-reset',
        method: 'POST',
        body,
      }),
      transformResponse: (res: ForgotPasswordResponse, meta) => transformResponse(res, meta),
    }),
    resetPassword: build.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (body) => ({
        url: 'password-reset/reset',
        method: 'POST',
        body,
      }),
      transformResponse: (res: ResetPasswordResponse, meta) => transformResponse(res, meta),
    }),
    logout: build.mutation<LogoutResponse, LogoutRequest>({
      query: (body) => ({
        url: 'auth/logout',
        method: 'POST',
        body,
      }),
      transformResponse: (res: LogoutResponse, meta) => transformResponse(res, meta),
    }),
    token: build.mutation<TokenResponse, TokenRequest>({
      query: (body) => ({
        url: 'auth/token',
        method: 'POST',
        body,
      }),
      transformResponse: (res: TokenResponse, meta) => transformResponse(res, meta),
    }),
    getUser: build.query<GetUserResponse, GetUserRequest>({
      query: ({ accessToken }) => ({
        url: 'auth/user',
        headers: {
          authorization: accessToken,
        },
      }),
      transformResponse: (res: GetUserResponse, meta) => transformResponse(res, meta),
      providesTags: ['User'],
    }),
    updateUser: build.mutation<UpdateUserResponse, UpdateUserRequest>({
      query: ({ accessToken, name, email, password }) => ({
        url: 'auth/user',
        method: 'PATCH',
        headers: {
          authorization: accessToken,
        },
        body: {
          name,
          email,
          password,
        },
      }),
      transformResponse: (res: UpdateUserResponse, meta) => transformResponse(res, meta),
      invalidatesTags: ['User'],
    }),
    getOrdersAll: build.query<GetOrdersAllResponse, void>({
      queryFn: () => ({ data: { success: true, orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
        let isOpened = false;
        try {
          await cacheDataLoaded;
          ws.onopen = () => isOpened = true;
          ws.onmessage = (event) => {
            try {
              const data: GetOrdersAllResponse = JSON.parse(event.data);
              updateCachedData(() => data);
            } catch (e) {
              console.error('Ошибка парсинга данных из WebSocket', e);
            }
          };
          ws.onerror = (event) => console.error('WebSocket error: ', event);
          await cacheEntryRemoved;
        } finally {
          if (isOpened) ws.close();
        }
      },
      keepUnusedDataFor: 0
    }),
    getUserOrders: build.query<GetOrdersAllResponse, GetUserOrdersRequest>({
      queryFn: () => ({ data: { success: true, orders: [], total: 0, totalToday: 0 } }),
      async onCacheEntryAdded(
        { token },
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        let isOpened = false;
        const ws = new WebSocket(`wss://norma.nomoreparties.space/orders?token=${token}`);
        try {
          await cacheDataLoaded;
          ws.onopen = () => isOpened = true;
          ws.onmessage = (event) => {
            try {
              const data: GetOrdersAllResponse = JSON.parse(event.data);
              updateCachedData(() => data);
            } catch (e) {
              console.error('Ошибка парсинга данных из WebSocket', e);
            }
          };
          ws.onerror = (event) => console.error('WebSocket error: ', event);
          await cacheEntryRemoved;
        } finally {
          if (isOpened) ws.close();
        }
      },
      keepUnusedDataFor: 0
    }),
    getOrder: build.query<Order, {num: string}>({
      query: ({ num }) => ({
        url: `orders/${num}`,
        method: 'GET'
      }),
      transformResponse: (res: GetOrderResponse, meta) => transformResponse(res, meta).orders[0],
    })
  }),
});

export const {
  useGetIngredientsQuery,
  useCreateOrderMutation,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useTokenMutation,
  useGetUserQuery,
  useUpdateUserMutation,
  useLogoutMutation,
  useGetOrdersAllQuery,
  useGetUserOrdersQuery,
  useGetOrderQuery,
} = serverApi;
