import { FC } from 'react';

import doneImg from '@/images/done.svg';

import './styles.css';

type OrderDetailsProps = {
  orderId: string;
};

export const OrderDetails: FC<OrderDetailsProps> = ({ orderId }) => {
  return (
    <div className='order-detail'>
      <span className='text text_type_digits-large mt-4 mb-8'>{orderId}</span>
      <span className='text text_type_main-medium mb-15'>идентификатор заказа</span>
      <img className='mb-15' src={doneImg} alt='done' />
      <span className='text text_type_main-default mb-2'>Ваш заказ начали готовить</span>
      <span className='text text_type_main-default text_color_inactive mb-30'>
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
};
