import { useMemo } from 'react';

import { OrderIngredient } from '@/types/ingredient';

export const useTotalPrice = (ingredients: OrderIngredient[]) => {
  return useMemo(() => {
    return ingredients.reduce((sum: number, ingredient: OrderIngredient) => {
      return sum + (ingredient ? ingredient.price * ingredient.count : 0);
    }, 0);
  }, [ingredients]);
};
