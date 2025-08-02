import { Logo, BurgerIcon, ListIcon, ProfileIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import './styles.css';

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActiveRoute = (route: RegExp) => {
    return route.test(location.pathname);
  };

  const getActiveClass = (route: RegExp) => {
    return isActiveRoute(route) ? 'header-button-active' : 'text_color_inactive';
  };

  const getActiveButtonType = (route: RegExp) => {
    return isActiveRoute(route) ? 'primary' : 'secondary';
  };

  return (
    <header className='text ml-10 mr-10 mt-10 pt-4 pb-4 app-header'>
      <div className='app-header-content'>
        <div className='app-header-menu'>
          <Button
            htmlType='button'
            type='secondary'
            extraClass={`header-buttons pl-5 pr-5 mr-2 text text_type_main-default ${getActiveClass(
              /(^\/ingredients)|(^\/$)/
            )}`}
            onClick={() => navigate('/')}
          >
            <BurgerIcon type={getActiveButtonType(/(^\/ingredients)|(^\/$)/)} />
            Конструктор
          </Button>
          <Button
            htmlType='button'
            type='secondary'
            extraClass={`header-buttons pl-5 pr-5 text text_type_main-default ${getActiveClass(/^\/feed/)}`}
            onClick={() => navigate('/feed')}
          >
            <ListIcon type={getActiveButtonType(/^\/feed/)} />
            Лента заказов
          </Button>
        </div>
        <div className='app-header-logo' onClick={() => navigate('/')}>
          <Logo />
        </div>
        <Button
          htmlType='button'
          type='secondary'
          extraClass={`header-buttons pl-30 pr-5 text text_type_main-default ${getActiveClass(/^\/profile/)}`}
          onClick={() => navigate('/profile')}
        >
          <ProfileIcon type={getActiveButtonType(/^\/profile/)} />
          Личный кабинет
        </Button>
      </div>
    </header>
  );
};
