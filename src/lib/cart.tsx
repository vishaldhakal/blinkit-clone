import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { products, type Product } from "./data";

export type CartLine = { id: string; qty: number };

type CartCtx = {
  lines: CartLine[];
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  items: { product: Product; qty: number }[];
  count: number;
  total: number;
  savings: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "blinkit-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((id: string) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id: string) => {
    setLines((prev) =>
      prev.flatMap((l) => (l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])),
    );
  }, []);

  const value = useMemo<CartCtx>(() => {
    const items = lines
      .map((l) => ({ product: products.find((p) => p.id === l.id)!, qty: l.qty }))
      .filter((i) => i.product);
    return {
      lines,
      qtyOf: (id) => lines.find((l) => l.id === id)?.qty ?? 0,
      add,
      remove,
      clear: () => setLines([]),
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      total: items.reduce((s, i) => s + i.qty * i.product.price, 0),
      savings: items.reduce(
        (s, i) => s + i.qty * Math.max(0, (i.product.mrp ?? i.product.price) - i.product.price),
        0,
      ),
    };
  }, [lines, add, remove]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
