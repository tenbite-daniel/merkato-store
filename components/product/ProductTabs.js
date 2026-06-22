'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Icon } from '@/components/Icon';
import Stars from '@/components/product/Stars';

export default function ProductTabs({
  product,
  activeStock,
  selectedColor,
  selectedSize,
  selectedWeight,
}) {
  const t = useTranslations('productDetail');
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mb-12 rounded-2xl border border-border bg-surface overflow-hidden">
      <div className="flex border-b border-border">
        {['description', 'details', 'reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold transition-colors ${
              activeTab === tab
                ? 'text-primary border-b-2 border-primary bg-accent/30'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t(`tabs.${tab}`)}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'description' && (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">{product.description}</p>
            {product.features?.length > 0 && (
              <ul className="space-y-2 pt-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Icon name="check_circle" filled className="!text-[16px] text-success shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeTab === 'details' && (
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3">
            {[
              [t('details.sku'), product.id.toUpperCase().slice(0, 12)],
              [t('details.brand'), product.brand],
              [t('details.category'), product.category],
              [t('details.availability'), activeStock > 0 ? t('inStock') : t('outOfStock')],
              selectedColor && [t('variants.color'), selectedColor.label],
              selectedSize && [t('variants.size'), selectedSize.label],
              selectedWeight && [t('variants.weight'), selectedWeight.label],
              product.material && [t('details.material'), product.material],
              product.dietary && [t('details.dietary'), product.dietary.join(', ')],
              product.skinType && [t('details.skinType'), product.skinType.join(', ')],
            ]
              .filter(Boolean)
              .map(([label, value]) => (
                <div key={label} className="flex items-start gap-2 py-2 border-b border-border last:border-0">
                  <dt className="w-28 shrink-0 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</dt>
                  <dd className="text-sm text-foreground font-medium">{value}</dd>
                </div>
              ))}
          </dl>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-5 rounded-xl bg-surface-soft border border-border">
              <div className="text-center">
                <div className="text-5xl font-black text-ink">{product.rating.toFixed(1)}</div>
                <Stars value={product.rating} />
                <div className="text-xs text-muted-foreground mt-1">{product.reviews.toLocaleString()} {t('reviews')}</div>
              </div>
              <div className="flex-1 space-y-1.5">
                {[5, 4, 3, 2, 1].map((star) => {
                  const pct = star === Math.round(product.rating) ? 65 : star === Math.round(product.rating) - 1 ? 25 : star === 5 && product.rating >= 4.5 ? 65 : 5;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-4 text-right font-medium text-muted-foreground">{star}</span>
                      <Icon name="star" filled className="!text-[12px] text-gold" />
                      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full rounded-full bg-gold" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-7 text-muted-foreground">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-bold text-ink">{t('customerReviews')}</h3>
              <button className="flex items-center gap-1.5 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-accent transition-colors">
                <Icon name="edit" className="!text-[14px]" />
                {t('writeReview')}
              </button>
            </div>

            {[
              { name: 'Amara K.', rating: 5, date: 'May 2026', text: 'Absolutely love this product! Quality is top-notch and delivery was fast.' },
              { name: 'Hassan M.', rating: 4, date: 'Apr 2026', text: 'Great value for the price. Would definitely recommend to friends and family.' },
            ].map((r) => (
              <div key={r.name} className="border-b border-border pb-5 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold">
                      {r.name[0]}
                    </div>
                    <span className="text-sm font-semibold text-ink">{r.name}</span>
                    <Icon name="verified" filled className="!text-[14px] text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
                <Stars value={r.rating} />
                <p className="mt-2 text-sm text-foreground/80">{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
