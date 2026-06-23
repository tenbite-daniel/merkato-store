'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { products } from '@/lib/products';
import { useWishlist } from '@/lib/useWishlist';
import ProductCard from '@/components/home/ProductCard';
import { Icon } from '@/components/Icon';

export default function WishlistPage() {
  const locale = useLocale();
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6 text-ink">
        My Wishlist ({wishlisted.length})
      </h1>
      {wishlisted.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-surface p-12 text-center">
          <Icon name="favorite" className="!text-[40px] text-muted-foreground" />
          <p className="text-muted-foreground my-3">
            Your wishlist is empty. Tap the heart icon on any product to save it here.
          </p>
          <Link
            href={`/${locale}/categories`}
            className="inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 md:gap-4 md:grid-cols-3 xl:grid-cols-4">
          {wishlisted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
