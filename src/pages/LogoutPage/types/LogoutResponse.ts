import { CommonApiResponse } from '@/types/api';

export type LogoutResponse = CommonApiResponse & {
  accessToken: string;
  refreshToken: string;
};
