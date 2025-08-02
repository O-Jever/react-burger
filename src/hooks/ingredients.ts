import { OrderIngredient } from '@/types/ingredient';
import { useGetIngredientsQuery } from '@/api/server.api';
import { useMemo } from 'react';

export function useIngredientsByIds(ingredientIds: string[]): OrderIngredient[] {
  const { data: ingredientsList = [] } = useGetIngredientsQuery();

  return useMemo(() => {
    return Object.values(ingredientIds.reduce<Record<string, OrderIngredient>>((acc, ingredientId) => {
      if (!acc[ingredientId]) {
        const ingredient = ingredientsList.find((ingredient) => ingredient._id === ingredientId);

        if (ingredient) {
          acc[ingredientId] = {
            ...ingredient,
            count: 0
          }
        }
      }

      if (acc[ingredientId]) {
        acc[ingredientId].count++;
      }

      return acc;
    }, {}));
  }, [ingredientIds, ingredientsList]);
}