'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { use } from 'react';
import { getProduct, products } from '@/lib/products';
import { Icon } from '@/components/Icon';
import ProductCard from '@/components/home/ProductCard';
import Stars from '@/components/product/Stars';
import VariantSelector from '@/components/product/VariantSelector';
import ProductTabs from '@/components/product/ProductTabs';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const locale = useLocale();
  const t = useTranslations('productDetail');
  const tNav = useTranslations('bottomNav');
  const td = useTranslations('productData');
  const tProducts = useTranslations('products');

  const product = getProduct(id);
  if (!product) notFound();

  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.variants?.colors?.[0] ?? null
  );
  const [selectedSize, setSelectedSize] = useState(
    product.variants?.sizes?.[0] ?? null
  );
  const [selectedWeight, setSelectedWeight] = useState(
    product.variants?.weights?.[0] ?? null
  );

  // Resolve active price & stock from variant selection
  const activePrice = useMemo(() => {
    if (selectedWeight?.price != null) return selectedWeight.price;
    return product.price;
  }, [selectedWeight, product.price]);

  const activeOldPrice = useMemo(() => {
    if (selectedWeight?.price != null) return null; // weight variants don't carry oldPrice
    return product.oldPrice ?? null;
  }, [selectedWeight, product.oldPrice]);

  const activeStock = useMemo(() => {
    // most restrictive of any chosen variant
    const candidates = [
      selectedColor?.stock,
      selectedSize?.stock,
      selectedWeight?.stock,
    ].filter((s) => s != null);
    return candidates.length ? Math.min(...candidates) : product.stock;
  }, [selectedColor, selectedSize, selectedWeight, product.stock]);

  const related = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const discount = activeOldPrice
    ? Math.round(((activeOldPrice - activePrice) / activeOldPrice) * 100)
    : null;

  const badgeStyle =
    product.badge === 'Best Seller'
      ? 'bg-gold text-ink'
      : product.badge === 'Discount'
      ? 'bg-primary text-primary-foreground'
      : 'bg-success text-white';

  const stockStatus =
    activeStock === 0
      ? { label: t('outOfStock'), color: 'text-error' }
      : activeStock <= 10
      ? { label: `${t('onlyLeft', { count: activeStock })}`, color: 'text-[#c05621]' }
      : { label: t('inStock'), color: 'text-success' };

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground flex-wrap">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors">
          {tNav('home')}
        </Link>
        <span className="mx-1">›</span>
        <Link href={`/${locale}/categories/${product.categorySlug}`} className="hover:text-primary transition-colors">
          {product.category}
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-ink line-clamp-1">{td(product.id)}</span>
      </nav>

      {/* Main product section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
        {/* Image */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-soft border border-border">
          <Image
            src={product.image}
            alt={td(product.id)}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          {product.badge && (
            <span className={`absolute start-4 top-4 rounded-lg px-3 py-1.5 text-xs font-bold ${badgeStyle}`}>
              {product.badge === 'Discount' && discount
                ? `-${discount}%`
                : td(`badges.${product.badge}`)}
            </span>
          )}
          <button
            onClick={() => setWishlisted((v) => !v)}
            className="absolute end-4 top-4 h-10 w-10 grid place-items-center rounded-full bg-surface/90 shadow hover:bg-surface transition-colors"
            aria-label={t('wishlist')}
          >
            <Icon name="favorite" filled={wishlisted} className={`!text-[20px] ${wishlisted ? 'text-error' : 'text-muted-foreground'}`} />
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Brand & title */}
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">{product.brand}</span>
            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-ink leading-tight">{td(product.id)}</h1>
          </div>

          {/* Rating */}
          <Stars value={product.rating} count={product.reviews} large />

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-primary-deep">${activePrice.toFixed(2)}</span>
            {activeOldPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${activeOldPrice.toFixed(2)}</span>
                <span className="rounded-md bg-accent text-accent-foreground text-sm font-bold px-2 py-0.5">
                  {t('save')} {discount}%
                </span>
              </>
            )}
          </div>

          {/* Stock */}
          <div className={`flex items-center gap-1.5 text-sm font-semibold ${stockStatus.color}`}>
            <Icon name={activeStock > 0 ? 'check_circle' : 'cancel'} filled className="!text-[16px]" />
            {stockStatus.label}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Variant selectors */}
          <VariantSelector
            variants={product.variants}
            selectedColor={selectedColor} setSelectedColor={setSelectedColor}
            selectedSize={selectedSize} setSelectedSize={setSelectedSize}
            selectedWeight={selectedWeight} setSelectedWeight={setSelectedWeight}
            setQty={setQty}
          />

          {/* Features */}
          {product.features?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.features.map((f) => (
                <span key={f} className="flex items-center gap-1 rounded-full border border-border bg-surface-soft px-3 py-1 text-xs font-semibold text-foreground">
                  <Icon name="check" className="!text-[12px] text-success" />
                  {f}
                </span>
              ))}
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex flex-col gap-2 pt-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border bg-surface overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-12 w-12 grid place-items-center hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                disabled={qty <= 1}
              >
                <Icon name="remove" className="!text-[18px]" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-ink">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(activeStock, q + 1))}
                className="h-12 w-12 grid place-items-center hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                disabled={qty >= activeStock}
              >
                <Icon name="add" className="!text-[18px]" />
              </button>
            </div>

            <button
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeStock === 0}
            >
              <Icon name="add_shopping_cart" className="!text-[18px]" />
              {tProducts('addToCart')}
            </button>

            <button
              onClick={() => setWishlisted((v) => !v)}
              className="h-12 w-12 grid place-items-center rounded-xl border border-border hover:border-error hover:bg-red-50 transition-colors"
              aria-label={t('wishlist')}
            >
              <Icon name="favorite" filled={wishlisted} className={`!text-[20px] ${wishlisted ? 'text-error' : 'text-muted-foreground'}`} />
            </button>
          </div>
          {qty > 1 && (
             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <span>{qty} × ${activePrice.toFixed(2)}</span>
              <span className="text-foreground font-bold">= ${(qty * activePrice).toFixed(2)}</span>
            </div>
          )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
            {[
              { icon: 'local_shipping', label: t('freeShipping') },
              { icon: 'verified_user', label: t('securePayment') },
              { icon: 'replay', label: t('easyReturns') },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                <Icon name={icon} className="!text-[22px] text-primary" />
                <span className="text-[11px] font-semibold text-muted-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs: Description / Details / Reviews */}
      <ProductTabs
        product={product}
        activeStock={activeStock}
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        selectedWeight={selectedWeight}
      />

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-ink">{t('related')}</h2>
            <Link
              href={`/${locale}/categories/${product.categorySlug}`}
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              {tProducts('viewAll')} <Icon name="arrow_forward" className="!text-[14px]" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
