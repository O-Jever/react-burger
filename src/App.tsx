import { Route, Routes, useLocation } from 'react-router-dom';

import { NotFoundPage } from '@/pages/NotFoundPage';
import { PageWithHeader } from '@/pages/PageWithHeader/ui';
import { MainPage } from '@/pages/Main';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { IngredientPage } from '@/pages/IngredientPage';
import { EditUserPage } from '@/pages/EditUserPage';
import { LogoutPage } from '@/pages/LogoutPage';
import { ProtectedRouteElement } from '@/components/protected-route-element';

export function App() {
  const { state } = useLocation();

  return (
    <Routes>
      <Route element={<PageWithHeader />}>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<MainPage />}>
          {state?.modal && <Route path='ingredients/:id' element={<IngredientPage />} />}
        </Route>
        <Route path='/ingredients/:id' element={<IngredientPage />} />
        <Route element={<ProtectedRouteElement anonymous={true} />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ProtectedRouteElement />}>
          <Route path='/profile' element={<ProfilePage />}>
            <Route index={true} element={<EditUserPage />} />
            <Route path='logout' element={<LogoutPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
