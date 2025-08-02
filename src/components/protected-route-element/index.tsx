import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAuthTokens, isAuthorized } from '@/hooks/auth-tokens';
import { NotFoundPage } from '@/pages/NotFoundPage';

type ProtectedRouteElementProps = {
  anonymous?: boolean;
};

export const ProtectedRouteElement: FC<ProtectedRouteElementProps> = ({ anonymous = false }) => {
  const location = useLocation();
  const tokens = useAuthTokens();

  if (anonymous && isAuthorized(tokens)) {
    return <NotFoundPage />;
  }

  if (!anonymous && !isAuthorized(tokens)) {
    return <Navigate to='/login' state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};
