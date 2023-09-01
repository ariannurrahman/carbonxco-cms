import { Button } from 'antd';

import MenuIcon from 'assets/menu.png';

interface HeaderProps {
  onClickSidebar: () => void;
}

export const Header = ({ onClickSidebar }: HeaderProps) => {
  return (
    <header className='flex justify-between items-center h-full w-full px-5'>
      <p className='p-0 m-0 text-lg font-bold'>VIP</p>
      <Button
        className='relative md:hidden m-0 p-0 flex justify-center items-center bg-transparent'
        onClick={onClickSidebar}
        shape='default'
        icon={<img src={MenuIcon} alt='menu' />}
      />
    </header>
  );
};
