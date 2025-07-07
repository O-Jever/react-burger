import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/api/server.api';
import { useAuthTokens, useResetTokens } from '@/hooks/auth-tokens';
import { ErrorMessage } from '@/components/error-message';
import { isApiError } from '@/utils/errors';

import './styles.css';

export const LogoutPage: FC = () => {
  const [logout, { error: logoutError }] = useLogoutMutation();
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
    <div className='logout'>
      <span className='text text_type_main-default text_color_inactive'>Вы действительно хотите выйти?</span>
      {isApiError(logoutError) ? <ErrorMessage text={logoutError.data.message} /> : null}
      {isApiError(authError) ? <ErrorMessage text={authError.data.message} /> : null}
      <Button htmlType='button' onClick={() => void onClick()}>
        Выйти
      </Button>
    </div>
  );
};
