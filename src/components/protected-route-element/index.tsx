import { useIsAuthorized } from '@/hooks/auth-tokens';
import { NotFoundPage } from '@/pages/NotFoundPage';
import PropTypes from 'prop-types';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

type ProtectedRouteElementProps = {
  anonymous?: boolean;
};

export const ProtectedRouteElement = ({anonymous = false}: ProtectedRouteElementProps) => {
  const location = useLocation();
  const isAuthorized = useIsAuthorized();

  if (anonymous && isAuthorized) {
    return <NotFoundPage />;
  }

  if (!anonymous && !isAuthorized) {
    return <Navigate to="/login" state={{ from: location.pathname}}/>;
  }

  return <Outlet/>;
};

ProtectedRouteElement.propTypes = {
  anonymous: PropTypes.bool,
};
