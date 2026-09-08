import { createFileRoute, Link } from "@tanstack/react-router";
import { IndianRupee, Package, Timer, TrendingUp } from "lucide-react";
import { orderTotal, statusMeta, useAdmin, type OrderStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Live Dashboard — Blinkit Clone Ops" },
      { name: "description", content: "Realtime dark-store dashboard: live orders, sales, rider load and prep queue." },
      { property: "og:title", content: "Live Dashboard — Blinkit Clone Ops" },
      { property: "og:description", content: "Realtime dark-store dashboard for orders and riders." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

const bars = [32, 48, 41, 66, 58, 79, 94, 71, 88, 62, 75, 96];
const hours = ["9a", "10a", "11a", "12p", "1p", "2p", "3p", "4p", "5p", "6p", "7p", "8p"];

function Dashboard() {
  const { orders, riders, advance } = useAdmin();

  const live = orders.filter((o) => o.status !== "delivered");
  const revenue = orders.reduce((s, o) => s + orderTotal(o), 0);
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const avgEta = Math.round(live.reduce((s, o) => s + o.etaMin, 0) / Math.max(1, live.length));

  const counts = (Object.keys(statusMeta) as OrderStatus[]).map((s) => ({
    status: s,
    n: orders.filter((o) => o.status === s).length,
  }));

  const stats = [
    { label: "Live orders", value: live.length, sub: "in the pipeline", icon: Package },
    { label: "Sales today", value: `₹${revenue}`, sub: "+18% vs yesterday", icon: IndianRupee },
    { label: "Avg. ETA", value: `${avgEta} min`, sub: "promise 8 min", icon: Timer },
    { label: "Delivered", value: delivered, sub: `${riders.filter((r) => r.online).length} riders online`, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink-soft">{s.label}</p>
              <span className="grid size-9 place-items-center rounded-xl bg-accent text-accent-foreground">
                <s.icon className="size-[18px]" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-ink">{s.value}</p>
            <p className="mt-1 text-xs text-ink-soft">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-extrabold text-ink">Orders per hour</h2>
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">Today</span>
          </div>
          <div className="mt-6 flex h-48 items-end gap-2">
            {bars.map((b, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-brand/85 transition-all hover:bg-brand"
                  style={{ height: `${b}%` }}
                  title={`${b} orders`}
                />
                <span className="text-[11px] text-ink-soft">{hours[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <h2 className="font-display text-lg font-extrabold text-ink">Pipeline</h2>
          <div className="mt-4 space-y-3">
            {counts.map((c) => {
              const m = statusMeta[c.status];
              const pct = Math.round((c.n / Math.max(1, orders.length)) * 100);
              return (
                <div key={c.status}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-ink">{m.label}</span>
                    <span className="text-ink-soft">{c.n}</span>
                  </div>
                  <div className="mt-1.5 h-2 rounded-full bg-surface">
                    <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: m.text }} />
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            to="/admin/orders"
            className="mt-5 flex h-11 items-center justify-center rounded-xl bg-brand text-sm font-bold text-primary-foreground"
          >
            Open live orders
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-extrabold text-ink">Incoming now</h2>
          <Link to="/admin/orders" className="text-sm font-bold text-brand">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {live.slice(0, 4).map((o) => {
            const m = statusMeta[o.status];
            const rider = riders.find((r) => r.id === o.riderId);
            return (
              <div key={o.id} className="rounded-2xl border border-border p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-full border-2 border-brand text-xs font-bold text-ink">
                      {o.etaMin}m
                    </span>
                    <div>
                      <p className="font-bold text-ink">{o.customer}</p>
                      <p className="text-sm text-ink-soft">{o.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-ink-soft">#{o.id}</p>
                    <span
                      className="mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
                      style={{ background: m.tint, color: m.text }}
                    >
                      {m.label}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <p className="text-sm text-ink-soft">
                    {o.items.length} items · {rider ? rider.name : "Unassigned"}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-display font-extrabold text-ink">₹{orderTotal(o)}</p>
                    <button
                      onClick={() => advance(o.id)}
                      className="rounded-lg bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground"
                    >
                      Move ahead
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
