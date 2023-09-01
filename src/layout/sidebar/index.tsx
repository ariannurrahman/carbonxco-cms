import { Link, useLocation } from 'react-router-dom';

import { SIDEBAR_NAV } from './constants';
import classNames from 'classnames';
import { Button } from 'antd';
import { useAuth } from 'hooks/useAuth';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActiveLocation = (path: string) => {
    return location.pathname.includes(path);
  };

  const onClickSignOut = () => {
    logout();
  };

  return (
    <aside
      className={classNames({
        'bg-white transition-all h-full z-20': true,
        'fixed md:relative w-[160px] md:w-[240px]': true,
        'left-0': isOpen,
        'right-[100%]': !isOpen,
      })}
    >
      <div className='flex flex-col flex-nowrap gap-5 px-3 shadow-lg min-h-full mt-3'>
        {SIDEBAR_NAV.map(({ href, label }) => (
          <Link
            to={href}
            key={label}
            className={classNames({
              'flex items-center pl-3 rounded-md h-[40px]': true,
              'text-[#1677ff]': isActiveLocation(href),
              'hover:bg-sky-100 hover:text-sky-800 focus:outline-none': true,
            })}
          >
            {label}
          </Link>
        ))}
        <Button onClick={onClickSignOut} type='primary' className='align-bottom bg-[#1677ff] w-full'>
          Sign Out
        </Button>
      </div>
    </aside>
  );
};
