import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

import { useAppDispatch } from '../../services/hooks';
import { BurgerIngredientWithSortOrder, removeFilling, setNewSortOrder } from '../../services/reducers/burger';
import { BurgerIngredientWithSortOrderPropTypes } from '../../utils/prop-types';

import './styles.css';

type BurgerConstructorFillingItemProps = {
    filling: BurgerIngredientWithSortOrder;
};

export const BurgerConstructorFillingItem = ({ filling }: BurgerConstructorFillingItemProps) => {
    const dispatch = useAppDispatch();

    const [, dragRef, dragPreview] = useDrag({
        type: 'sort-filling',
        item: filling
    });

    const [, dropTarget] = useDrop({
        accept: 'sort-filling',
        drop(movedFilling: BurgerIngredientWithSortOrder) {
            dispatch(setNewSortOrder({ uuid: movedFilling.uuid, newSortOrder: filling.sortOrder }));
        },
    });

    return (
        <div ref={(node) => dragPreview(dropTarget(node))} className='burger-constructor-filling'>
            <div className='drag-icon' ref={dragRef}>
                <DragIcon type="primary" />
            </div>
            <ConstructorElement
                extraClass='ml-2'
                text={filling.name} 
                thumbnail={filling.image_mobile} 
                price={filling.price}
                handleClose={() => dispatch(removeFilling(filling))}
            />
        </div>
    );
};

BurgerConstructorFillingItem.propTypes = {
    filling: BurgerIngredientWithSortOrderPropTypes.isRequired,
};
