import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FormEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { useLoginMutation } from '@/api/server.api';
import { ButtonComponent } from '@/components/button';
import { useSaveTokens } from '@/hooks/auth-tokens';
import { ErrorMessage } from '@/components/error-message';
import { isApiError } from '@/utils/errors';

import './styles.css';

type LoginForm = {
  email: string;
  password: string;
};

export function LoginPage() {
  const { handleSubmit, control } = useForm<LoginForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { saveTokens } = useSaveTokens();

  const onFormSubmit = async (data: LoginForm) => {
    try {
      const tokens = await login(data).unwrap();
      saveTokens(tokens);
      navigate(state?.from ?? '/');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => void handleSubmit(onFormSubmit)(e);

  return (
    <div className='form-wrapper'>
      <span className='text text_type_main-medium mb-6'>Вход</span>
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value, ref } }) => (
            <Input ref={ref} extraClass='mb-6' type='email' placeholder='E-mail' value={value} onChange={onChange} />
          )}
        />
        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <PasswordInput extraClass='mb-6' placeholder='Пароль' value={value} onChange={onChange} />
          )}
        />
        {isApiError(error) ? <ErrorMessage text={error.data.message} /> : null}
        <ButtonComponent htmlType='submit' isLoading={isLoading}>Войти</ButtonComponent>
      </form>
      <span className='text text_type_main-default text_color_inactive mb-4'>
        Вы — новый пользователь?{' '}
        <NavLink className='login-link' to={'/register'}>
          Зарегистрироваться
        </NavLink>
      </span>
      <span className='text text_type_main-default text_color_inactive'>
        Забыли пароль?
        <NavLink className='login-link' to={'/forgot-password'}>
          {' '}
          Восстановить пароль
        </NavLink>
      </span>
    </div>
  );
}
