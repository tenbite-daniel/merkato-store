'use client';

import { useState, useEffect } from 'react';

const KEY = 'merkato_cart';
const EVENT = 'merkato_cart_change';

function readCart() {
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

export function useCart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(readCart());

    const sync = () => setCart(readCart());
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  function addToCart({ id, name, image, price, qty = 1, variantKey, variantLabel }) {
    const key = variantKey ? `${id}__${variantKey}` : id;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      const updated = existing
        ? prev.map((item) =>
            item.key === key ? { ...item, qty: item.qty + qty } : item
          )
        : [...prev, { key, id, name, image, price, qty, variantKey, variantLabel }];
      save(updated);
      return updated;
    });
  }

  function updateQty(key, newQty) {
    setCart((prev) => {
      const updated = newQty < 1
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) => item.key === key ? { ...item, qty: newQty } : item);
      save(updated);
      return updated;
    });
  }

  function removeItem(key) {
    setCart((prev) => {
      const updated = prev.filter((item) => item.key !== key);
      save(updated);
      return updated;
    });
  }

  function clearCart() {
    save([]);
    setCart([]);
  }

  const totalItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + (item.price ?? 0) * (item.qty ?? 1), 0);

  return { cart, totalItems, totalPrice, addToCart, updateQty, removeItem, clearCart };
}
