import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { products } from '@/lib/products';
import DealsFilters from '@/components/deals/DealsFilters';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deals' });
  return { title: t('title') };
}

const dealProducts = products.filter((p) => p.badge === 'Discount' && p.oldPrice);

export default async function DealsPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'deals' });
  const tNav = await getTranslations({ locale, namespace: 'bottomNav' });

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors">
          {tNav('home')}
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-primary">{t('title')}</span>
      </nav>

      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-deep via-primary to-[#e07840]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute -bottom-24 -left-12 h-80 w-80 rounded-full bg-white/5" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-48 -translate-x-1/2 rounded-full bg-white/[0.03]" />

        <div className="relative flex flex-col items-center gap-8 px-6 py-12 text-center md:flex-row md:items-center md:justify-between md:px-16 md:py-14 md:text-start">
          <div className="flex flex-col items-center md:items-start">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffd96a]" />
              {t('bannerLabel')}
            </span>
            <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-white md:text-5xl">
              {t('bannerTitle')}
            </h1>
            <p className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#ffd96a] md:text-5xl">
              {t('bannerHighlight')}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70 md:max-w-sm md:text-base">
              {t('bannerSubtitle')}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-center justify-center rounded-full border-[3px] border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-sm md:h-44 md:w-44">
            <span className="text-5xl font-black leading-none text-white md:text-6xl">50%</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-widest text-[#ffd96a]">OFF</span>
          </div>
        </div>
      </div>

      {/* Filters + Grid + Pagination */}
      <DealsFilters products={dealProducts} />
    </div>
  );
}
