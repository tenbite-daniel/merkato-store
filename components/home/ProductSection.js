'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/Icon';
import ProductCard from './ProductCard';

export default function ProductSection({ translationKey, products, viewAllHref }) {
  const t = useTranslations('products');
  const locale = useLocale();
  const ref = useRef(null);
  const isRtl = locale === 'ar';

  const scroll = (dir) => {
    if (!ref.current) return;
    const cardWidth = ref.current.offsetWidth / 4;
    ref.current.scrollBy({
      left: dir === 'left' ? -cardWidth * 4 : cardWidth * 4,
      behavior: 'smooth',
    });
  };

  return (
    <section className="bg-surface-soft">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-ink">{t(translationKey)}</h2>
          <div className="flex items-center gap-3">
            {viewAllHref && (
              <Link
                href={`/${locale}${viewAllHref}`}
                className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {t('viewAll')} <Icon name={isRtl ? 'arrow_back' : 'arrow_forward'} className="!text-[14px]" />
              </Link>
            )}
            <button
              onClick={() => scroll('left')}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface hover:bg-surface-soft transition-colors"
              aria-label="Scroll left"
            >
              <Icon name={isRtl ? 'chevron_right' : 'chevron_left'} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-surface hover:bg-surface-soft transition-colors"
              aria-label="Scroll right"
            >
              <Icon name={isRtl ? 'chevron_left' : 'chevron_right'} />
            </button>
          </div>
        </div>

        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {products.map((p) => (
            <div key={p.id} className="shrink-0 snap-start w-[calc(50%-8px)] md:w-[calc(25%-12px)]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
