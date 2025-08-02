import { FC, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useCreateOrderMutation } from '@/api/server.api';
import { BurgerConstructorBun } from '@/components/burger-constructor-bun';
import { BurgerConstructorFillings } from '@/components/burger-constructor-fillings';
import { Modal } from '@/components/modal';
import { OrderDetails } from '@/components/order-details';
import { PriceComponent } from '@/components/price';
import { ButtonComponent } from '@/components/button';
import { isAuthorized, useAuthTokens } from '@/hooks/auth-tokens';
import { useAppSelector, useAppDispatch } from '@/services/hooks';
import { clearBurger } from '@/services/reducers/burger';

import './styles.css';

export const BurgerConstructor: FC = () => {
  const { bun, fillings } = useAppSelector((state) => state.burger);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const authTokens = useAuthTokens();

  const [createOrder, { data, isLoading }] = useCreateOrderMutation();

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
        <PriceComponent price={totalPrice} size='medium' />
        <ButtonComponent
          htmlType='button'
          type='primary'
          size='large'
          disabled={!bun || !fillings.length || isLoading}
          onClick={() => {
            if (!isAuthorized(authTokens)) {
              return navigate('/login', { state: { from: location.pathname } });
            }
            createOrder({ ingredients: [bun!, ...fillings].map((ingredient) => ingredient._id), accessToken: authTokens.accessToken });
            setIsModalVisible(true);
          }}
          isLoading={isLoading}
        >
          Oформить заказ
        </ButtonComponent>
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
