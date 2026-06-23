'use client';

import { useWishlist } from '@/lib/useWishlist';

export function WishlistCount() {
  const { wishlist } = useWishlist();
  return <>{wishlist.length}</>;
}
