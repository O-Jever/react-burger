import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

import { IngredientComponent } from '../ingredient';
import { Cart } from '../../types/cart';
import { Ingredient, IngredientType } from '../../types/ingredient';
import { CartPropTypes, IngredientPropTypes } from '../../utils/prop-types';

import './styles.css';

const BUN = "bun";
const SAUCE = "sauce";
const MAIN = "main";

const INGREDIENT_TYPES = [BUN, SAUCE, MAIN] as const;

type GroupedIngredients= {
    [BUN]: Ingredient[];
    [MAIN]: Ingredient[];
    [SAUCE]: Ingredient[];
};

type BurgerIngredientsProps = {
    ingredients: Ingredient[];
    cart: Cart;
};

export const BurgerIngredients = ({ ingredients, cart }: BurgerIngredientsProps) => {
    const [currentTab, setCurrentTab] = useState<string>(BUN);

    const groupedIngredients = useMemo(() => 
        ingredients.reduce<GroupedIngredients>((acc, item) => {
            acc[item.type].push(item);
             return acc;
        }, { [BUN]: [], [MAIN]: [], [SAUCE]: [] })
    , [ingredients]); 

    const isActive = (value: string): boolean => {
        return currentTab === value; 
    };

    const getTitleByType = (type: IngredientType) => {
        switch (type) {
            case MAIN:
                return 'Начинки';
            case SAUCE:
                return 'Соусы'
            case BUN:
                return 'Булки';
            default:
                return '';
        }
    }

    const getCountInCart = (ingredient: Ingredient) => {
        if (ingredient.type === BUN) {
            return cart.bun?._id === ingredient._id ? 1 : 0;
        }

        return (cart.fillings ?? []).reduce((sum, filling) => {
            if (filling._id === ingredient._id) {
                sum++;
            }

            return sum;
        }, 0);
    };

    return (
        <div className='burger-ingredients mr-10'>
           <div className='mt-10 mb-10' >
               <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
               <div style={{ display: 'flex' }}>
                    {INGREDIENT_TYPES.map(type => {
                        return (
                            <Tab key={type} value={type} active={isActive(type)} onClick={setCurrentTab}>
                                {getTitleByType(type)}
                            </Tab>
                        );
                    })}
                </div>
           </div>
            <section className='burger-ingredients-container burger-scrollbar'>
                {INGREDIENT_TYPES.map((type) => {
                    return (
                        <div key={type}>
                            <h2 className='text text_type_main-medium'>{getTitleByType(type)}</h2>
                            <div className='pt-6 pb-10 pr-4 pl-4 ingredients-wrapper'>
                                {groupedIngredients[type].map((ingredient) => {
                                    return (
                                        <IngredientComponent
                                            ingredient={ingredient}
                                            count={getCountInCart(ingredient)}
                                            key={ingredient._id}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

BurgerIngredients.propTypes = {
    cart: CartPropTypes.isRequired,
    ingredients: PropTypes.arrayOf(IngredientPropTypes).isRequired
};