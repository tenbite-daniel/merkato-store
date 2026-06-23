'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/home/ProductCard';

const PAGE_SIZE = 12;

const SORT_OPTIONS = [
  { value: 'default', labelKey: 'sortDefault' },
  { value: 'price_asc', labelKey: 'priceAsc' },
  { value: 'price_desc', labelKey: 'priceDesc' },
  { value: 'top_rated', labelKey: 'topRated' },
];

const PRICE_PRESETS = [
  { label: 'Under $50', range: [0, 50] },
  { label: '$50 – $100', range: [50, 100] },
  { label: '$100 – $300', range: [100, 300] },
  { label: 'Over $300', range: [300, Infinity] },
];

export default function DealsFilters({ products }) {
  const t = useTranslations('deals');

  const [sort, setSort] = useState('default');
  const [selectedPresets, setSelectedPresets] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);

  const categories = useMemo(
    () => [...new Set(products.map((p) => p.category))],
    [products]
  );

  const togglePreset = (i) => {
    setSelectedPresets((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
    setPage(1);
  };

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((x) => x !== cat) : [...prev, cat]
    );
    setPage(1);
  };

  const priceMatches = (price) => {
    if (selectedPresets.length === 0) return true;
    return selectedPresets.some((i) => {
      const [min, max] = PRICE_PRESETS[i].range;
      return price >= min && (max === Infinity || price <= max);
    });
  };

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        priceMatches(p.price) &&
        (selectedCategories.length === 0 || selectedCategories.includes(p.category))
    );
    if (sort === 'price_asc') return list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') return list.sort((a, b) => b.price - a.price);
    if (sort === 'top_rated') return list.sort((a, b) => b.rating - a.rating);
    return list.sort((a, b) => b.reviews - a.reviews);
  }, [products, selectedPresets, selectedCategories, sort]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasFilters = selectedPresets.length > 0 || selectedCategories.length > 0;

  const clearAll = () => {
    setSelectedPresets([]);
    setSelectedCategories([]);
    setPage(1);
  };

  return (
    <>
      {/* Filter & Sort Bar */}
      <div className="mb-6 rounded-xl border border-border bg-surface p-4 flex flex-wrap gap-6">
        {/* Categories */}
        <div className="flex-1 min-w-[180px]">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t('filterCategory')}
          </p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                  selectedCategories.includes(cat)
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-ink hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex-1 min-w-[180px]">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            {t('filterPrice')}
          </p>
          <div className="flex flex-wrap gap-2">
            {PRICE_PRESETS.map((preset, i) => (
              <button
                key={preset.label}
                onClick={() => togglePreset(i)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors border ${
                  selectedPresets.includes(i)
                    ? 'bg-primary text-white border-primary'
                    : 'border-border text-ink hover:border-primary hover:text-primary'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort + Clear */}
        <div className="flex items-end gap-3 flex-wrap">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
            <label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
              {t('sortBy')}
            </label>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="bg-transparent text-sm font-semibold text-ink focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{t(o.labelKey)}</option>
              ))}
            </select>
          </div>
          {hasFilters && (
            <button onClick={clearAll} className="text-xs text-primary hover:underline whitespace-nowrap">
              {t('clearAll')}
            </button>
          )}
        </div>
      </div>

      {/* Count */}
      <p className="mb-4 text-sm text-muted-foreground">
        <strong className="text-foreground">{filtered.length}</strong> {t('itemsOnSale')}
      </p>

      {/* Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="py-24 text-center text-muted-foreground">{t('noDeals')}</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                n === page
                  ? 'bg-primary text-white border-primary'
                  : 'border-border text-ink hover:border-primary hover:text-primary'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium disabled:opacity-40 hover:border-primary hover:text-primary transition-colors"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
