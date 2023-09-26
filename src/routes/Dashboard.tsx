import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';
import { Item } from 'pages/dashboard/item';
import { PreOrder } from 'pages/dashboard/pre-order';
import { ItemDetail } from 'pages/dashboard/item/item-detail';
import { CreatePO } from 'pages/dashboard/pre-order/pre-order-edit-create';
import { Customer } from 'pages/dashboard/customer';

export const DashboardRoutes = () => {
  return (
    <Suspense fallback={<p>Loading</p>}>
      <Routes>
        <Route path='/' element={<DashboardLayout />}>
          <Route path='item' element={<Item />} />
          <Route path='item/:id' element={<ItemDetail />} />

          <Route path='pre-order' element={<PreOrder />} />
          <Route path='pre-order/create' element={<CreatePO />} />
          <Route path='pre-order/edit/:id' element={<CreatePO />} />
          <Route path='pre-order/view/:id' element={<CreatePO />} />

          <Route path='customer' element={<Customer />} />

          <Route path='' element={<Navigate to='/dashboard/item' />} />
          <Route path='*' element={<Navigate to='/dashboard/item' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
