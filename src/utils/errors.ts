import { ApiError } from '@/types/api';

export const isApiError = (error: unknown): error is ApiError => {
  return Boolean(error) && typeof error === 'object' && error !== null && 'data' in error;
};
