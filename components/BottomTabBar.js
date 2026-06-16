'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from './Icon';

export function BottomTabBar() {
  const t = useTranslations('bottomNav');
  const locale = useLocale();
  const pathname = usePathname();

  const tabs = [
    { href: `/${locale}`, label: t('home'), icon: 'home', exact: true },
    { href: `/${locale}/categories`, label: t('shop'), icon: 'grid_view' },
    { href: `/${locale}/search`, label: t('search'), icon: 'search' },
    { href: `/${locale}/cart`, label: t('cart'), icon: 'shopping_cart' },
    { href: `/${locale}/login`, label: t('signIn'), icon: 'login' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-surface border-t border-border shadow-[0_-4px_12px_rgba(0,0,0,0.08)] pb-[env(safe-area-inset-bottom)]">
      <ul className="flex items-stretch">
        {tabs.map((tab) => {
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href) && tab.href !== `/${locale}`;
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
