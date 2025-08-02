import { FC } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import './styles.css';

export const ProfilePage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const makeNavigationButton = (path: string, text: string) => {
    return (
      <li className={path === location.pathname ? '' : 'text_color_inactive'} onClick={() => navigate(path)}>
        {text}
      </li>
    );
  };

  return (
    <div className='profile-wrapper'>
      <div className='profile'>
        <div className='mt-30'>
          <ul className='text text_type_main-medium profile-navigation'>
            {makeNavigationButton('/profile', 'Профиль')}
            {makeNavigationButton('/profile/orders', 'История заказов')}
            {makeNavigationButton('/profile/logout', 'Выход')}
          </ul>
          <span className='text text_type_main-default text_color_inactive mt-20 hint'>
            В этом разделе вы можете изменить свои персональные данные
          </span>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
