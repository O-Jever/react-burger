import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useForgotPasswordMutation } from '@/api/server.api';
import { SubmitButton } from '@/components/submit-button';
import { ErrorMessage } from '@/components/error-message';
import { isApiError } from '@/utils/errors';

type ForgotPasswordForm = {
  email: string;
}

export const ForgotPasswordPage: FC = () => {
  const { control, handleSubmit } = useForm<ForgotPasswordForm>({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const onFormSubmit = async (data: ForgotPasswordForm) => {
    try {
      await forgotPassword(data).unwrap();
      navigate('/reset-password', {state: {from: location.pathname}});
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => void handleSubmit(onFormSubmit)(e);

  return (
    <div className='registartion-wrapper'>
      <div className='form-wrapper'>
        <span className="text text_type_main-medium mb-6">Восстановление пароля</span>
        <form onSubmit={onSubmit}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value, ref }, fieldState: {invalid, error} }) => (
              <Input
                ref={ref}
                extraClass='mb-6'
                type='email'
                placeholder='Укажите e-mail'
                value={value}
                onChange={onChange}
                error={invalid}
                errorText={error?.message}
              />
            )}
          />
          {isApiError(error) && <ErrorMessage text={error.data.message} />}
          <SubmitButton isLoading={isLoading}>Восстановить</SubmitButton>
        </form>
        <span className="text text_type_main-default text_color_inactive">Вспомнили пароль? <NavLink className='login-link' to={'/login'}>Войти</NavLink></span>
      </div>
    </div>
  );
};
