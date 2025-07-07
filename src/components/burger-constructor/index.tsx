import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '@/api/server.api';
import { BurgerConstructorBun } from '@/components/burger-constructor-bun';
import { BurgerConstructorFillings } from '@/components/burger-constructor-fillings';
import { Modal } from '@/components/modal';
import { OrderDetails } from '@/components/order-details';
import { useIsAuthorized } from '@/hooks/auth-tokens';
import { useAppSelector, useAppDispatch } from '@/services/hooks';
import { clearBurger } from '@/services/reducers/burger';

import './styles.css';

export const BurgerConstructor: FC = () => {
  const { bun, fillings } = useAppSelector((state) => state.burger);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useIsAuthorized();

  const [createOrder, { data }] = useCreateOrderMutation();

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
      <div className='summary-wrapper pt-10 pr-4'>
        <div className='ingredient-price'>
          <span className='text text_type_digits-medium'>{totalPrice}</span>
          <CurrencyIcon className='icon-medium' type={'primary'} />
        </div>
        <Button
          htmlType='button'
          type='primary'
          size='large'
          disabled={!bun || !fillings.length}
          onClick={() => {
            if (!isAuthorized) {
              return navigate('/login', { state: { from: location.pathname } });
            }
            createOrder({ ingredients: [bun!, ...fillings].map((ingredient) => ingredient._id) });
            setIsModalVisible(true);
          }}
        >
          Oформить заказ
        </Button>
      </div>
      {isModalVisible && data ? (
        <Modal
          onClose={() => {
            setIsModalVisible(false);
            dispatch(clearBurger());
          }}
        >
          <OrderDetails orderId={data?.order.number.toString()} />
        </Modal>
      ) : null}
    </div>
  );
};
