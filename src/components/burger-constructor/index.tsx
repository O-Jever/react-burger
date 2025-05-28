import { ConstructorElement, DragIcon, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { Modal } from '../modal';
import { OrderDetails } from '../order-details';
import { Ingredient } from '../../types/ingredient';
import { IngredientPropTypes } from '../../utils/prop-types';

import './styles.css';

type BurgerConstructorProps = {
    bun?: Ingredient;
    fillings?: Ingredient[];
};

const getEmptyElement = (text: string, type?: 'top' | 'bottom') => {
    const additionalClass = type
        ? type === 'top' ? 'constructor-element_pos_top' : 'constructor-element_pos_bottom'
        : '';

    return (
        <div className={`ml-8 ${additionalClass}`}>
            <span className='empty-constructor-element'>{text}</span>
        </div>
    );
};

const getBunElement = (type: 'top' | 'bottom', ingredient?: Ingredient) => {
    if (!ingredient) {
        return getEmptyElement('Выберите булки', type);
    }

    return (
        <ConstructorElement 
            extraClass='ml-8'
            type={type}
            isLocked={true} 
            text={ingredient.name + (type === 'top' ? ' (верх)' : ' (низ)')} 
            thumbnail={ingredient.image_mobile} 
            price={ingredient.price} 
        />
    );
};

const getFillingsElement = (ingredients: Ingredient[]) => {
    if (!ingredients.length) {
        return getEmptyElement('Выберите начинку');
    }

    return ingredients.map((ingredient) => 
        <div className='burger-constructor-filling' key={ingredient._id}>
            <DragIcon type="primary" />
            <ConstructorElement
                extraClass='ml-2'
                text={ingredient.name} 
                thumbnail={ingredient.image_mobile} 
                price={ingredient.price} 
            />
        </div>
    );
};

export const BurgerConstructor = ({ bun, fillings = [] }: BurgerConstructorProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const totalPrice = useMemo(() => {
        return (bun ? bun.price : 0) + fillings.reduce((sum, filling) => sum + filling.price, 0);
    }, [bun, fillings]);

    return (
        <div className='burger-constructor-container pt-25 pl-4'>
            <div>
                { getBunElement('top', bun) }
                <div className='burger-scrollbar burger-constructor-fillings mt-4 mb-4 pr-4'>
                    { getFillingsElement(fillings) }
                </div>
                { getBunElement('bottom', bun) }
            </div>
            <div className='summary-wrapper pt-10'>
                <div className='ingredient-price'>
                    <span className='text text_type_digits-medium'>{totalPrice}</span>
                    <CurrencyIcon className='icon-medium' type={"primary"}/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={() => {
                    setIsModalVisible(true)
                }}>
                    Oформить заказ
                </Button>
            </div>
            {isModalVisible ? (
                <Modal onClose={() => {setIsModalVisible(false)}}>
                    <OrderDetails orderId={'034536'} />
                </Modal>
            ) : null}
        </div>
    );
};

BurgerConstructor.propTypes = {
    bun: IngredientPropTypes,
    fillings: PropTypes.arrayOf(IngredientPropTypes)
}