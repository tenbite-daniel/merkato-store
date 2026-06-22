'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { products } from '@/lib/products';
import { useWishlist } from '@/lib/useWishlist';
import ProductCard from '@/components/home/ProductCard';
import { Icon } from '@/components/Icon';

export default function WishlistPage() {
  const locale = useLocale();
  const t = useTranslations('header');
  const { wishlist, toggle } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-ink flex items-center gap-2">
          <Icon name="favorite" filled className="!text-[26px] text-error" />
          {t('wishlist')}
          {wishlisted.length > 0 && (
            <span className="text-base font-semibold text-muted-foreground">({wishlisted.length})</span>
          )}
        </h1>
        {wishlisted.length > 0 && (
          <button
            onClick={() => wishlisted.forEach((p) => toggle(p.id))}
            className="text-sm text-muted-foreground hover:text-error transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {wishlisted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <Icon name="favorite_border" className="!text-[64px] text-border" />
          <p className="text-lg font-semibold">Your wishlist is empty</p>
          <Link
            href={`/${locale}/categories`}
            className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep transition-colors"
          >
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlisted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
