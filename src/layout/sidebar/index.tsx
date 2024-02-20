import { Link, useLocation } from 'react-router-dom';

import { SIDEBAR_NAV } from './constants';
import classNames from 'classnames';

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();

  const isActiveLocation = (path: string) => {
    return location.pathname.includes(path);
  };

  return (
    <aside
      className={classNames({
        'bg-white transition-all h-full z-20 border-r-2 pl-10 pt-5': true,
        'fixed md:relative w-[160px] md:w-[240px]': true,
        'left-0': isOpen,
        'right-[100%]': !isOpen,
      })}
    >
      <div className='flex flex-col flex-nowrap gap-5 px-3 min-h-full mt-3'>
        {SIDEBAR_NAV.map(({ href, label }) => (
          <Link
            to={href}
            key={label}
            className={classNames({
              'flex items-center pl-3 rounded-md h-[40px]': true,
              'text-[#00B040] underline': isActiveLocation(href),
              'focus:outline-none': true,
            })}
          >
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};
