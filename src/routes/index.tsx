import { Route, Routes } from 'react-router-dom';

import { AuthRoutes } from './Auth';
import { DashboardRoutes } from './Dashboard';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/auth/*' element={<AuthRoutes />} />
      <Route path='/dashboard/*' element={<DashboardRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
