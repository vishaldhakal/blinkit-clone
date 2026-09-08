import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { orderTotal, statusFlow, statusMeta, useAdmin, type OrderStatus } from "@/lib/admin-store";

export const Route = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [
      { title: "Live Orders — Blinkit Clone Ops" },
      { name: "description", content: "Track every order from new to delivered and assign riders in one click." },
      { property: "og:title", content: "Live Orders — Blinkit Clone Ops" },
      { property: "og:description", content: "Track orders and assign riders in one click." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Orders,
});

const tabs: (OrderStatus | "all")[] = ["all", ...statusFlow];

function Orders() {
  const { orders, riders, advance, assignRider } = useAdmin();
  const [tab, setTab] = useState<OrderStatus | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const list = tab === "all" ? orders : orders.filter((o) => o.status === tab);

  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((t) => {
          const n = t === "all" ? orders.length : orders.filter((o) => o.status === t).length;
          const label = t === "all" ? "All orders" : statusMeta[t].label;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex shrink-0 items-center gap-2 rounded-2xl border px-4 py-2.5 text-sm font-bold ${
                tab === t ? "border-ink bg-ink text-background" : "border-border bg-card text-ink"
              }`}
            >
              <span
                className={`grid size-6 place-items-center rounded-full text-xs ${
                  tab === t ? "bg-background/20" : "bg-surface text-ink-soft"
                }`}
              >
                {n}
              </span>
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {list.map((o) => {
          const m = statusMeta[o.status];
          const rider = riders.find((r) => r.id === o.riderId);
          const step = statusFlow.indexOf(o.status);
          return (
            <div key={o.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-extrabold text-ink">{o.customer}</p>
                  <p className="flex items-center gap-1 text-sm text-ink-soft">
                    <MapPin className="size-3.5" /> {o.address}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-ink-soft">
                    <Phone className="size-3.5" /> {o.phone} · {o.channel} · {o.payment}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-ink-soft">#{o.id} · {o.placedAt}</p>
                  <span
                    className="mt-1 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
                    style={{ background: m.tint, color: m.text }}
                  >
                    {m.label}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-1">
                {statusFlow.map((s, i) => (
                  <div key={s} className="flex-1">
                    <div className={`h-1.5 rounded-full ${i <= step ? "bg-brand" : "bg-surface"}`} />
                    <p className="mt-1 hidden text-[10px] text-ink-soft sm:block">{statusMeta[s].label}</p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setOpenId(openId === o.id ? null : o.id)}
                className="mt-4 text-sm font-bold text-brand"
              >
                {openId === o.id ? "Hide items" : `${o.items.length} items · view`}
              </button>

              {openId === o.id && (
                <div className="mt-2 space-y-1.5 rounded-xl bg-surface p-3">
                  {o.items.map((it) => (
                    <div key={it.name} className="flex justify-between text-sm">
                      <span className="text-ink">
                        {it.qty} × {it.name}
                      </span>
                      <span className="font-semibold text-ink">₹{it.qty * it.price}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <select
                  value={o.riderId ?? ""}
                  onChange={(e) => assignRider(o.id, e.target.value)}
                  aria-label={`Assign rider to order ${o.id}`}
                  className="h-10 rounded-xl border border-border bg-surface px-3 text-sm font-semibold text-ink outline-none focus:border-brand"
                >
                  <option value="">Assign rider…</option>
                  {riders.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} {r.online ? "" : "(offline)"}
                    </option>
                  ))}
                </select>
                {rider && (
                  <span className="rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground">
                    {rider.initials} · {rider.zone}
                  </span>
                )}
                <p className="ml-auto font-display text-lg font-extrabold text-ink">₹{orderTotal(o)}</p>
                {o.status !== "delivered" && (
                  <button
                    onClick={() => advance(o.id)}
                    className="h-10 rounded-xl bg-brand px-4 text-sm font-bold text-primary-foreground"
                  >
                    Mark {statusMeta[statusFlow[step + 1] ?? "delivered"].label}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
