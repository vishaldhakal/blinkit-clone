import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, Search, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function Logo() {
  return (
    <Link to="/" className="font-display text-3xl font-extrabold tracking-tight">
      <span className="text-[#f8cb46]">blink</span>
      <span className="text-brand">it</span>
    </Link>
  );
}

export function Header() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { count, total } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card">
      <div className="mx-auto flex h-[84px] max-w-[1280px] items-center gap-4 px-4">
        <div className="hidden w-[180px] shrink-0 md:block">
          <Logo />
        </div>
        <div className="md:hidden">
          <Logo />
        </div>

        <div className="hidden shrink-0 border-l border-border py-2 pl-6 pr-4 lg:block">
          <p className="text-sm font-bold text-ink">Delivery in 8 minutes</p>
          <button className="flex items-center gap-1 text-sm text-ink-soft">
            Vishrantwadi, Pune, Maharashtr…
            <ChevronDown className="size-4" />
          </button>
        </div>

        <form
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/s", search: { q } });
          }}
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder='Search "butter"'
            aria-label="Search products"
            className="h-12 w-full rounded-lg border border-border bg-surface pl-12 pr-4 text-[15px] outline-none focus:border-brand"
          />
        </form>

        <button className="hidden text-lg text-ink md:block">Login</button>

        <Link
          to="/cart"
          className="flex h-12 items-center gap-2 rounded-lg bg-brand px-4 text-primary-foreground"
        >
          <ShoppingCart className="size-5" />
          <span className="text-left text-sm font-bold leading-tight">
            {count === 0 ? (
              "My Cart"
            ) : (
              <>
                {count} item{count > 1 ? "s" : ""}
                <br />₹{total}
              </>
            )}
          </span>
        </Link>
      </div>
    </header>
  );
}
