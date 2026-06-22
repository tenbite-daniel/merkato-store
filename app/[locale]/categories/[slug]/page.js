import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { categories, byCategory } from '@/lib/products';
import { notFound } from 'next/navigation';
import CategoryFilters from '@/components/categories/CategoryFilters';

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });
  return { title: t(slug) };
}

export default async function CategoryPage({ params }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });
  const tNav = await getTranslations({ locale, namespace: 'bottomNav' });

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = byCategory(slug);

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href={`/${locale}`} className="hover:text-primary transition-colors">
          {tNav('home')}
        </Link>
        <span className="mx-1">›</span>
        <Link href={`/${locale}/categories`} className="hover:text-primary transition-colors">
          {t('shopByCategory')}
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-primary">{t(slug)}</span>
      </nav>

      <h1 className="text-3xl font-extrabold text-ink mb-2">{t(slug)}</h1>
      <p className="mb-8 text-muted-foreground">{t(`${slug}Blurb`)}</p>

      <CategoryFilters slug={slug} products={categoryProducts} />
    </div>
  );
}
