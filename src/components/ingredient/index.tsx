import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { Ingredient } from '../../types/ingredient';
import { IngredientPropTypes } from '../../utils/prop-types';

import './styles.css';
import { useDrag } from 'react-dnd';

type IngredientComponentProps = {
    ingredient: Ingredient;
    count?: number;
    onClick?: () => void;
};

export const IngredientComponent = ({ ingredient, count, onClick }: IngredientComponentProps) => {
    const { name, price, image, type } = ingredient;

    const [, dragRef] = useDrag({
        type: type === 'bun' ? 'bun' : 'filling',
        item: ingredient
    });

    return (
        <div ref={dragRef} className='ingredient' onClick={onClick}>
            { count ? <Counter count={count} size="default" extraClass="m-1" /> : null }
            
            <img className='pr-4 pl-4' src={image} alt={name} />
            <div className='ingredient-price'>
                <span className='text text_type_digits-default'>{price}</span>
                <CurrencyIcon type={"primary"}/>
            </div>
            <span className='text text_type_main-default ingredient-name'>{name}</span>
        </div>
    );
}

IngredientComponent.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
    count: PropTypes.number,
    onClick: PropTypes.func
};