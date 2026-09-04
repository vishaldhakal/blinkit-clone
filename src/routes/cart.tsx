import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Blinkit" },
      { name: "description", content: "Review your cart and check out in a tap." },
      { property: "og:title", content: "Your Cart — Blinkit" },
      { property: "og:description", content: "Review your cart and check out in a tap." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, add, remove, total, savings, clear, count } = useCart();
  const handling = count > 0 ? 9 : 0;
  const delivery = total >= 199 || count === 0 ? 0 : 25;

  if (count === 0) {
    return (
      <div className="mx-auto grid max-w-[1280px] place-items-center px-4 py-24 text-center">
        <ShoppingCart className="size-14 text-ink-soft" />
        <h1 className="mt-4 text-2xl font-bold text-ink">Your cart is empty</h1>
        <p className="mt-2 text-ink-soft">Add items to get started.</p>
        <Link
          to="/"
          className="mt-6 rounded-lg bg-brand px-6 py-3 font-bold text-primary-foreground"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold text-ink">My Cart</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-border rounded-lg border border-border">
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-4 p-4">
              <Link
                to="/prn/$slug"
                params={{ slug: product.slug }}
                className="grid size-16 shrink-0 place-items-center rounded-md text-3xl"
                style={{ backgroundColor: product.tint }}
                aria-label={product.name}
              >
                <span aria-hidden>{product.emoji}</span>
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to="/prn/$slug"
                  params={{ slug: product.slug }}
                  className="line-clamp-2 text-sm font-semibold text-ink"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-ink-soft">{product.unit}</p>
              </div>
              <div className="flex items-center gap-3 rounded-md bg-brand px-3 py-1.5 text-sm font-bold text-primary-foreground">
                <button onClick={() => remove(product.id)} aria-label="Decrease quantity">
                  −
                </button>
                <span className="min-w-4 text-center">{qty}</span>
                <button onClick={() => add(product.id)} aria-label="Increase quantity">
                  +
                </button>
              </div>
              <div className="w-20 text-right text-sm font-bold text-ink">
                ₹{product.price * qty}
              </div>
            </div>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-border p-4">
          <h2 className="text-lg font-bold text-ink">Bill details</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Items total</dt>
              <dd className="font-semibold text-ink">₹{total}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Delivery charge</dt>
              <dd className="font-semibold text-brand">{delivery === 0 ? "FREE" : `₹${delivery}`}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Handling charge</dt>
              <dd className="font-semibold text-ink">₹{handling}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-bold text-ink">
              <dt>Grand total</dt>
              <dd>₹{total + delivery + handling}</dd>
            </div>
          </dl>
          {savings > 0 && (
            <p className="mt-3 rounded-md bg-brand-soft px-3 py-2 text-sm font-semibold text-brand">
              You saved ₹{savings} on this order
            </p>
          )}
          <button className="mt-4 w-full rounded-lg bg-brand py-3 font-bold text-primary-foreground hover:bg-brand-dark">
            Proceed to Pay ₹{total + delivery + handling}
          </button>
          <button onClick={clear} className="mt-3 w-full text-sm text-ink-soft hover:text-ink">
            Clear cart
          </button>
        </aside>
      </div>
    </div>
  );
}
