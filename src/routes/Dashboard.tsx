import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';
import { Item } from 'pages/dashboard/item';
import { PreOrder } from 'pages/dashboard/pre-order';
import { ItemDetail } from 'pages/dashboard/item/item-detail';
import { CreatePO } from 'pages/dashboard/pre-order/pre-order-create';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='item' element={<Item />} />
          <Route path='item/:id' element={<ItemDetail />} />
          <Route path='pre-order' element={<PreOrder />} />
          <Route path='pre-order/create' element={<CreatePO />} />

          <Route path='' element={<Navigate to='/dashboard/item' />} />
          <Route path='*' element={<Navigate to='/dashboard/item' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
