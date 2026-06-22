'use client';

import { useTranslations } from 'next-intl';

export default function VariantSelector({
  variants,
  selectedColor, setSelectedColor,
  selectedSize, setSelectedSize,
  selectedWeight, setSelectedWeight,
  setQty,
}) {
  const t = useTranslations('productDetail');

  return (
    <>
      {variants?.colors && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t('variants.color')}: <span className="text-foreground font-semibold">{selectedColor?.label}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.colors.map((c) => (
              <button
                key={c.label}
                onClick={() => { setSelectedColor(c); setQty(1); }}
                title={c.label}
                className={`h-8 w-8 rounded-full border-2 transition-all ${
                  selectedColor?.label === c.label
                    ? 'border-primary scale-110 shadow-md'
                    : 'border-border hover:border-primary/50'
                } ${c.stock === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                style={{ backgroundColor: c.value }}
                disabled={c.stock === 0}
              />
            ))}
          </div>
        </div>
      )}

      {variants?.sizes && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t('variants.size')}: <span className="text-foreground font-semibold">{selectedSize?.label}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.sizes.map((s) => (
              <button
                key={s.label}
                onClick={() => { setSelectedSize(s); setQty(1); }}
                className={`h-9 min-w-[52px] px-3 rounded-lg border text-sm font-semibold transition-colors ${
                  selectedSize?.label === s.label
                    ? 'border-primary bg-accent text-primary'
                    : 'border-border bg-surface hover:border-primary/60 text-foreground'
                } ${s.stock === 0 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                disabled={s.stock === 0}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {variants?.weights && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t('variants.weight')}: <span className="text-foreground font-semibold">{selectedWeight?.label}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {variants.weights.map((w) => (
              <button
                key={w.label}
                onClick={() => { setSelectedWeight(w); setQty(1); }}
                className={`h-9 min-w-[60px] px-3 rounded-lg border text-sm font-semibold transition-colors ${
                  selectedWeight?.label === w.label
                    ? 'border-primary bg-accent text-primary'
                    : 'border-border bg-surface hover:border-primary/60 text-foreground'
                } ${w.stock === 0 ? 'opacity-30 cursor-not-allowed line-through' : ''}`}
                disabled={w.stock === 0}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
