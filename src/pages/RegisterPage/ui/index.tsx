import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { useRegisterMutation } from '@/api/server.api';
import { ErrorMessage } from '@/components/error-message';
import { SubmitButton } from '@/components/submit-button';
import { useSaveTokens } from '@/hooks/auth-tokens';
import { isApiError } from '@/utils/errors';

type RegisterForm = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage: FC = () => {
  const { control, handleSubmit } = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  const [register, { isLoading, error }] = useRegisterMutation();
  const { saveTokens } = useSaveTokens();

  const onFormSubmit = async (data: RegisterForm) => {
    try {
      const tokens = await register(data).unwrap();
      saveTokens(tokens);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => void handleSubmit(onFormSubmit)(e);

  return (
    <div className='registartion-wrapper'>
      <div className='form-wrapper'>
        <span className='text text_type_main-medium mb-6'>Регистрация</span>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value, ref } }) => (
              <Input ref={ref} extraClass='mb-6' type='text' placeholder='Имя' value={value} onChange={onChange} />
            )}
          />
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
          {isApiError(error) && <ErrorMessage text={error.data.message} />}
          <SubmitButton isLoading={isLoading}>Зарегистрироваться</SubmitButton>
        </form>
        <span className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы?{' '}
          <NavLink className='login-link' to={'/login'}>
            Войти
          </NavLink>
        </span>
      </div>
    </div>
  );
};
