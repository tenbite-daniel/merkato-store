'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { products, categories } from '@/lib/products';
import { MobileMenu } from './MobileMenu';

const megaMenu = {
  electronics: [
    { label: 'Smartphones', slug: 'electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=300&q=80' },
    { label: 'Laptops', slug: 'electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=300&q=80' },
    { label: 'Headphones', slug: 'electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
    { label: 'Cameras', slug: 'electronics', image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=300&q=80' },
    { label: 'Smartwatches', slug: 'electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&q=80' },
  ],
  fashion: [
    { label: 'Bags & Leather', slug: 'fashion', image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=300&q=80' },
    { label: 'Shoes', slug: 'fashion', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80' },
    { label: 'Clothing', slug: 'fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80' },
  ],
  groceries: [
    { label: 'Coffee & Tea', slug: 'groceries', image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=300&q=80' },
    { label: 'Fresh Produce', slug: 'groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80' },
    { label: 'Pantry', slug: 'groceries', image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=300&q=80' },
  ],
  beauty: [
    { label: 'Skincare', slug: 'beauty', image: 'https://images.unsplash.com/photo-1522335789203-aaa28dc4dffe?auto=format&fit=crop&w=300&q=80' },
    { label: 'Haircare', slug: 'beauty', image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?auto=format&fit=crop&w=300&q=80' },
    { label: 'Fragrance', slug: 'beauty', image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=300&q=80' },
  ],
  household: [
    { label: 'Décor', slug: 'household', image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80' },
    { label: 'Kitchen', slug: 'household', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=300&q=80' },
    { label: 'Textiles', slug: 'household', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=300&q=80' },
  ],
  accessories: [
    { label: 'Jewellery', slug: 'accessories', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80' },
    { label: 'Wallets', slug: 'accessories', image: 'https://images.unsplash.com/photo-1627123424574-724758594785?auto=format&fit=crop&w=300&q=80' },
    { label: 'Hats & More', slug: 'accessories', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=300&q=80' },
  ],
};

export function Header() {
  const [q, setQ] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [lang, setLang] = useState('EN');
  const [currency, setCurrency] = useState('USD');
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const router = useRouter();
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
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const openMega = (slug) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setActiveMega(slug);
  };

  const closeMega = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 120);
  };

  const langs = [
    { code: 'EN', label: 'English' },
    { code: 'AR', label: 'العربية' },
  ];

  const currencies = [
    { code: 'USD', symbol: '$', label: 'US Dollar' },
    { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
    { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
    { code: 'ETB', symbol: 'Br', label: 'Ethiopian Birr' },
    { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
    { code: 'SAR', symbol: 'ر.س', label: 'Saudi Riyal' },
    { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound' },
  ];

  return (
    <>
      {/* ── Top utility bar ── */}
      <div className="hidden lg:block w-full bg-ink text-white text-xs relative z-50">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-2">
          <span className="flex items-center gap-1.5 opacity-80">
            <Icon name="local_shipping" className="!text-[14px]" />
            Free shipping on orders over $100 across Africa &amp; the Middle East
          </span>
          <div className="flex items-center gap-4 opacity-80">
            <span>🌍 Serving Nigeria · Kenya · Ethiopia · UAE · Egypt</span>
            <span className="h-3 w-px bg-white/30" />

            {/* Language picker */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => { setLangOpen((v) => !v); setCurrencyOpen(false); }}
                className="flex items-center gap-1 hover:text-gold transition-colors"
              >
                <Icon name="language" className="!text-[13px]" />
                {lang}
                <Icon name="expand_more" className="!text-[12px]" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-36 rounded-lg border border-white/10 bg-ink shadow-xl z-[100] py-1 overflow-hidden">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex w-full items-center justify-between px-3 py-2 text-xs hover:bg-white/10 transition-colors ${lang === l.code ? 'text-gold font-semibold' : 'text-white/80'}`}
                    >
                      <span>{l.label}</span>
                      {lang === l.code && <Icon name="check" className="!text-[12px] text-gold" />}
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
                <div className="absolute right-0 top-full mt-1.5 w-44 rounded-lg border border-white/10 bg-ink shadow-xl z-[100] py-1 overflow-hidden">
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
            <Link href="/login" className="hover:opacity-100 hover:text-gold transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-border bg-surface shadow-sm">
        {/* ── Main row ── */}
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
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
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
                placeholder="Search for products, brands, categories…"
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
                Search
              </button>
            </form>

            {/* Autocomplete dropdown */}
            {searchOpen && suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-12 z-50 mt-1 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
                <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border">
                  Suggestions
                </div>
                {suggestions.map((p) => (
                  <Link
                    key={p.id}
                    href={`/p/${p.id}`}
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
                  href={`/search?q=${encodeURIComponent(q)}`}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-center gap-2 border-t border-border px-4 py-2.5 text-sm font-semibold text-primary hover:bg-surface-soft"
                >
                  See all results for &ldquo;{q}&rdquo; <Icon name="arrow_forward" className="!text-[14px]" />
                </Link>
              </div>
            )}
          </div>

          {/* Right icons */}
          <div className="ml-auto lg:ml-0 flex items-center gap-1">
            {/* Mobile search */}
            <Link
              href="/search"
              className="lg:hidden h-10 w-10 grid place-items-center rounded-full hover:bg-surface-soft text-primary-deep"
              aria-label="Search"
            >
              <Icon name="search" />
            </Link>

            {/* Wishlist */}
            <Link
              href="/account/wishlist"
              className="relative hidden md:flex flex-col items-center justify-center h-12 w-12 rounded-xl hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
              aria-label="Wishlist"
            >
              <Icon name="favorite" className="!text-[22px]" />
              <span className="text-[9px] font-semibold mt-0.5 leading-none">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex flex-col items-center justify-center h-12 w-12 rounded-xl hover:bg-surface-soft text-foreground/70 hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <Icon name="shopping_cart" className="!text-[22px]" />
              <span className="text-[9px] font-semibold mt-0.5 leading-none hidden md:block">Cart</span>
            </Link>

            {/* Auth buttons */}
            <div className="hidden md:flex items-center gap-2 ml-1">
              <Link
                href="/login"
                className="rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary hover:bg-accent transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-deep transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>

        {/* ── Category nav bar — desktop only ── */}
        <nav className="hidden lg:block border-t border-border bg-surface">
          <div className="mx-auto flex max-w-[1280px] items-center px-8">
            <div className="flex items-center">
              {categories.map((c, i) => (
                <div
                  key={c.slug}
                  className="relative"
                  onMouseEnter={() => openMega(c.slug)}
                  onMouseLeave={closeMega}
                >
                  <Link
                    href={`/shop/${c.slug}`}
                    className="flex items-center gap-1 h-11 px-4 text-sm font-semibold text-foreground/75 hover:text-primary hover:bg-surface-soft transition-colors whitespace-nowrap"
                  >
                    {c.name}
                    {megaMenu[c.slug] && <Icon name="expand_more" className="!text-[14px] opacity-60" />}
                  </Link>

                  {/* Mega menu panel */}
                  {activeMega === c.slug && megaMenu[c.slug] && (
                    <div
                      className={`absolute top-full z-50 rounded-b-xl border border-border bg-surface shadow-xl ${i >= categories.length - 2 ? 'right-0' : 'left-0'}`}
                      style={{ minWidth: '520px' }}
                      onMouseEnter={() => openMega(c.slug)}
                      onMouseLeave={closeMega}
                    >
                      <div className="p-5">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            Shop {c.name}
                          </span>
                          <Link
                            href={`/shop/${c.slug}`}
                            onClick={() => setActiveMega(null)}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            View all <Icon name="arrow_forward" className="!text-[12px]" />
                          </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {megaMenu[c.slug].map((item) => (
                            <Link
                              key={item.label}
                              href={`/shop/${item.slug}`}
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
                          Use code <strong className="text-primary">MERKATO10</strong> for 10% off your first order
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right side links */}
            <div className="ml-auto flex items-center gap-5 text-sm">
              <Link href="/about" className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">About</Link>
              <Link href="/contact" className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">Contact</Link>
              <Link href="/faq" className="font-medium text-foreground/70 hover:text-primary transition-colors whitespace-nowrap">FAQ</Link>
              <Link href="/search" className="flex items-center gap-1.5 rounded-full border border-primary/30 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-accent transition-colors whitespace-nowrap">
                <Icon name="local_offer" className="!text-[14px]" /> Deals
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* ── Promo announcement banner ── */}
      <div className="w-full bg-[#8B2500] text-white text-sm text-center py-2.5 px-4">
        🎉 Huge Holiday Sale: Up to 50% off!{' '}
        <Link href="/deals" className="font-bold underline underline-offset-2 hover:opacity-80 transition-opacity">
          Shop Now
        </Link>
      </div>
    </>
  );
}
