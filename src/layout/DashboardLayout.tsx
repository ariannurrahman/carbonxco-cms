import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { Sidebar as VIPSidebar } from 'layout/sidebar';
import { Header as VIPHeader } from './header';

const { Header, Content } = Layout;

export function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const onClickSidebar = () => setIsSidebarOpen((prevState) => !prevState);

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <Layout className='h-screen w-screen max-h-screen min-h-screen md:overflow-hidden'>
      <Header className='bg-white shadow-lg p-0 h-[80px]'>
        <VIPHeader onClickSidebar={onClickSidebar} />
      </Header>
      <Layout hasSider className='h-full transition-all'>
        <VIPSidebar isOpen={isSidebarOpen} />
        <Content className='p-3 h-screen overflow-scroll max-h-screen'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
