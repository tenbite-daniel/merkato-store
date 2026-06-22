'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import ProductCard from '@/components/home/ProductCard';

// Maps extra filter keys to the product field they filter against
const EXTRA_FILTER_FIELD = {
  features: 'features',  // array
  material: 'material',  // string
  dietary: 'dietary',    // array
  skinType: 'skinType',  // array
  type: 'type',          // string
};

const CATEGORY_FILTERS = {
  electronics: {
    brands: ['SoundMax', 'Nexar', 'TechCorp'],
    extraFilters: [{ key: 'features' }],
  },
  fashion: {
    brands: ['Atlas', 'Stride'],
    extraFilters: [{ key: 'material' }],
  },
  groceries: {
    brands: ['Highland Roasters', 'Desert Gold'],
    extraFilters: [{ key: 'dietary' }],
  },
  beauty: {
    brands: ['Shea Heritage'],
    extraFilters: [{ key: 'skinType' }],
  },
  household: {
    brands: ['Heritage Crafts', 'EcoHome'],
    extraFilters: [{ key: 'material' }],
  },
  accessories: {
    brands: ['Atlas', 'Adorn'],
    extraFilters: [{ key: 'type' }],
  },
};

const SORT_OPTIONS = [
  { value: 'popularity', labelKey: 'popularity' },
  { value: 'price_asc', labelKey: 'priceAsc' },
  { value: 'price_desc', labelKey: 'priceDesc' },
  { value: 'top_rated', labelKey: 'topRated' },
  { value: 'new_arrivals', labelKey: 'newArrivals' },
];

function StarIcon({ filled, hovered }) {
  const color = filled || hovered ? 'currentColor' : 'none';
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={color} stroke="currentColor" strokeWidth="2"
      className={filled || hovered ? 'text-amber-400' : 'text-muted-foreground/40'}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function RatingFilter({ selected, onChange }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="pt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(selected === star ? null : star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="transition-transform hover:scale-110"
            aria-label={star === 5 ? `5 stars` : `${star} stars and up`}
          >
            <StarIcon filled={selected !== null && star <= selected} hovered={hovered !== null && star <= hovered && selected === null} />
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className="text-xs text-muted-foreground mt-1.5">{selected} star{selected > 1 ? 's' : ''}{selected < 5 ? ' & up' : ''}</p>
      )}
    </div>
  );
}

const PRICE_PRESETS = [
  { label: 'Under $25', range: [0, 25] },
  { label: '$25 – $50', range: [25, 50] },
  { label: '$50 – $100', range: [50, 100] },
  { label: '$100 – $200', range: [100, 200] },
  { label: 'Over $200', range: [200, Infinity] },
];

function PriceFilter({ globalMin, globalMax, selectedPresets, onTogglePreset, customRange, onCustomRange }) {
  const [custom, setCustom] = useState(false);
  const [customMin, setCustomMin] = useState('');
  const [customMax, setCustomMax] = useState('');

  return (
    <div className="space-y-1.5 pt-1">
      {PRICE_PRESETS.map((preset, i) => (
        <label key={preset.label} className="flex items-center gap-2 cursor-pointer text-sm px-0.5">
          <input
            type="checkbox"
            checked={selectedPresets.includes(i)}
            onChange={() => onTogglePreset(i)}
            className="accent-primary w-4 h-4"
          />
          <span>{preset.label}</span>
        </label>
      ))}
      <button
        onClick={() => { setCustom((v) => !v); setCustomMin(''); setCustomMax(''); onCustomRange(null); }}
        className={`w-full text-left rounded-lg px-2.5 py-1.5 text-sm transition-colors ${custom ? 'bg-primary/10 text-primary font-semibold' : 'hover:bg-muted/50 text-ink'}`}
      >
        Custom
      </button>
      {custom && (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="number"
            min={globalMin}
            value={customMin}
            onChange={(e) => {
              setCustomMin(e.target.value);
              const min = e.target.value === '' ? globalMin : Number(e.target.value);
              const max = customMax === '' ? globalMax : Number(customMax);
              onCustomRange([min, max]);
            }}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <span className="text-muted-foreground text-sm shrink-0">—</span>
          <input
            type="number"
            max={globalMax}
            value={customMax}
            onChange={(e) => {
              setCustomMax(e.target.value);
              const min = customMin === '' ? globalMin : Number(customMin);
              const max = e.target.value === '' ? globalMax : Number(e.target.value);
              onCustomRange([min, max]);
            }}
            className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
      )}
    </div>
  );
}

function CheckGroup({ options, selected, onChange }) {
  const toggle = (opt) =>
    onChange(selected.includes(opt) ? selected.filter((x) => x !== opt) : [...selected, opt]);
  return (
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
            className="accent-primary w-4 h-4"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}

function FilterSection({ title, children, defaultOpen = true, last = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={last ? 'pb-4' : 'border-b border-border pb-4'}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 text-sm font-semibold text-ink"
      >
        {title}
        <span className="text-muted-foreground">{open ? '−' : '+'}</span>
      </button>
      {open && children}
    </div>
  );
}

function matchesExtra(product, key, selected) {
  if (!selected || selected.length === 0) return true;
  const field = EXTRA_FILTER_FIELD[key];
  const val = product[field];
  if (!val) return false;
  // Array field: product must have at least one selected option
  if (Array.isArray(val)) return selected.some((s) => val.includes(s));
  // String field: product value must be in selected list
  return selected.includes(val);
}

export default function CategoryFilters({ slug, products }) {
  const t = useTranslations('categoryFilters');
  const locale = useLocale();
  const config = CATEGORY_FILTERS[slug] || { brands: [], extraFilters: [] };

  const prices = products.map((p) => p.price);
  const globalMin = Math.floor(Math.min(...prices));
  const globalMax = Math.ceil(Math.max(...prices));

  const [selectedPricePresets, setSelectedPricePresets] = useState([]);
  const [customPriceRange, setCustomPriceRange] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [extraSelected, setExtraSelected] = useState({});
  const [minRating, setMinRating] = useState(null);
  const [sort, setSort] = useState('popularity');
  const [mobileOpen, setMobileOpen] = useState(false);

  const togglePricePreset = (i) =>
    setSelectedPricePresets((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );

  const priceMatches = (price) => {
    if (customPriceRange) return price >= customPriceRange[0] && price <= customPriceRange[1];
    if (selectedPricePresets.length === 0) return true;
    return selectedPricePresets.some((i) => {
      const r = PRICE_PRESETS[i].range;
      return price >= r[0] && (r[1] === Infinity ? true : price <= r[1]);
    });
  };

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        priceMatches(p.price) &&
        (selectedBrands.length === 0 || selectedBrands.includes(p.brand)) &&
        (minRating === null || Math.round(p.rating) >= minRating) &&
        config.extraFilters.every((ef) => matchesExtra(p, ef.key, extraSelected[ef.key]))
    );
    return list;
  }, [products, selectedPricePresets, customPriceRange, selectedBrands, minRating, extraSelected, config.extraFilters]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === 'price_asc') return arr.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') return arr.sort((a, b) => b.price - a.price);
    if (sort === 'top_rated') return arr.sort((a, b) => b.rating - a.rating);
    if (sort === 'new_arrivals') return arr.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
    return arr.sort((a, b) => b.reviews - a.reviews);
  }, [filtered, sort]);

  const hasActiveFilters =
    selectedBrands.length > 0 ||
    minRating !== null ||
    Object.values(extraSelected).some((v) => v?.length > 0) ||
    selectedPricePresets.length > 0 ||
    customPriceRange !== null;

  const clearAll = () => {
    setSelectedPricePresets([]);
    setCustomPriceRange(null);
    setSelectedBrands([]);
    setExtraSelected({});
    setMinRating(null);
  };

  const sidebar = (
    <aside className="space-y-0">
      <div className="flex items-center justify-between mb-3">
        <span className="text-base font-bold text-ink">{t('filters')}</span>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs text-primary hover:underline">
            {t('clearAll')}
          </button>
        )}
      </div>

      <FilterSection title={t('priceRange')}>
        <PriceFilter
          globalMin={globalMin}
          globalMax={globalMax}
          selectedPresets={selectedPricePresets}
          onTogglePreset={togglePricePreset}
          customRange={customPriceRange}
          onCustomRange={setCustomPriceRange}
        />
      </FilterSection>

      {config.brands.length > 0 && (
        <FilterSection title={t('brand')}>
          <CheckGroup options={config.brands} selected={selectedBrands} onChange={setSelectedBrands} />
        </FilterSection>
      )}

      {config.extraFilters.map((ef) => (
        <FilterSection key={ef.key} title={t(`extraFilters.${ef.key}.label`)}>
          <CheckGroup
            options={t.raw(`extraFilters.${ef.key}.options`)}
            selected={extraSelected[ef.key] || []}
            onChange={(val) => setExtraSelected((prev) => ({ ...prev, [ef.key]: val }))}
          />
        </FilterSection>
      ))}

      <FilterSection title={t('customerRating')} last>
        <RatingFilter selected={minRating} onChange={setMinRating} />
      </FilterSection>
    </aside>
  );

  return (
    <>
      {/* Top bar */}
      <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="14" y2="18" />
            </svg>
            {t('filters')}
            {hasActiveFilters && <span className="h-2 w-2 rounded-full bg-primary" />}
          </button>
          <span className="text-sm text-muted-foreground hidden sm:block">
            {sorted.length} {sorted.length === 1 ? t('product') : t('products')}
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5">
          <label htmlFor="sort-select" className="text-sm font-medium text-muted-foreground whitespace-nowrap">
            {t('sortBy')}
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-transparent text-sm font-semibold text-ink focus:outline-none cursor-pointer"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <div className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-4 rounded-xl border border-border bg-surface p-4">
            {sidebar}
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground gap-2">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <p>{t('noProducts')}</p>
              <button onClick={clearAll} className="text-sm text-primary hover:underline mt-1">
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {sorted.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 start-0 w-72 bg-surface p-5 overflow-y-auto shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-base font-bold text-ink">{t('filters')}</span>
              <button onClick={() => setMobileOpen(false)} className="text-muted-foreground hover:text-ink">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            {sidebar}
            <button
              onClick={() => setMobileOpen(false)}
              className="mt-6 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white"
            >
              {t('showResults', { count: sorted.length })}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
