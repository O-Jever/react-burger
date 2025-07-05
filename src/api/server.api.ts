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
import {
  CommonApiResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  GetIngredientsResponse,
  TokenRequest,
  TokenResponse,
} from '@/types/api';
import { Ingredient } from '@/types/ingredient';

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
      query: ({ ingredients }) => ({
        url: 'orders',
        method: 'POST',
        body: { ingredients },
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
} = serverApi;
