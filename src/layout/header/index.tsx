import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import MenuIcon from 'assets/menu.png';
import CarbonxcoLogo from 'assets/logo.svg';
import { useAuth } from 'hooks/useAuth';
interface HeaderProps {
  onClickSidebar: () => void;
}

export const Header = ({ onClickSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <header className='flex justify-between items-center h-full w-full px-5 lg:px-20 pt-10 pb-5 border-b-2'>
      <img src={CarbonxcoLogo} alt='carbonxco' onClick={() => navigate('/dashboard/projects')} />
      <Button onClick={logout} type='text'>
        <p className='underline text-[#46A7ED]'>Log Out</p>
      </Button>
      <Button
        className='relative md:hidden m-0 p-0 flex justify-center items-center bg-transparent'
        onClick={onClickSidebar}
        shape='default'
        icon={<img src={MenuIcon} alt='menu' />}
      />
    </header>
  );
};
