import { Ingredient } from '../../types/ingredient';
import { IngredientPropTypes } from '../../utils/prop-types';

import './styles.css';

type IngredientDetailsProps = {
    ingredient: Ingredient;
};

const getNutritionValue = (title: string, value: number) => {
    return (
        <div className='nutrition-value'>
            <span className='text text_type_main-small text_color_inactive'>{title}</span>
            <span className='text text_type_digits-default text_color_inactive'>{value}</span>
        </div>
    );
};

export const IngredientDetails = ({ ingredient }: IngredientDetailsProps) => {
    const {image_large, name} = ingredient;

    return (
        <div className='ingredient-detail'>
            <img className='mb-4' src={image_large} alt={name} />
            <span className='text text_type_main-medium mb-8'>{name}</span>
            <div className='ingredient-detail-nutrition-values mb-15'>
                {getNutritionValue('Калории, ккал', ingredient.calories)}
                {getNutritionValue('Белки, г', ingredient.proteins)}
                {getNutritionValue('Жиры, г', ingredient.fat)}
                {getNutritionValue('Углеводы, г', ingredient.carbohydrates)}
            </div>
        </div>
    );
};

IngredientDetails.propTypes = {
    ingredient: IngredientPropTypes.isRequired
};
