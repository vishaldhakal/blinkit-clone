import { Link } from "@tanstack/react-router";
import { Timer } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const { qtyOf, add, remove } = useCart();
  const qty = qtyOf(product.id);
  const off =
    product.mrp && product.mrp > product.price
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
      : 0;

  return (
    <div className="relative flex h-full w-[180px] shrink-0 flex-col rounded-lg border border-border bg-card p-3 transition-shadow hover:shadow-pop">
      {off > 0 && (
        <span className="absolute -top-px left-2 rounded-b-sm bg-[#256fef] px-1.5 py-0.5 text-[10px] font-bold leading-tight text-primary-foreground">
          {off}%
          <br />
          OFF
        </span>
      )}
      <Link
        to="/prn/$slug"
        params={{ slug: product.slug }}
        className="flex flex-col gap-2"
        aria-label={product.name}
      >
        <div
          className="grid h-[130px] place-items-center rounded-md text-[64px] leading-none"
          style={{ backgroundColor: product.tint }}
        >
          <span aria-hidden>{product.emoji}</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-ink-soft">
          <Timer className="size-3" /> 8 MINS
        </div>
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
          {product.name}
        </h3>
        <p className="text-xs text-ink-soft">{product.unit}</p>
      </Link>

      <div className="mt-auto flex items-center justify-between gap-1 pt-3">
        <div className="text-[13px] font-bold text-ink">
          ₹{product.price}
          {product.mrp && product.mrp > product.price && (
            <span className="ml-1 font-normal text-ink-soft line-through">₹{product.mrp}</span>
          )}
        </div>
        {qty === 0 ? (
          <button
            onClick={() => add(product.id)}
            className="rounded-md border border-brand bg-brand-soft px-4 py-1.5 text-xs font-bold uppercase text-brand transition-colors hover:bg-brand hover:text-primary-foreground"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2 rounded-md bg-brand px-2 py-1.5 text-xs font-bold text-primary-foreground">
            <button onClick={() => remove(product.id)} aria-label="Decrease quantity">
              −
            </button>
            <span className="min-w-4 text-center">{qty}</span>
            <button onClick={() => add(product.id)} aria-label="Increase quantity">
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
