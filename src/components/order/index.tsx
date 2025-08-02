import { FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { Order, OrderStatus } from '@/types/order';
import { useIngredientsByIds } from '@/hooks/ingredients';
import { PriceComponent } from '@/components/price';

import './styles.css';
import { useTotalPrice } from '@/hooks/total-price';

type OrderProps = {
  order: Order;
  showStatus?: boolean;
  onClick: () => void;
};

export const StatusName = {
  [OrderStatus.DONE]: 'Выполнен',
  [OrderStatus.CREATED]: 'Создан',
  [OrderStatus.PENDING]: 'Готовится',
};

export const OrderComponent: FC<OrderProps> = (props) => {
  const { order: { number, status, name, ingredients: ingredientIds, createdAt }, showStatus = false, onClick } = props;

  const ingredients = useIngredientsByIds(ingredientIds);
  const totalPrice = useTotalPrice(ingredients);

  return (
    <div className='order-wrapper p-6 mb-6' onClick={onClick}>
      <div className='order-info mb-6'>
        <span className="text text_type_digits-default">#{number}</span>
        <FormattedDate className="text_color_inactive" date={new Date(createdAt)} />
      </div>
      <p className='text text_type_main-medium mb-2'>{name}</p>
      {showStatus ? (
        <span className={'text text_type_main-small' + (status === OrderStatus.DONE ? ' status-done' : '')}>{StatusName[status]}</span>
      ) : null}
      <div className='order-ingredients-price mt-6'>
        <div className='order-ingredients-wrapper'>
          {ingredients.slice(0, 6).map((ingredient, index) => (
            <div style={{zIndex: ingredients.length - index}} className={'order-ingredient-img-wrapper' + (index > ingredients.length ? '' : '')} key={index}>
              {index === 5 && ingredients.length > 6 ? 
                (<div className='text text_type_main-default count-order-ingredients-wrapper'>
                  <div className='count-order-ingredients order-ingredient-img'>+{ingredients.length - 6}</div>
                </div>) 
                : null
              }
              <img className='order-ingredient-img' src={ingredient?.image_mobile} />
            </div>
          ))}
        </div>
        <PriceComponent price={totalPrice} size='medium' />
      </div>
    </div>
  );
};
