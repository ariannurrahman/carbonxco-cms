import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from 'pages/auth/login';
import { AuthLayout } from 'layout/AuthLayout';

export const AuthRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<AuthLayout />}>
          <Route path='login' element={<Login />} />

          <Route path='' element={<Navigate to='/auth/login' />} />
          <Route path='*' element={<p>Page Not Found</p>} />
        </Route>
      </Routes>
    </Suspense>
  );
};
