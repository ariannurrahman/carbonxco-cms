import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Home } from 'pages/dashboard/home';
import { DashboardLayout } from 'layout/DashboardLayout';
import { Item } from 'pages/dashboard/item';
import { Customer } from 'pages/dashboard/customer';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='home' element={<Home />} />
          <Route path='item' element={<Item />} />
          <Route path='customer' element={<Customer />} />

          <Route path='' element={<Navigate to='/dashboard/home' />} />
          <Route path='*' element={<Navigate to='/dashboard/home' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
