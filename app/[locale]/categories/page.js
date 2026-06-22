import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { categories, products } from '@/lib/products';
import CategoryPageCard from '@/components/categories/CategoryPageCard';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });
  return { title: t('shopByCategory') };
}

export default async function CategoriesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories' });
  const tNav = await getTranslations({ locale, namespace: 'bottomNav' });

  const categoriesWithCount = categories.map((cat) => ({
    ...cat,
    count: products.filter((p) => p.categorySlug === cat.slug).length,
  }));

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          {tNav('home')}
        </Link>
        <span className="mx-1">›</span>
        <span className="font-semibold text-primary">{t('shopByCategory')}</span>
      </nav>

      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-ink">{t('shopByCategory')}</h1>
      <p className="mt-1 mb-8 text-muted-foreground">{t('pageSubtitle')}</p>

      {/* Grid: 3 cols desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesWithCount.map((cat) => (
          <CategoryPageCard key={cat.slug} category={cat} />
        ))}
      </div>
    </div>
  );
}
