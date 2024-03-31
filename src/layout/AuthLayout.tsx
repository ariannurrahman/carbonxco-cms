import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import './style.scss';

export function AuthLayout() {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    return <Navigate to='/dashboard/item' />;
  }

  return (
    <Layout className='auth-layout'>
      <Outlet />
    </Layout>
  );
}
