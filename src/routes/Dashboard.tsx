import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardLayout } from 'layout/DashboardLayout';
import { Item } from 'pages/dashboard/item';
import { PreOrder } from 'pages/dashboard/pre-order';
import { ItemDetail } from 'pages/dashboard/item/item-detail';
import { CreatePO } from 'pages/dashboard/pre-order/pre-order-edit-create';
import { Customer } from 'pages/dashboard/customer';
import { CustomerDetail } from 'pages/dashboard/customer/customer-detail';
import { Stock } from 'pages/dashboard/stock';
import { InvoicePO } from 'pages/dashboard/invoice-po';
import { InvoicePoEditCreate } from 'pages/dashboard/invoice-po/invoice-po-edit-create';
import { Invoice } from 'pages/dashboard/invoice';
import { CreateEditInvoice } from 'pages/dashboard/invoice/create-edit-invoice';

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
          <Route path='customer/:id' element={<CustomerDetail />} />

          <Route path='stock' element={<Stock />} />
          <Route path='invoice-po' element={<InvoicePO />} />
          <Route path='invoice-po/create' element={<InvoicePoEditCreate state='create' />} />
          <Route path='invoice-po/edit/:id' element={<InvoicePoEditCreate state='edit' />} />

          <Route path='order-invoice' element={<Invoice />} />
          <Route path='order-invoice/view/:id' element={<CreateEditInvoice state='view' />} />
          <Route path='order-invoice/edit/:id' element={<CreateEditInvoice state='edit' />} />

          <Route path='' element={<Navigate to='/dashboard/item' />} />
          <Route path='*' element={<Navigate to='/dashboard/item' />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
