import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import { useLogoutMutation } from '@/api/server.api';
import { useAuthTokens, useResetTokens } from '@/hooks/auth-tokens';
import { ErrorMessage } from '@/components/error-message';
import { ApiError } from '@/types/api';

import './styles.css';

export function LogoutPage() {
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
      {logoutError && 'data' in logoutError ? <ErrorMessage text={(logoutError.data as ApiError).message} /> : null}
      {authError && 'data' in authError ? <ErrorMessage text={(authError.data as ApiError).message} /> : null}
      <Button htmlType='button' onClick={() => void onClick()}>
        Выйти
      </Button>
    </div>
  );
}
