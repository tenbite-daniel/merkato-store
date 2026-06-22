'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const socialLinks = [
  {
    name: 'Facebook',
    href: 'https://facebook.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
      </svg>
    ),
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <footer className="mt-auto w-full border-t border-border bg-muted/60">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-2 gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        <div className="col-span-2 md:col-span-1 space-y-3">
          <div className="text-xl font-extrabold text-primary-deep">Merkato Store</div>
          <p className="text-sm text-muted-foreground">{t('tagline')}</p>
          <div className="flex gap-2 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground/70 hover:text-primary cursor-pointer"
              >
                {s.svg}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-primary-deep">{t('shop')}</div>
          <div className="flex flex-col gap-1.5">
            <Link href={`/${locale}/categories/electronics`} className="text-sm text-foreground/70 hover:text-primary">{t('links.electronics')}</Link>
            <Link href={`/${locale}/categories/fashion`} className="text-sm text-foreground/70 hover:text-primary">{t('links.fashion')}</Link>
            <Link href={`/${locale}/categories/groceries`} className="text-sm text-foreground/70 hover:text-primary">{t('links.groceries')}</Link>
            <Link href={`/${locale}/categories/beauty`} className="text-sm text-foreground/70 hover:text-primary">{t('links.beauty')}</Link>
            <Link href={`/${locale}/categories/household`} className="text-sm text-foreground/70 hover:text-primary">{t('links.household')}</Link>
            <Link href={`/${locale}/shop`} className="text-sm text-foreground/70 hover:text-primary">{t('links.allCategories')}</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-primary-deep">{t('customerCare')}</div>
          <div className="flex flex-col gap-1.5">
            <Link href={`/${locale}/contact`} className="text-sm text-foreground/70 hover:text-primary">{t('links.contact')}</Link>
            <Link href={`/${locale}/faq`} className="text-sm text-foreground/70 hover:text-primary">{t('links.faq')}</Link>
            <Link href={`/${locale}/shipping-policy`} className="text-sm text-foreground/70 hover:text-primary">{t('links.shipping')}</Link>
            <Link href={`/${locale}/returns`} className="text-sm text-foreground/70 hover:text-primary">{t('links.returns')}</Link>
            <Link href={`/${locale}/payment-methods`} className="text-sm text-foreground/70 hover:text-primary">{t('links.payment')}</Link>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-bold text-primary-deep">{t('company')}</div>
          <div className="flex flex-col gap-1.5">
            <Link href={`/${locale}/about`} className="text-sm text-foreground/70 hover:text-primary">{t('links.about')}</Link>
            <Link href={`/${locale}/account`} className="text-sm text-foreground/70 hover:text-primary">{t('links.account')}</Link>
            <Link href={`/${locale}/account/orders`} className="text-sm text-foreground/70 hover:text-primary">{t('links.orders')}</Link>
            <Link href={`/${locale}/privacy`} className="text-sm text-foreground/70 hover:text-primary">{t('links.privacy')}</Link>
            <Link href={`/${locale}/terms`} className="text-sm text-foreground/70 hover:text-primary">{t('links.terms')}</Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1280px] flex-col md:flex-row items-center justify-between gap-2 px-4 md:px-8 py-4 pb-24 md:pb-4 text-xs text-muted-foreground">
          <span>{t('copyright')}</span>
          <span>{t('languages')}</span>
        </div>
      </div>
    </footer>
  );
}
