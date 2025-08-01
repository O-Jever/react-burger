import { useTokenMutation } from '@/api/server.api';
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';

enum AuthCookies {
  ACCESS = 'access',
  REFRESH = 'refresh',
  DATE = 'date',
}

const TOKEN_LIFETIME = 20 * 60 * 1000;

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const isAuthorized = (tokens: Partial<AuthTokens>): tokens is AuthTokens => {
  return Boolean(tokens.accessToken) && Boolean(tokens.refreshToken);
};

export const useAuthTokens = () => {
  const [renewToken, { error }] = useTokenMutation();
  const { saveTokens } = useSaveTokens();
  const accessToken = Cookies.get(AuthCookies.ACCESS);
  const refreshToken = Cookies.get(AuthCookies.REFRESH);
  const date = Number.parseInt(Cookies.get(AuthCookies.DATE) ?? '');
  const isExpired = Date.now() - date >= TOKEN_LIFETIME;

  useEffect(() => {
    if (isExpired && refreshToken) {
      renewToken({ token: refreshToken })
        .unwrap()
        .then((res) => {
          if (res.success) {
            saveTokens({
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [isExpired]);

  if (!accessToken || !refreshToken) {
    return {
      accessToken: '',
      refreshToken: ''
    };
  }

  return { accessToken, refreshToken, error };
};

export const useSaveTokens = () => {
  const saveTokens = useCallback(({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    Cookies.set(AuthCookies.DATE, Date.now().toString());
    Cookies.set(AuthCookies.ACCESS, accessToken);
    Cookies.set(AuthCookies.REFRESH, refreshToken);
  }, []);

  return { saveTokens };
};

export const useResetTokens = () => {
  const resetTokens = useCallback(() => {
    Cookies.remove(AuthCookies.ACCESS);
    Cookies.remove(AuthCookies.REFRESH);
    Cookies.remove(AuthCookies.DATE);
  }, []);

  return { resetTokens };
};
