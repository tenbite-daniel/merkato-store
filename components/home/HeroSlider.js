'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';

const slideImages = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=2000&q=80',
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=2000&q=80',
];

const slideHrefs = ['/categories/electronics', '/categories/fashion', '/categories/electronics'];

export default function HeroSlider() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const slides = t.raw('slides');
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[current];

  return (
    <section className="mx-auto max-w-[1280px] px-4 md:px-8 pt-6">
      <div className="relative overflow-hidden rounded-2xl">
        {slideImages.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={slides[i].highlight}
            fill
            className={`object-cover transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="100vw"
            priority={i === 0}
          />
        ))}

        <div className="h-[420px] md:h-[520px]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-8 md:p-14 max-w-xl">
          <span className="self-start rounded-full bg-gold px-3 py-1 text-xs font-bold tracking-wider text-ink">
            {slide.badge}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-white">
            {slide.title}{' '}
            <span className="text-gold">{slide.highlight}</span>
          </h1>
          <p className="text-white/90 text-base">{slide.subtitle}</p>
          <Link
            href={`/${locale}${slideHrefs[current]}`}
            className="self-start mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-deep transition-colors"
          >
            {slide.cta}{' '}
            <span className="material-symbols-outlined !text-[18px]">arrow_forward</span>
          </Link>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
