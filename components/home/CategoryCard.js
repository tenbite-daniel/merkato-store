'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

export default function CategoryCard({ category, className }) {
  const locale = useLocale();
  const t = useTranslations('categories');
  return (
    <Link
      href={`/${locale}/shop/${category.slug}`}
      className={`group relative overflow-hidden rounded-xl ${className}`}
    >
      <Image
        src={category.image}
        alt={t(category.slug)}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 start-0 p-4 text-white">
        <p className="text-base md:text-lg font-bold">{t(category.slug)}</p>
        <p className="text-xs opacity-80">{t(`${category.slug}Blurb`)}</p>
      </div>
    </Link>
  );
}
