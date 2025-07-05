import { FC, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import { BurgerConstructorEmptyElement } from '@/components/burger-constructor-empty-element';
import { BurgerConstructorFillingItem } from '@/components/burger-constructor-filling-item';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { addFilling } from '@/services/reducers/burger';
import { Ingredient } from '@/types/ingredient';

import './styles.css';

export const BurgerConstructorFillings: FC = () => {
  const { fillings } = useAppSelector((state) => state.burger);
  const dispatch = useAppDispatch();

  const maxSortOrder = useMemo(() => {
    let maxSortOrder = 0;

    fillings.forEach((filling) => {
      const sortOrder = filling.sortOrder ?? 0;

      if (sortOrder > maxSortOrder) {
        maxSortOrder = sortOrder;
      }
    });

    return maxSortOrder;
  }, [fillings]);

  const [, dropTarget] = useDrop({
    accept: 'filling',
    drop(filling: Ingredient) {
      dispatch(addFilling({ ...filling, uuid: uuidv4(), sortOrder: maxSortOrder + 1 }));
    },
  });

  const sortedFillings = useMemo(() => {
    return [...fillings].sort((a, b) => a.sortOrder - b.sortOrder);
  }, [fillings]);

  return (
    <div ref={dropTarget} className='burger-scrollbar burger-constructor-fillings mt-4 mb-4 pr-4'>
      {sortedFillings.length ? (
        sortedFillings.map((filling) => <BurgerConstructorFillingItem key={filling.uuid} filling={filling} />)
      ) : (
        <BurgerConstructorEmptyElement text='Выберите начинку' />
      )}
    </div>
  );
};
