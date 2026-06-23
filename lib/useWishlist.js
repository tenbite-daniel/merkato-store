'use client';

import { useState, useEffect } from 'react';

const KEY = 'merkato_wishlist';
const EVENT = 'merkato_wishlist_change';

function readWishlist() {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function save(updated) {
  localStorage.setItem(KEY, JSON.stringify(updated));
  setTimeout(() => window.dispatchEvent(new CustomEvent(EVENT)), 0);
}

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setWishlist(readWishlist());

    const sync = () => setWishlist(readWishlist());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function toggle(id) {
    setWishlist((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      save(updated);
      return updated;
    });
  }

  function isWishlisted(id) {
    return wishlist.includes(id);
  }

  return { wishlist, toggle, isWishlisted };
}
