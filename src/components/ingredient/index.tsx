import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { IngredientDetails } from '../ingredient-details';
import { Modal } from '../modal';
import { Ingredient } from '../../types/ingredient';
import { IngredientPropTypes } from '../../utils/prop-types';

import './styles.css';

type IngredientComponentProps = {
    ingredient: Ingredient;
    count?: number;
};

export const IngredientComponent = ({ ingredient, count }: IngredientComponentProps) => {
    const { name, price, image } = ingredient;

    const [isModalVisible, showModal] = useState(false);

    return (
        <>
            <div className='ingredient' onClick={() => showModal(true)}>
                { count ? <Counter count={count} size="default" extraClass="m-1" /> : null }
                
                <img className='pr-4 pl-4' src={image} alt={name} />
                <div className='ingredient-price'>
                    <span className='text text_type_digits-default'>{price}</span>
                    <CurrencyIcon type={"primary"}/>
                </div>
                <span className='text text_type_main-default ingredient-name'>{name}</span>
            </div>
            {isModalVisible ? (
                <Modal
                    title='Детали ингредиента'
                    onClose={() => {showModal(false)}}
                >
                    <IngredientDetails ingredient={ingredient}/>
                </Modal>
            ) : null}
        </>
    );
}

IngredientComponent.propTypes = {
    ingredient: IngredientPropTypes.isRequired,
    count: PropTypes.number
};