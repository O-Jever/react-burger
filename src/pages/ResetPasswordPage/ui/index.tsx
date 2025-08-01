import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { FC, FormEvent } from 'react';

import { useResetPasswordMutation } from '@/api/server.api';
import { ButtonComponent } from '@/components/button';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ErrorMessage } from '@/components/error-message';
import { isApiError } from '@/utils/errors';
import { LocationState } from '@/types/location';

type ResetPasswordForm = {
  password: string;
  code: string;
};

export const ResetPasswordPage: FC = () => {
  const { control, handleSubmit } = useForm<ResetPasswordForm>({
    mode: 'onChange',
    defaultValues: {
      password: '',
      code: '',
    },
  });
  const [resetPassword, { isLoading, error }] = useResetPasswordMutation();
  const state: LocationState | undefined = useLocation().state;
  const navigate = useNavigate();

  if (state?.from !== '/forgot-password') {
    return <NotFoundPage />;
  }

  const onFormSubmit = async ({ password, code }: ResetPasswordForm) => {
    try {
      await resetPassword({ password, token: code }).unwrap();
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => void handleSubmit(onFormSubmit)(e);

  return (
    <div className='registartion-wrapper'>
      <div className='form-wrapper'>
        <span className='text text_type_main-medium mb-6'>Восстановление пароля</span>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value } }) => (
              <PasswordInput extraClass='mb-6' placeholder='Введите новый пароль' value={value} onChange={onChange} />
            )}
          />
          <Controller
            control={control}
            name='code'
            render={({ field: { onChange, value, ref } }) => (
              <Input
                ref={ref}
                extraClass='mb-6'
                type='text'
                placeholder='Введите код из письма'
                value={value}
                onChange={onChange}
              />
            )}
          />
          {isApiError(error) && <ErrorMessage text={error.data.message} />}
          <ButtonComponent htmlType='submit' isLoading={isLoading}>Сохранить</ButtonComponent>
        </form>
        <span className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль?{' '}
          <NavLink className='login-link' to={'/login'}>
            Войти
          </NavLink>
        </span>
      </div>
    </div>
  );
};
