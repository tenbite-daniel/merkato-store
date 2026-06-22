'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'merkato_wishlist';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const load = () => {
      try {
        const stored = localStorage.getItem(KEY);
        setWishlist(stored ? JSON.parse(stored) : []);
      } catch {}
    };
    load();
    window.addEventListener('wishlist-updated', load);
    return () => window.removeEventListener('wishlist-updated', load);
  }, []);

  const toggle = useCallback((productId) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
    window.dispatchEvent(new Event('wishlist-updated'));
  }, []);

  const isWishlisted = useCallback((productId) => wishlist.includes(productId), [wishlist]);

  return { wishlist, toggle, isWishlisted };
}
