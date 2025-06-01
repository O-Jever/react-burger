import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';

import { Modal } from '../modal';
import { OrderDetails } from '../order-details';
import { useAppDispatch, useAppSelector } from '../../services/hooks';
import { BurgerConstructorBun } from '../burger-constructor-bun';
import { BurgerConstructorFillings } from '../burger-constructor-fillings';
import { useCreateOrderMutation } from '../../api/server.api';
import { clearBurger } from '../../services/reducers/burger';

import './styles.css';

export const BurgerConstructor = () => {
    const {bun, fillings} = useAppSelector(state => state.burger);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useAppDispatch();

    const [createOrder, {data}] = useCreateOrderMutation();

    const totalPrice = useMemo(() => {
        return (bun ? bun.price * 2 : 0) + fillings.reduce((sum, filling) => sum + filling.price, 0);
    }, [bun, fillings]);

    return (
        <div className='burger-constructor-container pt-25 pl-4'>
            <div>
                <BurgerConstructorBun type='top' />
                <BurgerConstructorFillings />
                <BurgerConstructorBun type='bottom' />
            </div>
            <div className='summary-wrapper pt-10'>
                <div className='ingredient-price'>
                    <span className='text text_type_digits-medium'>{totalPrice}</span>
                    <CurrencyIcon className='icon-medium' type={"primary"}/>
                </div>
                <Button
                    htmlType="button"
                    type="primary"
                    size="large"
                    disabled={!bun || !fillings.length}
                    onClick={() => {
                        createOrder({ingredients: [bun!, ...fillings].map((ingredient) => ingredient._id)});
                        setIsModalVisible(true);
                    }
                }>
                    Oформить заказ
                </Button>
            </div>
            {isModalVisible && data ? (
                <Modal onClose={() => {
                    setIsModalVisible(false);
                    dispatch(clearBurger());
                }}>
                    <OrderDetails orderId={data?.order.number.toString()} />
                </Modal>
            ) : null}
        </div>
    );
};
