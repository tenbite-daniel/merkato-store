'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from './Icon';
import { categories } from '@/lib/products';

const categoryIcons = {
  electronics: 'devices',
  fashion: 'checkroom',
  groceries: 'local_grocery_store',
  beauty: 'spa',
  household: 'chair',
  accessories: 'diamond',
};

const categoryColors = {
  electronics: 'bg-blue-50 text-blue-600',
  fashion: 'bg-pink-50 text-pink-600',
  groceries: 'bg-green-50 text-green-600',
  beauty: 'bg-purple-50 text-purple-600',
  household: 'bg-amber-50 text-amber-600',
  accessories: 'bg-rose-50 text-rose-600',
};

export function MobileMenu({ open, onClose }) {
  const t = useTranslations('mobileMenu');
  const tCat = useTranslations('categories');
  const locale = useLocale();
  const [shopExpanded, setShopExpanded] = useState(true);
  const [supportExpanded, setSupportExpanded] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const support = [
    { href: `/${locale}/about`, label: t('support.about'), icon: 'info' },
    { href: `/${locale}/contact`, label: t('support.contact'), icon: 'mail' },
    { href: `/${locale}/faq`, label: t('support.faq'), icon: 'help' },
    { href: `/${locale}/shipping-policy`, label: t('support.shipping'), icon: 'local_shipping' },
    { href: `/${locale}/returns`, label: t('support.returns'), icon: 'assignment_return' },
    { href: `/${locale}/payment-methods`, label: t('support.payment'), icon: 'credit_card' },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute left-0 top-0 h-full w-[88vw] max-w-[360px] bg-surface shadow-2xl flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-primary text-white shrink-0">
          <Link href={`/${locale}`} onClick={onClose} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-white/20 grid place-items-center font-extrabold text-sm">M</div>
            <span className="text-lg font-extrabold tracking-tight">
              Merkato<span className="opacity-70">.</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Guest banner */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface-soft border-b border-border shrink-0">
          <Icon name="person_outline" className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{t('welcome')}</span>
          <div className="ml-auto flex gap-2">
            <Link href={`/${locale}/login`} onClick={onClose} className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary">
              {t('signIn')}
            </Link>
            <Link href={`/${locale}/register`} onClick={onClose} className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
              {t('register')}
            </Link>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">

          {/* Shop / Categories */}
          <div>
            <button
              onClick={() => setShopExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-surface-soft transition-colors"
            >
              <span>{t('shopByCategory')}</span>
              <Icon name={shopExpanded ? 'expand_less' : 'expand_more'} className="!text-[18px]" />
            </button>
            {shopExpanded && (
              <div className="grid grid-cols-2 gap-2 px-3 pb-3">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/${locale}/shop/${c.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5 hover:border-primary/40 hover:bg-accent transition-colors"
                  >
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg text-sm ${categoryColors[c.slug] ?? 'bg-surface-soft text-foreground'}`}>
                      <Icon name={categoryIcons[c.slug] ?? 'category'} className="!text-[18px]" />
                    </span>
                    <span className="text-xs font-semibold text-ink leading-tight">{tCat(c.slug)}</span>
                  </Link>
                ))}
                <Link
                  href={`/${locale}/shop`}
                  onClick={onClose}
                  className="col-span-2 flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 py-2.5 text-xs font-semibold text-primary hover:bg-accent transition-colors"
                >
                  <Icon name="grid_view" className="!text-[16px]" /> {t('allCategories')}
                </Link>
              </div>
            )}
          </div>

          <div className="h-px bg-border mx-4" />

          {/* Support */}
          <div className="py-1">
            <button
              onClick={() => setSupportExpanded((v) => !v)}
              className="flex w-full items-center justify-between px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground hover:bg-surface-soft transition-colors"
            >
              <span>{t('helpSupport')}</span>
              <Icon name={supportExpanded ? 'expand_less' : 'expand_more'} className="!text-[18px]" />
            </button>
            {supportExpanded &&
              support.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground/85 hover:bg-surface-soft hover:text-primary transition-colors"
                >
                  <Icon name={it.icon} className="!text-[20px] text-muted-foreground" />
                  {it.label}
                </Link>
              ))}
          </div>

          {/* Promo strip */}
          <div className="mx-3 mb-3 mt-2 rounded-xl bg-accent border border-primary/20 px-4 py-3">
            <div className="flex items-center gap-2 text-xs">
              <Icon name="local_offer" className="!text-[16px] text-primary" />
              <span className="text-ink">
                {t('promoCode')} <strong className="text-primary">MERKATO10</strong> {t('promoSuffix')}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-border px-4 py-3 bg-surface-soft">
          <div className="text-center text-xs text-muted-foreground">
            {t('serving')}
          </div>
        </div>
      </div>
    </div>
  );
}
