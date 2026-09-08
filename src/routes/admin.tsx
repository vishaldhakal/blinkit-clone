import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LayoutDashboard, ScanLine, ClipboardList, Bike, ChefHat, ArrowLeft, Bell } from "lucide-react";
import { AdminProvider } from "@/lib/admin-store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Operations Console — Blinkit Clone Admin" },
      { name: "description", content: "Live orders, POS billing, kitchen and rider assignment for the dark store." },
      { property: "og:title", content: "Operations Console — Blinkit Clone Admin" },
      { property: "og:description", content: "Live orders, POS billing, kitchen and rider assignment." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/pos", label: "POS Counter", icon: ScanLine },
  { to: "/admin/orders", label: "Live Orders", icon: ClipboardList },
  { to: "/admin/kitchen", label: "Pack & Prep", icon: ChefHat },
  { to: "/admin/riders", label: "Riders", icon: Bike },
] as const;

function AdminLayout() {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-[#f4f7f5]">
        <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col border-r border-border bg-card px-4 py-6 md:flex">
          <div className="mb-8 flex items-center gap-2 px-2">
            <span className="grid size-9 place-items-center rounded-xl bg-brand text-lg text-primary-foreground">⚡</span>
            <div>
              <p className="font-display text-base font-extrabold leading-tight text-ink">Blinkit Ops</p>
              <p className="text-xs text-ink-soft">Vishrantwadi store</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: "exact" in n ? n.exact : false }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:bg-accent"
                activeProps={{ className: "bg-brand text-primary-foreground hover:bg-brand" }}
              >
                <n.icon className="size-[18px]" />
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="rounded-2xl bg-accent p-3">
              <p className="text-xs font-bold text-accent-foreground">Store status</p>
              <p className="mt-1 text-sm font-semibold text-ink">Open · 8 min promise</p>
            </div>
            <Link to="/" className="flex items-center gap-2 px-3 text-sm font-semibold text-ink-soft hover:text-ink">
              <ArrowLeft className="size-4" /> Back to storefront
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur md:px-6">
            <p className="font-display text-lg font-extrabold text-ink">Operations Console</p>
            <span className="hidden rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground sm:inline">
              Live
            </span>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative grid size-10 place-items-center rounded-full border border-border text-ink-soft hover:bg-surface">
                <Bell className="size-[18px]" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive" />
              </button>
              <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
                <span className="grid size-8 place-items-center rounded-full bg-brand text-xs font-bold text-primary-foreground">
                  VD
                </span>
                <span className="text-sm font-semibold text-ink">Store Manager</span>
              </div>
            </div>
          </header>

          <nav className="flex gap-2 overflow-x-auto border-b border-border bg-card px-4 py-2 md:hidden no-scrollbar">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: "exact" in n ? n.exact : false }}
                className="shrink-0 rounded-full border border-border px-3 py-1.5 text-sm font-semibold text-ink-soft"
                activeProps={{ className: "bg-brand text-primary-foreground border-brand" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <main className="flex-1 p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
