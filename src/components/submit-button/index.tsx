import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, PropsWithChildren } from 'react';

import './styles.css';

type SubmitButtonProps = {
  isLoading: boolean;
  disabled?: boolean;
};

export const SubmitButton: FC<PropsWithChildren<SubmitButtonProps>> = (props) => {
  const { children, isLoading, disabled = false } = props;

  return (
    <Button htmlType={'submit'} type='primary' disabled={disabled}>
      {isLoading ? (
        <div className='loader-wrapper'>
          <div className='loader'></div>
        </div>
      ) : null}
      <span className={isLoading ? 'hide-text' : ''}>{children}</span>
    </Button>
  );
};
