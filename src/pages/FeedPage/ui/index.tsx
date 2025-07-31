import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetOrdersAllQuery } from '@/api/server.api';
import { LoaderComponent } from '@/components/loader';
import { OrderComponent } from '@/components/order';
import { Order, OrderStatus } from '@/types/order';

import './styles.css';

export const FeedPage: FC = () => {
  const { data } = useGetOrdersAllQuery();
  const navigate = useNavigate();

  const goToOrder = (order: Order) => {
    void navigate(`/feed/${order._id}`, { state: { order } });
  };

  const ordersDone = useMemo(() => {
    return data?.orders.filter((order) => order.status === OrderStatus.DONE).slice(0, 10);
  }, [data?.orders]);

  const ordersInWork = useMemo(() => {
    return data?.orders.filter((order) => [OrderStatus.CREATED, OrderStatus.PENDING].includes(order.status)).slice(0, 10);
  }, [data?.orders]);

  return (<>
    {!data?.orders.length ? (
        <LoaderComponent />
      ) : (
        <div className='feed-page-wrapper'>
          <p className='text text_type_main-large pt-10 pb-5'>Лента заказов</p>
          <div className='feed-content-wrapper'>
            <div className='feed-list-wrapper'>
              {data?.orders.map((order) => (
                <OrderComponent key={order._id} order={order} onClick={() => goToOrder(order)} />
              ))}
            </div>
            <div className='feed-info-wrapper ml-15'>
              <div className='feed-number-lists mb-15'>
                <div className='feed-number-lists-done-wrapper'>
                  <p className='text text_type_main-medium pb-6'>Готовы:</p>
                  <div className='text text_type_main-medium feed-number-lists-done'>
                    {ordersDone?.map((order) => (
                      <span key={order._id}>{order.number}</span>
                    ))}
                  </div>
                </div>
                <div className='feed-number-lists-in-work-wrapper'>
                  <p className='text text_type_main-medium pb-6'>В работе:</p>
                  <div className='text text_type_main-medium feed-number-lists-in-work'>
                    {ordersInWork?.map((order) => (
                      <span key={order._id}>{order.number}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className='mb-15'>
                <p className='text text_type_main-medium'>Выполнено за все время:</p>
                <span className='text text_type_digits-large text-glow'>{data?.total}</span>
              </div>
              <div>
                <p className='text text_type_main-medium'>Выполнено за сегодня:</p>
                <span className='text text_type_digits-large text-glow '>{data?.totalToday}</span>
              </div>
            </div>
          </div>
        </div>
      )}
  </>);
};
