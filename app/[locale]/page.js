import HeroSlider from '@/components/home/HeroSlider';
import CategoryGrid from '@/components/home/CategoryGrid';
import ProductSection from '@/components/home/ProductSection';
import { products } from '@/lib/products';

const featured = products.filter((p) => p.badge === 'Best Seller' || p.badge === 'New').slice(0, 8);
const newArrivals = products.filter((p) => p.badge === 'New' || p.oldPrice).slice(0, 8);

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <CategoryGrid />
      <ProductSection translationKey="featured" products={featured} viewAllHref="/shop" />
      <ProductSection translationKey="newArrivals" products={newArrivals} viewAllHref="/shop" />
    </div>
  );
}
