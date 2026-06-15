'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/Icon';

function Stars({ value, count }) {
  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon
          key={i}
          name="star"
          filled={i < Math.round(value)}
          className="!text-[15px] text-gold"
        />
      ))}
      {count !== undefined && (
        <span className="ml-1 text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

export default function ProductCard({ product }) {
  const locale = useLocale();
  const t = useTranslations('products');
  const td = useTranslations('productData');

  const badgeStyle =
    product.badge === 'Best Seller'
      ? 'bg-gold text-ink'
      : product.badge === 'Discount'
      ? 'bg-primary text-primary-foreground'
      : 'bg-success text-white';

  const badgeLabel =
    product.badge === 'Discount' && product.oldPrice
      ? `-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`
      : product.badge && product.badge !== 'Discount'
      ? td(`badges.${product.badge}`)
      : product.badge;

  const productName = td(product.id);

  return (
    <Link
      href={`/${locale}/p/${product.id}`}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-surface-soft">
        <Image
          src={product.image}
          alt={productName}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {product.badge && (
          <span className={`absolute start-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold ${badgeStyle}`}>
            {badgeLabel}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold text-ink line-clamp-2">{productName}</h3>
        <Stars value={product.rating} count={product.reviews} />
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <div className="text-base font-bold text-primary-deep">${product.price.toFixed(2)}</div>
            {product.oldPrice && (
              <div className="text-xs text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</div>
            )}
          </div>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-surface-soft text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon name="add_shopping_cart" className="!text-[18px]" />
          </span>
        </div>
      </div>
    </Link>
  );
}
