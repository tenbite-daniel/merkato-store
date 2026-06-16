'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function CategoryPageCard({ category }) {
  const locale = useLocale();
  const t = useTranslations('categories');

  return (
    <Link
      href={`/${locale}/shop/${category.slug}`}
      className="group relative overflow-hidden rounded-xl aspect-[4/3] block"
    >
      <Image
        src={category.image}
        alt={t(category.slug)}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 start-0 p-4 text-white">
        <p className="text-lg font-bold">{t(category.slug)}</p>
        <p className="text-sm opacity-80">{t('items', { count: category.count })}</p>
      </div>
    </Link>
  );
}
