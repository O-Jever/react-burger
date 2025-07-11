import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { BurgerConstructorEmptyElement } from '@/components/burger-constructor-empty-element';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setBun } from '@/services/reducers/burger';
import { Ingredient } from '@/types/ingredient';

type BurgerConstructorBunProps = {
  type: 'top' | 'bottom';
};

export const BurgerConstructorBun: FC<BurgerConstructorBunProps> = ({ type }) => {
  const { bun } = useAppSelector((state) => state.burger);
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: 'bun',
    drop(bun: Ingredient) {
      dispatch(setBun({ ...bun, uuid: uuidv4() }));
    },
  });

  return (
    <div ref={dropTarget}>
      {bun ? (
        <ConstructorElement
          extraClass='ml-8'
          type={type}
          isLocked={true}
          text={bun.name + (type === 'top' ? ' (верх)' : ' (низ)')}
          thumbnail={bun.image_mobile}
          price={bun.price}
        />
      ) : (
        <BurgerConstructorEmptyElement text='Выберите булки' type={type} />
      )}
    </div>
  );
};
