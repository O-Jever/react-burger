import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { useGetOrderMutation } from '@/api/server.api';
import { StatusName } from '@/components/order';
import { PriceComponent } from '@/components/price';
import { Order, OrderStatus } from '@/types/order';
import { useIngredientsByIds } from '@/hooks/ingredients';
import { useTotalPrice } from '@/hooks/total-price';
import { NotFoundPage } from '@/pages/NotFoundPage';

import './styles.css';

export const OrderDetailPage: FC = () => {
  const { id } = useParams<string>() as { id: string };
  const [getOrder, { isLoading}] = useGetOrderMutation();
  const {state} = useLocation();
  const [order, setOrder] = useState<Order>();
  const [ingredientIds, setIngredients] = useState<string[]>([]);
  const ingredients = useIngredientsByIds(ingredientIds);
  const totalPrice = useTotalPrice(ingredients);

  useEffect(() => {
    if (state && state.order) {
      setOrder(state.order);
    } else {
      getOrder({id}).then((response) => {
        setOrder(response.data);
      });
    }
  },[]);

  useEffect(() => {
    if (order) {
      setIngredients(order.ingredients);
    }
  }, [order]);

  if (!order) {
    return isLoading ? <div/> : <NotFoundPage />;
  }

  const { number, name, status, createdAt } = order;

  return (
    <div className='order-detail-page-wrapper'>
      <div className='order-detail-page-number mb-10'>
        <p className="text text_type_digits-default">#{number}</p>
      </div>
      <p className='text text_type_main-medium mb-3'>{name}</p>
      <p className={'text text_type_main-small mb-15' + (status === OrderStatus.DONE ? ' status-done' : '')}>{StatusName[status]}</p>
      <div>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <div className='order-detail-page-ingredient-wrapper mb-10 pr-6'>
          {ingredients.map((element, idx) => (
            <div key={idx} className='order-detail-page-ingredient mb-4'>
              <div className='order-detail-page-info-wrapper'>
                <div className='order-detail-img-wrapper'>
                  <img className='order-detail-img' src={element.image_mobile} />
                </div>
                <p className='text text_type_main-default'>{element.name}</p>
              </div>
              <PriceComponent price={`${element.count} x ${element.price}`} />
            </div>
          ))}
        </div>
      </div>
      <div className='order-detail-page-footer'>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
        <PriceComponent price={totalPrice} />
      </div>
    </div>
  );
};
