import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useIsAuthorized } from '@/hooks/auth-tokens';
import { NotFoundPage } from '@/pages/NotFoundPage';

type ProtectedRouteElementProps = {
  anonymous?: boolean;
};

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ anonymous = false }) => {
  const location = useLocation();
  const isAuthorized = useIsAuthorized();

  if (anonymous && isAuthorized) {
    return <NotFoundPage />;
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to='/login' state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
