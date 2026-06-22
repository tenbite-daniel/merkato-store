'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Icon } from './Icon';
import { products, categories } from '@/lib/products';
import { MobileMenu } from './MobileMenu';
import { useWishlist } from '@/lib/useWishlist';
import { useCart } from '@/lib/useCart';

// Each mega menu item: image + the product id to link to (or null to fall back to category page)
const megaMenuData = {
  electronics: [
    { image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80', productId: 'nexar-pro-x-smartphone' },
    { image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80', productId: 'techcorp-probook-x' },
    { image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80', productId: 'acoustic-over-ear-headphones' },
  ],
  fashion: [
    { image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=300&q=80', productId: 'heritage-leather-satchel' },
    { image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80', productId: 'athletic-running-shoes' },
    { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80', productId: null },
  ],
  groceries: [
    { image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80', productId: 'ethiopian-yirgacheffe-coffee' },
    { image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80', productId: 'organic-dates-premium' },
    { image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=300&q=80', productId: null },
  ],
  beauty: [
    { image: 'https://images.unsplash.com/photo-1522335789203-aaa28dc4dffe?auto=format&fit=crop&w=300&q=80', productId: 'african-black-soap' },
    { image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=300&q=80', productId: 'shea-butter-moisturiser' },
    { image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=300&q=80', productId: null },
  ],
  household: [
    { image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80', productId: 'artisanal-ceramic-vases-set' },
    { image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80', productId: 'bamboo-kitchen-set' },
    { image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80', productId: null },
  ],
  accessories: [
    { image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80', productId: 'gold-statement-necklace' },
    { image: 'https://images.unsplash.com/photo-1627123424574-724758594785?auto=format&fit=crop&w=300&q=80', productId: 'leather-minimalist-wallet' },
    { image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=300&q=80', productId: null },
  ],
};

const currencies = [
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
  { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
  { code: 'ETB', symbol: 'Br', label: 'Ethiopian Birr' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
  { code: 'SAR', symbol: 'ر.س', label: 'Saudi Riyal' },
  { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound' },
];

const langs = [
  { code: 'en', label: 'English', flagSrc: 'https://flagcdn.com/w20/gb.png' },
  { code: 'ar', label: 'العربية', flagSrc: 'https://flagcdn.com/w20/sa.png' },
];

export function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [currency, setCurrency] = useState('USD');
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const { wishlist } = useWishlist();
  const { totalItems: cartCount } = useCart();

  const searchRef = useRef(null);
  const langRef = useRef(null);
  const currencyRef = useRef(null);
  const megaTimer = useRef(null);

  useEffect(() => {
    const h = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) setSearchOpen(false);
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (currencyRef.current && !currencyRef.current.contains(e.target)) setCurrencyOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const suggestions =
    q.trim().length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(q.toLowerCase()) ||
              p.category.toLowerCase().includes(q.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    setSearchOpen(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(q)}`);
  };

  const switchLocale = (newLocale) => {
    setLangOpen(false);
    // Replace the current locale segment in the path
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/') || '/');
  };

  const [megaAlign, setMegaAlign] = useState({});
  const categoryRefs = useRef({});

  const openMega = (slug) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    const el = categoryRefs.current[slug];
    if (el) {
      const rect = el.getBoundingClientRect();
      // If the popup (520px wide) would overflow the viewport, align right
      setMegaAlign((prev) => ({ ...prev, [slug]: rect.left + 520 > window.innerWidth ? 'right-0' : 'left-0' }));
    }
    setActiveMega(slug);
  };

  const closeMega = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  // Build mega menu items from translations
  const megaMenu = Object.fromEntries(
    Object.entries(megaMenuData).map(([catKey, items]) => {
      const labels = t.raw(`megaMenu.${catKey}`);
      return [
        catKey,
        items.slice(0, 3).map((item, i) => ({
          label: labels[i] ?? labels[0],
          image: item.image,
          href: item.productId
            ? `/${locale}/product/${item.productId}`
            : `/${locale}/categories/${catKey}`,
        })),
      ];
    })
  );

  return (
    <>
      {/* ── Entire top section is sticky ── */}
      <div className="sticky top-0 z-40 w-full">

        {/* ── Top utility bar ── */}
        <div className="hidden lg:block w-full bg-ink text-white text-xs relative z-50">
          <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-2">
            <span className="flex items-center gap-1.5 opacity-80">
              <Icon name="local_shipping" className="!text-[14px]" />
              {t('topBar.shipping')}
            </span>
            <div className="flex items-center gap-4 opacity-80">
              <span>{t('topBar.serving')}</span>
              <span className="h-3 w-px bg-white/30" />

              {/* Language picker */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => { setLangOpen((v) => !v); setCurrencyOpen(false); }}
                  className="flex items-center gap-1 hover:text-gold transition-colors"
                >
                  <Icon name="language" className="!text-[13px]" />
                  {locale.toUpperCase()}
                  <Icon name="expand_more" className="!text-[12px]" />
                </button>
                {langOpen && (
                  <div className="fixed z-[9999] w-36 rounded-lg border border-white/10 bg-ink shadow-xl py-1 overflow-hidden"
                    style={{ top: langRef.current?.getBoundingClientRect().bottom + 6, right: window.innerWidth - langRef.current?.getBoundingClientRect().right }}>
                    {langs.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs hover:bg-white/10 transition-colors ${locale === l.code ? 'text-gold font-semibold' : 'text-white/80'}`}
                      >
                        <span className="flex items-center gap-1.5"><Image src={l.flagSrc} alt={l.label} width={16} height={12} className="rounded-[2px]" /> {l.label}</span>
                        {locale === l.code && <Icon name="check" className="!text-[12px] text-gold" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="h-3 w-px bg-white/30" />

              {/* Currency picker */}
              <div ref={currencyRef} className="relative">
                <button
                  onClick={() => { setCurrencyOpen((v) => !v); setLangOpen(false); }}
                  className="flex items-center gap-1 hover:text-gold transition-colors"
                >
                  <Icon name="attach_money" className="!text-[13px]" />
                  {currency}
                  <Icon name="expand_more" className="!text-[12px]" />
                </button>
                {currencyOpen && (
                  <div className="fixed z-[9999] w-44 rounded-lg border border-white/10 bg-ink shadow-xl py-1 overflow-hidden"
                    style={{ top: currencyRef.current?.getBoundingClientRect().bottom + 6, right: window.innerWidth - currencyRef.current?.getBoundingClientRect().right }}>
                    {currencies.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-xs hover:bg-white/10 transition-colors ${currency === c.code ? 'text-gold font-semibold' : 'text-white/80'}`}
                      >
                        <span>{c.symbol} {c.label}</span>
                        {currency === c.code && <Icon name="check" className="!text-[12px] text-gold" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <span className="h-3 w-px bg-white/30" />
              <Link href={`/${locale}/login`} className="hover:opacity-100 hover:text-gold transition-colors">
                {t('topBar.signIn')}
              </Link>
            </div>
          </div>
        </div>

        {/* ── Main header row ── */}
        <header className="w-full border-b border-border bg-surface shadow-sm">
          <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-4 px-4 md:px-8">
            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden h-10 w-10 grid place-items-center rounded-md hover:bg-surface-soft text-primary-deep"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <Icon name="menu" />
            </button>

            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0 group">
              <div className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-white font-extrabold text-sm">
                M
              </div>
              <span className="text-xl md:text-2xl font-extrabold tracking-tight text-primary-deep group-hover:text-primary transition-colors">
                Merkato<span className="text-primary font-black">.</span>
              </span>
            </Link>

            {/* Search bar — desktop */}
            <div ref={searchRef} className="relative hidden lg:flex flex-1 max-w-2xl ml-auto">
              <form
                onSubmit={handleSearch}
                className="flex w-full items-center rounded-full border-2 border-primary/30 bg-surface-soft h-11 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 transition-all overflow-hidden"
              >
                <Icon name="search" className="ml-4 shrink-0 text-muted-foreground" />
                <input
                  className="flex-1 bg-transparent px-3 outline-none text-sm placeholder:text-muted-foreground"
                  placeholder={t('header.searchPlaceholder')}
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setSearchOpen(true); }}
                  onFocus={() => setSearchOpen(true)}
                />
                {q && (
                  <button type="button" onClick={() => setQ('')} className="px-2 text-muted-foreground hover:text-primary">
                    <Icon name="close" className="!text-[16px]" />
                  </button>
                )}
                <button
                  type="submit"
                  className="h-full px-5 bg-primary text-white text-sm font-semibold hover:bg-primary-deep transition-colors shrink-0"
                >
                  {t('header.search')}
                </button>
              </form>

              {/* Autocomplete dropdown */}
              {searchOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-12 z-50 mt-1 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                  <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                    {t('header.suggestions')}
                  </div>
                  {suggestions.map((p) => (
                    <Link
                      key={p.id}
                      href={`/${locale}/product/${p.id}`}
                      onClick={() => { setSearchOpen(false); setQ(''); }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-soft transition-colors"
                    >
                      <img src={p.image} alt="" className="h-10 w-10 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold truncate">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.category} · {p.brand}</div>
                      </div>
                      <div className="text-sm font-bold text-primary-deep shrink-0">${p.price}</div>
                    </Link>
                  ))}
                  <Link
                    href={`/${locale}/search?q=${encodeURIComponent(q)}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center justify-center gap-2 border-t border-border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-surface-soft"
                  >
                    {t('header.seeAll')} &ldquo;{q}&rdquo; <Icon name="arrow_forward" className="!text-[14px]" />
                  </Link>
                </div>
              )}
            </div>

            {/* Right icons */}
            <div className="ml-auto lg:ml-0 flex items-center gap-1">
              {/* Mobile search */}
              <Link
                href={`/${locale}/search`}
                className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-surface-soft text-primary-deep"
                aria-label={t('header.search')}
              >
                <Icon name="search" />
              </Link>

              {/* Wishlist */}
              <Link
                href={`/${locale}/account/wishlist`}
                className="relative flex flex-col items-center justify-center h-12 w-12 rounded-xl hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                aria-label={t('header.wishlist')}
              >
                <Icon name="favorite" className="!text-[22px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1 leading-none">
                    {wishlist.length > 99 ? '99+' : wishlist.length}
                  </span>
                )}
                <span className="text-[9px] font-semibold mt-0.5 leading-none">{t('header.wishlist')}</span>
              </Link>

              {/* Cart */}
              <Link
                href={`/${locale}/cart`}
                className="relative flex flex-col items-center justify-center h-12 w-12 rounded-xl hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
                aria-label={t('header.cart')}
              >
                <Icon name="shopping_cart" className="!text-[22px]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-white text-[10px] font-bold px-1 leading-none">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
                <span className="text-[9px] font-semibold mt-0.5 leading-none hidden md:block">{t('header.cart')}</span>
              </Link>

              {/* Auth buttons */}
              <div className="hidden md:flex items-center gap-2 ml-1">
                <Link
                  href={`/${locale}/login`}
                  className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-accent transition-colors"
                >
                  {t('header.signIn')}
                </Link>
                <Link
                  href={`/${locale}/register`}
                  className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors"
                >
                  {t('header.register')}
                </Link>
              </div>
            </div>
          </div>

          {/* ── Category nav bar — desktop only ── */}
          <nav className="hidden lg:block border-t border-border bg-surface">
            <div className="mx-auto flex max-w-[1280px] items-center px-8">
              <div className="flex items-center">
                {categories.map((c) => (
                  <div
                    key={c.slug}
                    ref={(el) => { categoryRefs.current[c.slug] = el; }}
                    className="relative"
                    onMouseEnter={() => openMega(c.slug)}
                    onMouseLeave={closeMega}
                  >
                    <Link
                      href={`/${locale}/categories/${c.slug}`}
                      className="flex items-center gap-1 h-11 px-4 text-sm font-semibold text-foreground/75 hover:text-primary hover:bg-surface-soft transition-colors whitespace-nowrap"
                    >
                      {t(`categories.${c.slug}`)}
                      {megaMenu[c.slug] && <Icon name="expand_more" className="!text-[14px] opacity-60" />}
                    </Link>

                    {/* Mega menu panel */}
                    {activeMega === c.slug && megaMenu[c.slug] && (
                      <div
                        className={`absolute top-full z-50 rounded-b-xl border border-border bg-surface shadow-xl ${megaAlign[c.slug] ?? 'left-0'}`}
                        style={{ minWidth: '520px' }}
                        onMouseEnter={() => openMega(c.slug)}
                        onMouseLeave={closeMega}
                      >
                        <div className="p-5">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                              {t('header.shopLabel')} {t(`categories.${c.slug}`)}
                            </span>
                            <Link
                              href={`/${locale}/categories/${c.slug}`}
                              onClick={() => setActiveMega(null)}
                              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                            >
                              {t('header.viewAll')} <Icon name="arrow_forward" className="!text-[12px]" />
                            </Link>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {megaMenu[c.slug].slice(0, 3).map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setActiveMega(null)}
                                className="group flex flex-col gap-2 rounded-lg overflow-hidden border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                              >
                                <div className="h-24 overflow-hidden bg-surface-soft">
                                  <img
                                    src={item.image}
                                    alt={item.label}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>
                                <span className="px-3 pb-2.5 text-xs font-semibold text-foreground/80 group-hover:text-primary">
                                  {item.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Promo strip */}
                        <div className="border-t border-border bg-surface-soft px-5 py-3 flex items-center gap-3 text-xs text-muted-foreground rounded-b-xl">
                          <Icon name="local_offer" className="!text-[14px] text-primary" />
                          <span>
                            {t('header.promoCode')} <strong className="text-primary">MERKATO10</strong> {t('header.promoSuffix')}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side links */}
              <div className="ml-auto flex items-center gap-5 text-sm">
                <Link href={`/${locale}/about`} className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">{t('header.about')}</Link>
                <Link href={`/${locale}/contact`} className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">{t('header.contact')}</Link>
                <Link href={`/${locale}/faq`} className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">{t('header.faq')}</Link>
                <Link href={`/${locale}/search`} className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent transition-colors whitespace-nowrap">
                  <Icon name="local_offer" className="!text-[14px]" /> {t('header.deals')}
                </Link>
              </div>
            </div>
          </nav>
        </header>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Promo announcement banner ── */}
      <div className="w-full bg-[#8B2500] text-white text-sm text-center py-2.5 px-4">
        {t('promoBanner')}{' '}
        <Link href={`/${locale}/deals`} className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">
          {t('promoBannerCta')}
        </Link>
      </div>
    </>
  );
}
