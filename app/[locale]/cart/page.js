'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useCart } from '@/lib/useCart';
import { Icon } from '@/components/Icon';

export default function CartPage() {
  const locale = useLocale();
  const t = useTranslations('products');
  const { cart, updateQty, removeItem, clearCart, totalItems, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
        <h1 className="text-2xl font-extrabold text-ink mb-8 flex items-center gap-2">
          <Icon name="shopping_cart" className="!text-[26px] text-primary" />
          Cart
        </h1>
        <div className="flex flex-col items-center justify-center py-32 gap-4 text-muted-foreground">
          <Icon name="shopping_cart" className="!text-[64px] text-border" />
          <p className="text-lg font-semibold">Your cart is empty</p>
          <Link
            href={`/${locale}/categories`}
            className="mt-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-deep transition-colors"
          >
            Start shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-ink flex items-center gap-2">
          <Icon name="shopping_cart" filled className="!text-[26px] text-primary" />
          Cart
          <span className="text-base font-semibold text-muted-foreground">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-muted-foreground hover:text-error transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.key} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
              <Link href={`/${locale}/product/${item.id}`} className="relative h-20 w-20 shrink-0 rounded-lg overflow-hidden bg-surface-soft">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
              </Link>
              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <Link href={`/${locale}/product/${item.id}`} className="text-sm font-semibold text-ink line-clamp-2 hover:text-primary">
                  {item.name}
                </Link>
                {item.variantLabel && (
                  <span className="text-xs text-muted-foreground">{item.variantLabel}</span>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 flex-wrap">
                  {/* Qty controls */}
                  <div className="flex items-center rounded-lg border border-border bg-surface overflow-hidden">
                    <button
                      onClick={() => updateQty(item.key, item.qty - 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Icon name="remove" className="!text-[16px]" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-ink">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.key, item.qty + 1)}
                      className="h-8 w-8 grid place-items-center hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                    >
                      <Icon name="add" className="!text-[16px]" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-primary-deep">
                      ${((item.price ?? 0) * item.qty).toFixed(2)}
                    </span>
                    {item.qty > 1 && (
                      <span className="text-xs text-muted-foreground">${(item.price ?? 0).toFixed(2)} each</span>
                    )}
                    <button
                      onClick={() => removeItem(item.key)}
                      className="text-muted-foreground hover:text-error transition-colors"
                      aria-label="Remove"
                    >
                      <Icon name="delete" className="!text-[18px]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-ink">Order Summary</h2>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold text-success">Free</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-base font-extrabold text-ink">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-3 hover:bg-primary-deep transition-colors">
              Proceed to Checkout
            </button>
            <Link
              href={`/${locale}/categories`}
              className="text-center text-sm text-primary font-semibold hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
