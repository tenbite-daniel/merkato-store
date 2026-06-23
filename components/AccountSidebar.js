'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Icon } from '@/components/Icon';

const navItems = [
  { label: 'Overview',          icon: 'dashboard',    path: '' },
  { label: 'My Orders',         icon: 'shopping_bag', path: '/orders' },
  { label: 'Wishlist',          icon: 'favorite',     path: '/wishlist' },
  { label: 'Personal Info',     icon: 'person',       path: '/profile' },
  { label: 'Addresses',         icon: 'location_on',  path: '/addresses' },
  { label: 'Billing & Payment', icon: 'credit_card',  path: '/billing' },
  { label: 'Change Password',   icon: 'lock',         path: '/change-password' },
];

export function AccountSidebar() {
  const locale = useLocale();
  const pathname = usePathname();
  const base = `/${locale}/account`;

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 sticky top-24 self-start h-[calc(100svh-6rem)] overflow-y-auto rounded-xl border border-border bg-surface m-4">
        <div className="border-b border-border p-5">
          <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-accent text-primary-deep">
            <Icon name="person" className="!text-2xl" />
          </div>
          <div className="text-base font-semibold text-ink">John Doe</div>
          <div className="text-xs text-muted-foreground">john.doe@example.com</div>
        </div>
        <nav className="flex flex-col py-1 flex-1">
          {navItems.map(({ label, icon, path }) => {
            const href = `${base}${path}`;
            const active = pathname === href;
            return (
              <Link
                key={path}
                href={href}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-colors
                  ${active
                    ? 'border-l-4 border-primary bg-accent text-primary-deep'
                    : 'border-l-4 border-transparent text-foreground/80 hover:bg-surface-soft hover:text-primary'
                  }`}
              >
                <Icon name={icon} className="!text-[18px]" />
                {label}
              </Link>
            );
          })}
        </nav>
        <button className="flex w-full items-center gap-3 px-5 py-3 text-sm font-semibold text-error hover:bg-surface-soft transition-colors border-t border-border cursor-pointer">
          <Icon name="logout" className="!text-[18px]" />
          Sign Out
        </button>
      </aside>

      {/* Mobile horizontal scroll nav */}
      <nav className="md:hidden flex gap-1 overflow-x-auto no-scrollbar px-3 py-2 border-b border-border bg-surface sticky top-0 z-10">
        {navItems.map(({ label, icon, path }) => {
          const href = `${base}${path}`;
          const active = pathname === href;
          return (
            <Link
              key={path}
              href={href}
              className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors
                ${active
                  ? 'bg-accent text-primary-deep font-semibold'
                  : 'text-ink-soft hover:bg-surface-soft'
                }`}
            >
              <Icon name={icon} filled={active} className="!text-[16px]" />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
