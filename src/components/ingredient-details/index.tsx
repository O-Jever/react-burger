import { FC } from 'react';

import { Ingredient } from '@/types/ingredient';

import './styles.css';

const getNutritionValue = (title: string, value: number) => {
  return (
    <div data-cy='nutrition-value' className='nutrition-value'>
      <span className='text text_type_main-small text_color_inactive'>{title}</span>
      <span className='text text_type_digits-default text_color_inactive'>{value}</span>
    </div>
  );
};

type IngredientDetailsProps = {
  ingredient?: Ingredient;
};

export const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
  return ingredient ? (
    <div className='ingredient-detail'>
      <img data-cy='ingredient-detail-image' className='mb-4' src={ingredient.image_large} alt={ingredient.name} />
      <span data-cy='ingredient-detail-name' className='text text_type_main-medium mb-8'>{ingredient.name}</span>
      <div className='ingredient-detail-nutrition-values mb-15'>
        {getNutritionValue('Калории, ккал', ingredient.calories)}
        {getNutritionValue('Белки, г', ingredient.proteins)}
        {getNutritionValue('Жиры, г', ingredient.fat)}
        {getNutritionValue('Углеводы, г', ingredient.carbohydrates)}
      </div>
    </div>
  ) : null;
};
