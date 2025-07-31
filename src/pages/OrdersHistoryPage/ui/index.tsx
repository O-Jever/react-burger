import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetUserOrdersQuery } from '@/api/server.api';
import { OrderComponent } from '@/components/order';
import { useAuthTokens } from '@/hooks/auth-tokens';
import { Order } from '@/types/order';

import './styles.css';

export const OrdersHistoryPage: FC = () => {
  const {accessToken} = useAuthTokens();
  const { data } = useGetUserOrdersQuery({token: (accessToken ?? '').split(' ')[1]});
  const navigate = useNavigate();

  const goToOrder = (order: Order) => {
    void navigate(`/profile/orders/${order._id}`, {state: {order}});
  };

  return (
    <div className='orders-history-wrapper mt-10 ml-15'>
      {data?.orders.length ? (
        data?.orders.map((order) => (
          <OrderComponent key={order._id} order={order} onClick={() => goToOrder(order)} showStatus={true} />
        ))
      ) : (<p className='text text_type_main-medium mt-20'>Заказов нет</p>)}
      {}
    </div>
  );
};
