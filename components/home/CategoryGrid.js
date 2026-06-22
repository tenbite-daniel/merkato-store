'use client';

import { useTranslations } from 'next-intl';
import { categories } from '@/lib/products';
import CategoryCard from './CategoryCard';

// row1: electronics(wide=3), fashion(1), groceries(1)
// row2: beauty(1), household(wide=3), accessories(1)
const gridClasses = [
  'col-span-2 md:col-span-3',
  'col-span-2 md:col-span-1',
  'col-span-2 md:col-span-1',
  'col-span-2 md:col-span-1',
  'col-span-2 md:col-span-3',
  'col-span-2 md:col-span-1',
];

export default function CategoryGrid() {
  const t = useTranslations('categories');
  return (
    <section className="mx-auto max-w-[1280px] px-4 md:px-8 py-10">
      <h2 className="text-2xl font-extrabold text-foreground mb-5 text-start">{t('shopByCategory')}</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 auto-rows-[220px]">
        {categories.map((cat, i) => (
          <CategoryCard
            key={cat.slug}
            category={cat}
            className={gridClasses[i] ?? 'col-span-1'}
          />
        ))}
      </div>
    </section>
  );
}
