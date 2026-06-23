'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Icon } from '@/components/Icon';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';

function Stars({ value, count }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => {
        const diff = value - (i - 1);
        const filled = diff >= 1;
        const half = !filled && diff >= 0.25;
        return (
          <span key={i} className="relative inline-flex !text-[15px] text-gold leading-none">
            {/* empty base */}
            <Icon name="star" filled={false} className="!text-[15px] text-gold" />
            {/* filled overlay (full or half) */}
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? '100%' : '50%' }}
              >
                <Icon name="star" filled className="!text-[15px] text-gold" />
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-1 text-xs text-muted-foreground font-medium">{value.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </div>
  );
}

export default function ProductCard({ product }) {
  const locale = useLocale();
  const t = useTranslations('products');
  const td = useTranslations('productData');
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const { addToCart } = useCart();

  const [showPicker, setShowPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.variants?.colors?.[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(product.variants?.sizes?.[0] ?? null);
  const [selectedWeight, setSelectedWeight] = useState(product.variants?.weights?.[0] ?? null);
  const [added, setAdded] = useState(false);

  const hasVariants = !!(product.variants?.colors || product.variants?.sizes || product.variants?.weights);

  function handleCartClick(e) {
    e.preventDefault();
    if (hasVariants) {
      setShowPicker(true);
    } else {
      dispatchAdd();
    }
  }

  function dispatchAdd() {
    const variantParts = [
      selectedColor?.label,
      selectedSize?.label,
      selectedWeight?.label,
    ].filter(Boolean);
    const variantKey = variantParts.join('-') || undefined;
    const price =
      selectedWeight?.price ?? product.price;
    addToCart({
      id: product.id,
      name: td(product.id),
      image: product.image,
      price,
      qty: 1,
      variantKey,
      variantLabel: variantParts.join(' / ') || undefined,
    });
    setShowPicker(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

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
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-shadow hover:shadow-md">
      <Link href={`/${locale}/product/${product.id}`} className="relative aspect-square overflow-hidden bg-surface-soft block">
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
        <button
          onClick={(e) => { e.preventDefault(); toggle(product.id); }}
          className="absolute end-2 top-2 h-8 w-8 grid place-items-center rounded-full bg-surface/90 shadow hover:bg-surface transition-colors"
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon name="favorite" filled={wishlisted} className={`!text-[16px] ${wishlisted ? 'text-error' : 'text-muted-foreground'}`} />
        </button>
      </Link>
      <div className="relative flex flex-1 flex-col">
        <Link href={`/${locale}/product/${product.id}`} className="flex flex-1 flex-col gap-2 p-4">
          <h3 className="text-sm font-semibold text-ink line-clamp-2">{productName}</h3>
          <Stars value={product.rating} count={product.reviews} />
          <div className="mt-auto flex items-end justify-between pt-2">
            <div>
              <div className="text-base font-bold text-primary-deep">${product.price.toFixed(2)}</div>
              {product.oldPrice && (
                <div className="text-xs text-muted-foreground line-through">${product.oldPrice.toFixed(2)}</div>
              )}
            </div>
            <button
              onClick={handleCartClick}
              className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${added ? 'bg-primary text-primary-foreground' : 'bg-surface-soft text-foreground group-hover:bg-primary group-hover:text-primary-foreground'}`}
              aria-label="Add to cart"
            >
              <Icon name={added ? 'check' : 'add_shopping_cart'} className="!text-[18px]" />
            </button>
          </div>
        </Link>

        {/* Variant picker overlay — only over the details section */}
        {showPicker && (
          <div
            className="absolute inset-0 z-20 flex flex-col justify-end rounded-b-xl bg-surface/95 backdrop-blur-sm p-4 gap-3"
            onClick={(e) => e.preventDefault()}
          >
          <button
            onClick={(e) => { e.preventDefault(); setShowPicker(false); }}
            className="absolute top-2 end-2 h-7 w-7 grid place-items-center rounded-full bg-surface-soft text-muted-foreground hover:text-error"
          >
            <Icon name="close" className="!text-[16px]" />
          </button>

          {product.variants?.colors && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Color: <span className="text-foreground">{selectedColor?.label}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.colors.map((c) => (
                  <button
                    key={c.label}
                    title={c.label}
                    onClick={(e) => { e.preventDefault(); setSelectedColor(c); }}
                    disabled={c.stock === 0}
                    className={`h-7 w-7 rounded-full border-2 transition-all ${selectedColor?.label === c.label ? 'border-primary scale-110 shadow-md' : 'border-border'} ${c.stock === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: c.value }}
                  />
                ))}
              </div>
            </div>
          )}

          {product.variants?.sizes && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Size: <span className="text-foreground">{selectedSize?.label}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.sizes.map((s) => (
                  <button
                    key={s.label}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(s); }}
                    disabled={s.stock === 0}
                    className={`h-8 min-w-[44px] px-2 rounded-lg border text-xs font-semibold transition-colors ${selectedSize?.label === s.label ? 'border-primary bg-accent text-primary' : 'border-border bg-surface text-foreground'} ${s.stock === 0 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.variants?.weights && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Weight: <span className="text-foreground">{selectedWeight?.label}</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.variants.weights.map((w) => (
                  <button
                    key={w.label}
                    onClick={(e) => { e.preventDefault(); setSelectedWeight(w); }}
                    disabled={w.stock === 0}
                    className={`h-8 min-w-[52px] px-2 rounded-lg border text-xs font-semibold transition-colors ${selectedWeight?.label === w.label ? 'border-primary bg-accent text-primary' : 'border-border bg-surface text-foreground'} ${w.stock === 0 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={(e) => { e.preventDefault(); dispatchAdd(); }}
            className="mt-1 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors"
          >
            Add to Cart
          </button>
          </div>
        )}
      </div>
    </div>
  );
}
