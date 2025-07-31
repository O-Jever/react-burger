import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';

import './styles.css';

type PriceProps = {
  price: number | string;
  size?: 'default' | 'medium';
};

export const PriceComponent: FC<PriceProps> = ({price, size = 'default'}) => {
  return (
    <div className='price'>
      <span className={'text text_type_digits-' + size}>{price}</span>
      <CurrencyIcon className={size === 'medium' ? 'icon-medium' : ''} type={'primary'} />
    </div>
  );
};
