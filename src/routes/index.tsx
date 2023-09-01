import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthRoutes } from './Auth';
import { DashboardRoutes } from './Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/dashboard/*' element={<DashboardRoutes />} />
      <Route path='' element={<Navigate to='/auth/login' />} />
      <Route path='*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};

export default AppRoutes;
