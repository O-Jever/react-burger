import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrag } from 'react-dnd';

import { Ingredient } from '@/types/ingredient';

import './styles.css';

type IngredientComponentProps = {
  ingredient: Ingredient;
  count?: number;
  onClick?: () => void;
};

export const IngredientComponent: FC<IngredientComponentProps> = ({ ingredient, count, onClick }) => {
  const { name, price, image, type } = ingredient;

  const [, dragRef] = useDrag({
    type: type === 'bun' ? 'bun' : 'filling',
    item: ingredient,
  });

  return (
    <div ref={dragRef} className='ingredient' onClick={onClick}>
      {count ? <Counter count={count} size='default' extraClass='m-1' /> : null}

      <img className='pr-4 pl-4' src={image} alt={name} />
      <div className='ingredient-price'>
        <span className='text text_type_digits-default'>{price}</span>
        <CurrencyIcon type={'primary'} />
      </div>
      <span className='text text_type_main-default ingredient-name'>{name}</span>
    </div>
  );
};
