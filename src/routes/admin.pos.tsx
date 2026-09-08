import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Search, Trash2 } from "lucide-react";
import { categories, products } from "@/lib/data";
import { useAdmin, type Order } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/pos")({
  head: () => ({
    meta: [
      { title: "POS Counter — Blinkit Clone Ops" },
      { name: "description", content: "Ring up walk-in and phone orders at the counter with instant billing." },
      { property: "og:title", content: "POS Counter — Blinkit Clone Ops" },
      { property: "og:description", content: "Ring up walk-in and phone orders with instant billing." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Pos,
});

const payments: Order["payment"][] = ["Cash", "Card", "UPI"];

function Pos() {
  const { createOrder } = useAdmin();
  const [cat, setCat] = useState<string>("all");
  const [q, setQ] = useState("");
  const [lines, setLines] = useState<Record<string, number>>({});
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState<Order["payment"]>("Cash");
  const [placed, setPlaced] = useState<string | null>(null);

  const list = useMemo(() => {
    const base = cat === "all" ? products : products.filter((p) => p.category === cat);
    const needle = q.trim().toLowerCase();
    return (needle ? base.filter((p) => p.name.toLowerCase().includes(needle)) : base).slice(0, 24);
  }, [cat, q]);

  const items = Object.entries(lines)
    .map(([id, qty]) => ({ product: products.find((p) => p.id === id)!, qty }))
    .filter((l) => l.product && l.qty > 0);

  const sub = items.reduce((s, l) => s + l.qty * l.product.price, 0);
  const tax = Math.round(sub * 0.05);
  const total = sub + tax;

  const bump = (id: string, d: number) =>
    setLines((prev) => {
      const next = Math.max(0, (prev[id] ?? 0) + d);
      const copy = { ...prev };
      if (next === 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });

  const place = () => {
    if (!items.length) return;
    const id = createOrder({
      customer,
      address,
      payment,
      items: items.map((l) => ({ name: l.product.name, qty: l.qty, price: l.product.price })),
    });
    setPlaced(id);
    setLines({});
    setCustomer("");
    setAddress("");
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search product here…"
              aria-label="Search products"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none focus:border-brand"
            />
          </div>
          <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
            {products.length} items in stock
          </span>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[{ slug: "all", name: "All", emoji: "🧺" }, ...categories.slice(0, 10)].map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={`flex w-[110px] shrink-0 flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-colors ${
                cat === c.slug ? "border-brand bg-accent" : "border-border hover:bg-surface"
              }`}
            >
              <span className="text-xl">{c.emoji}</span>
              <span className="line-clamp-2 text-xs font-bold text-ink">{c.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const qty = lines[p.id] ?? 0;
            return (
              <div
                key={p.id}
                className={`rounded-2xl border p-3 transition-shadow ${qty ? "border-brand shadow-pop" : "border-border"}`}
              >
                <div className="grid h-24 place-items-center rounded-xl text-4xl" style={{ background: p.tint }}>
                  {p.emoji}
                </div>
                <p className="mt-2 line-clamp-2 text-sm font-bold text-ink">{p.name}</p>
                <p className="text-xs text-ink-soft">{p.unit}</p>
                <p className="mt-1 font-display font-extrabold text-brand">₹{p.price}</p>
                {qty === 0 ? (
                  <button
                    onClick={() => bump(p.id, 1)}
                    className="mt-2 h-9 w-full rounded-lg bg-accent text-sm font-bold text-accent-foreground hover:bg-brand hover:text-primary-foreground"
                  >
                    Add to bill
                  </button>
                ) : (
                  <div className="mt-2 flex h-9 items-center justify-between rounded-lg bg-brand px-1 text-primary-foreground">
                    <button onClick={() => bump(p.id, -1)} aria-label="Decrease" className="grid size-7 place-items-center">
                      <Minus className="size-4" />
                    </button>
                    <span className="text-sm font-bold">{qty}</span>
                    <button onClick={() => bump(p.id, 1)} aria-label="Increase" className="grid size-7 place-items-center">
                      <Plus className="size-4" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-fit rounded-2xl border border-border bg-card p-5 shadow-card xl:sticky xl:top-24">
        <h2 className="font-display text-xl font-extrabold text-ink">Current bill</h2>
        <p className="text-sm text-ink-soft">Counter 1 · Store Manager</p>

        <div className="mt-4 space-y-2">
          <input
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            placeholder="Customer name"
            className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-brand"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Delivery address (optional)"
            className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="mt-4 max-h-[320px] space-y-2 overflow-y-auto pr-1">
          {items.length === 0 && <p className="py-8 text-center text-sm text-ink-soft">No items yet. Tap a product.</p>}
          {items.map((l) => (
            <div key={l.product.id} className="flex items-center gap-3 rounded-xl border border-border p-2">
              <span className="grid size-11 place-items-center rounded-lg text-xl" style={{ background: l.product.tint }}>
                {l.product.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-ink">{l.product.name}</p>
                <p className="text-xs text-brand">
                  ₹{l.product.price} × {l.qty}
                </p>
              </div>
              <p className="text-sm font-bold text-ink">₹{l.qty * l.product.price}</p>
              <button onClick={() => bump(l.product.id, -l.qty)} aria-label="Remove" className="text-ink-soft hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1.5 rounded-2xl bg-surface p-4 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Sub total</span>
            <span>₹{sub}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Tax 5%</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 font-display text-lg font-extrabold text-ink">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {payments.map((p) => (
            <button
              key={p}
              onClick={() => setPayment(p)}
              className={`h-11 rounded-xl border text-sm font-bold ${
                payment === p ? "border-brand bg-accent text-accent-foreground" : "border-border text-ink-soft"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={place}
          disabled={!items.length}
          className="mt-4 h-12 w-full rounded-xl bg-brand text-base font-bold text-primary-foreground disabled:opacity-50"
        >
          Place order
        </button>

        {placed && (
          <p className="mt-3 rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-accent-foreground">
            Order #{placed} sent to the pack queue.
          </p>
        )}
      </div>
    </div>
  );
}
