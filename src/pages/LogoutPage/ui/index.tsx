import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/api/server.api';
import { useAuthTokens, useResetTokens } from '@/hooks/auth-tokens';
import { ButtonComponent } from '@/components/button';
import { ErrorMessage } from '@/components/error-message';
import { isApiError } from '@/utils/errors';

import './styles.css';

export const LogoutPage: FC = () => {
  const [logout, { error: logoutError, isLoading }] = useLogoutMutation();
  const { refreshToken, error: authError } = useAuthTokens();
  const { resetTokens } = useResetTokens();
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      await logout({ token: refreshToken }).unwrap();
      resetTokens();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='logout mt-30'>
      <span className='text text_type_main-default text_color_inactive'>Вы действительно хотите выйти?</span>
      {isApiError(logoutError) ? <ErrorMessage text={logoutError.data.message} /> : null}
      {isApiError(authError) ? <ErrorMessage text={authError.data.message} /> : null}
      <ButtonComponent htmlType='button' onClick={() => void onClick()} isLoading={isLoading} disabled={isLoading}>Выйти</ButtonComponent>
    </div>
  );
};
