'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from './Icon';

const tabs = [
  { href: '/', label: 'Home', icon: 'home', exact: true },
  { href: '/shop', label: 'Shop', icon: 'grid_view' },
  { href: '/search', label: 'Search', icon: 'search' },
  { href: '/cart', label: 'Cart', icon: 'shopping_cart' },
  { href: '/login', label: 'Sign In', icon: 'login' },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-surface border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href) && tab.href !== '/';
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className={`relative flex flex-col items-center justify-center gap-0.5 py-2 w-full text-[10px] font-semibold transition-colors ${
                  isActive ? 'text-primary' : 'text-foreground/50'
                }`}
              >
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-primary" />
                )}
                <Icon
                  name={tab.icon}
                  filled={isActive}
                  className={`!text-[24px] transition-transform ${isActive ? 'scale-110' : ''}`}
                />
                <span className={`leading-none transition-colors ${isActive ? 'text-primary' : 'text-foreground/50'}`}>
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
