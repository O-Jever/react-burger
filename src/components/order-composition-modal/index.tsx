import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Modal } from '@/components/modal';
import { OrderCompositionComponent } from '@/components/orser-composition';
import { Order } from '@/types/order';

export const OrderCompositionModal: FC = () => {
  const order = useLocation().state?.order as Order;
  const navigate = useNavigate();

  return (
    <Modal
      title={
        <p className="text text_type_digits-default">#{order.number}</p>
      } 
      onClose={() => void navigate(-1)}>
      <OrderCompositionComponent className={'mb-10'} order={order} hideNumber={true} />
    </Modal>
  );
};
