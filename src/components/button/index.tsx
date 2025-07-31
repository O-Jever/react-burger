import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, PropsWithChildren } from 'react';

import { PropsFromFC } from '@/types/utils';

import './styles.css';

type ButtonComponentProps = PropsFromFC<typeof Button> & {
  isLoading: boolean;
};

export const ButtonComponent: FC<PropsWithChildren<ButtonComponentProps>> = (props) => {
  const { children, isLoading, disabled = false, ...otherProps } = props;

  return (
    <Button disabled={disabled} {...otherProps}>
      {isLoading ? (
        <div className='button-loader-wrapper'>
          <div className='button-loader'></div>
        </div>
      ) : null}
      <span className={isLoading ? 'hide-text' : ''}>{children}</span>
    </Button>
  );
};
