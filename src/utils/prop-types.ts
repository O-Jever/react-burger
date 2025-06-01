import PropTypes from 'prop-types';

const commonIngredientProps = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['bun', 'main', 'sauce']).isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
};

export const IngredientPropTypes = PropTypes.shape(commonIngredientProps);

export const BurgerIngredientWithSortOrderPropTypes = PropTypes.shape({
    ...commonIngredientProps,
    uuid: PropTypes.string.isRequired,
    sortOrder: PropTypes.number.isRequired
})

export const CartPropTypes = PropTypes.shape({
    bun: IngredientPropTypes,
    fillings: PropTypes.arrayOf(IngredientPropTypes)
});
