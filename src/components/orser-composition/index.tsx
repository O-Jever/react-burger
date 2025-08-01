import { FC, useEffect, useState } from 'react';
import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

import { StatusName } from '@/components/order';
import { PriceComponent } from '@/components/price';
import { Order, OrderStatus } from '@/types/order';
import { useIngredientsByIds } from '@/hooks/ingredients';
import { useTotalPrice } from '@/hooks/total-price';

import './styles.css';

type OrderCompositionComponentProps = {
  order: Order;
  hideNumber?: boolean;
  className?: string;
};

export const OrderCompositionComponent: FC<OrderCompositionComponentProps> = (props) => {
  const {order: { number, name, status, createdAt }, hideNumber = false, className} = props;
  const [ingredientIds, setIngredients] = useState<string[]>([]);
  const ingredients = useIngredientsByIds(ingredientIds);
  const totalPrice = useTotalPrice(ingredients);

  useEffect(() => {
    if (props.order) {
      setIngredients(props.order.ingredients);
    }
  }, [props.order]);

  return (    
    <div className={'order-composition-page-wrapper ' + className}>
      {hideNumber ? null : (
        <div className='order-composition-page-number mb-10'>
          <p className="text text_type_digits-default">#{number}</p>
        </div>
      )}
      <p className='text text_type_main-medium mb-3'>{name}</p>
      <p className={'text text_type_main-small mb-15' + (status === OrderStatus.DONE ? ' status-done' : '')}>{StatusName[status]}</p>
      <div>
        <p className='text text_type_main-medium mb-6'>Состав:</p>
        <div className='order-composition-page-ingredient-wrapper mb-10 pr-6'>
          {ingredients.map((element, idx) => (
            <div key={idx} className='order-composition-page-ingredient mb-4'>
              <div className='order-composition-page-info-wrapper'>
                <div className='order-composition-img-wrapper'>
                  <img className='order-composition-img' src={element.image_mobile} />
                </div>
                <p className='text text_type_main-default'>{element.name}</p>
              </div>
              <PriceComponent price={`${element.count} x ${element.price}`} />
            </div>
          ))}
        </div>
      </div>
      <div className='order-composition-page-footer'>
        <FormattedDate className='text text_type_main-default text_color_inactive' date={new Date(createdAt)} />
        <PriceComponent price={totalPrice} />
      </div>
    </div>
  );
};
