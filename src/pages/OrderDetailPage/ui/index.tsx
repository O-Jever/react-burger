import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useGetOrderQuery } from '@/api/server.api';
import { OrderCompositionComponent } from '@/components/orser-composition';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const OrderDetailPage: FC = () => {
  const { num } = useParams<string>() as { num: string };
  const { data: order, isLoading} = useGetOrderQuery({num});

  if (!order) {
    return isLoading ? null : <NotFoundPage />;
  }

  return (
    <OrderCompositionComponent order={order} />
  );
};
