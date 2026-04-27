'use client';

import {
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import SignOutButton from './SignOutButton';
import { usePathname } from 'next/navigation';
import { signOutAction } from '../_lib/action.js';

const navLinks = [
  {
    name: 'Home',
    href: '/account',
    icon: <HomeIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Reservations',
    href: '/account/reservations',
    icon: <CalendarDaysIcon className='h-5 w-5 text-primary-600' />,
  },
  {
    name: 'Guest profile',
    href: '/account/profile',
    icon: <UserIcon className='h-5 w-5 text-primary-600' />,
  },
];

function SideNavigation() {
  // usePathname 是 next.js 提供的 hook, 为了使用这个 hook, 需要将 SideNavigation 转换为 client component
  const pathname = usePathname();
  // console.log(pathname);

  return (
    <nav className='border-r border-primary-900'>
      <ul className='flex flex-col gap-2 h-full text-lg'>
        {navLinks.map((link) => (
          <li key={link.name}>
            <a
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${pathname === link.href ? 'bg-primary-900' : ''}`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          </li>
        ))}

        <li className='mt-auto'>
          <form action={signOutAction}><SignOutButton /></form>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
