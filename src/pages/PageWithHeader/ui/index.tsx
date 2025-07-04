import { Outlet } from 'react-router-dom';

import { AppHeader } from '@/components/app-header';

import './styles.css';

export function PageWithHeader() {
  return (
    <>
      <div className="page-wrapper">
        <AppHeader />
        <div className='outlet-wrapper'>
          <Outlet />
        </div>
      </div>
      <div id="react-modals"></div>
    </>
  );
}