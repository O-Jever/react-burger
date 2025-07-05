import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, FormEvent, useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useGetUserQuery, useUpdateUserMutation } from '@/api/server.api';
import { ErrorMessage } from '@/components/error-message';
import { SubmitButton } from '@/components/submit-button';
import { useAuthTokens } from '@/hooks/auth-tokens';
import { isApiError } from '@/utils/errors';

import './styles.css';

type UserEditForm = {
  name: string;
  email: string;
  password: string;
};

export const EditUserPage: FC = () => {
  const { accessToken, error: authError } = useAuthTokens();
  const { data, error: getUserError } = useGetUserQuery({ accessToken });
  const [updateUser, { isLoading, error: updateUserError }] = useUpdateUserMutation();
  const [changingFields, setChangingFields] = useState({
    name: false,
    email: false,
    password: false,
  });

  const { getValues, control, handleSubmit, setValue } = useForm<UserEditForm>({
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      email: '',
      password: '******',
    },
  });
  const changingForm = useMemo(() => {
    let changing = false;

    for (const fieldChanging of Object.values(changingFields)) {
      changing = changing || fieldChanging;
    }

    return changing;
  }, [changingFields]);

  const isFieldChanged = (field: 'name' | 'email' | 'password') => {
    return changingFields[field] && Boolean(getValues(field));
  };

  useEffect(() => {
    changingFields['password'] ? setValue('password', '') : setValue('password', '******');
    if (!changingFields['name']) setValue('name', data?.user.name ?? '');
    if (!changingFields['email']) setValue('email', data?.user.email ?? '');
  }, [changingFields, data]);

  useEffect(() => {
    if (data) {
      setValue('name', data.user.name);
      setValue('email', data.user.email);
    }
  }, [data]);

  const onFormSubmit = async (data: UserEditForm) => {
    const formData = {
      accessToken,
      ...(isFieldChanged('name') ? { name: data.name } : {}),
      ...(isFieldChanged('email') ? { email: data.email } : {}),
      ...(isFieldChanged('password') ? { password: data.password } : {}),
    };

    try {
      await updateUser(formData).unwrap();
    } catch (err) {
      console.error(err);
    }

    resetFields();
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => void handleSubmit(onFormSubmit)(e);

  const resetFields = () => {
    setValue('name', data?.user.name || '');
    setValue('email', data?.user.email || '');
    setChangingFields({
      name: false,
      email: false,
      password: false,
    });
  };

  return (
    <>
      {isApiError(getUserError) && <ErrorMessage text={getUserError.data.message} />}
      {data ? (
        <form className='ml-15' onSubmit={onSubmit}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, value, ref } }) => (
              <Input
                ref={ref}
                extraClass='mb-6'
                type='text'
                icon='EditIcon'
                onIconClick={() => setChangingFields({ ...changingFields, name: !changingFields['name'] })}
                disabled={!changingFields['name']}
                placeholder='Имя'
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value, ref } }) => (
              <Input
                ref={ref}
                extraClass='mb-6'
                type='email'
                icon='EditIcon'
                onIconClick={() => setChangingFields({ ...changingFields, email: !changingFields['email'] })}
                disabled={!changingFields['email']}
                placeholder='E-mail'
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value, ref } }) => (
              <Input
                ref={ref}
                extraClass='mb-6'
                type='password'
                placeholder='Пароль'
                icon='EditIcon'
                onIconClick={() => setChangingFields({ ...changingFields, password: !changingFields['password'] })}
                disabled={!changingFields['password']}
                value={value}
                onChange={onChange}
              />
            )}
          />
          {isApiError(authError) && <ErrorMessage text={authError.data.message} />}
          {isApiError(updateUserError) && <ErrorMessage text={updateUserError.data.message} />}
          {changingForm ? (
            <div className='user-edit-buttons'>
              <Button htmlType='reset' onClick={() => resetFields()}>
                Отменить
              </Button>
              <SubmitButton isLoading={isLoading}>Сохранить</SubmitButton>
            </div>
          ) : null}
        </form>
      ) : null}
    </>
  );
};
