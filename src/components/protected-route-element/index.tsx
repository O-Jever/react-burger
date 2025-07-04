import { useIsAuthorized } from '@/hooks/auth-tokens';
import { NotFoundPage } from '@/pages/NotFoundPage';
import PropTypes from 'prop-types';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

type ProtectedRouteElementProps = {
  forUser: 'guest' | 'auth';
};

export const ProtectedRouteElement = ({forUser}: ProtectedRouteElementProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useIsAuthorized();

  const isAllowed = useMemo(() => {
    return forUser === 'auth' ? !isAuthorized : isAuthorized;
  }, [isAuthorized, forUser]);

  useEffect(() => {
    if (!isAllowed && forUser === 'guest') {
      navigate('/login', {state: {from: location.pathname}});
    }
  }, [isAllowed]);

  return isAllowed ? <Outlet /> : forUser === 'auth' ? <NotFoundPage /> : null;
};

ProtectedRouteElement.propTypes = {
  forUser: PropTypes.oneOf(['guest', 'auth']).isRequired,
};
