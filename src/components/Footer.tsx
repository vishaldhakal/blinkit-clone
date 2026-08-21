import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { categories } from "@/lib/data";

const useful = [
  ["Blog", "Privacy", "Terms", "FAQs", "Security", "Contact"],
  ["Partner", "Franchise", "Seller", "Warehouse", "Deliver", "Resources"],
  ["Recipes", "Bistro", "District", "Blinkit Ambulance", "Feeding India"],
];

export function Footer() {
  const cols = [categories.slice(0, 7), categories.slice(7, 14), categories.slice(14)];

  return (
    <footer className="mt-10 border-t border-border bg-card">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="mb-6 text-xl font-bold text-ink">Useful Links</h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-3">
            {useful.map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((l) => (
                  <li key={l} className="text-[15px] text-ink-soft hover:text-ink">
                    {l}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-ink">
            Categories
            <Link to="/categories" className="text-sm font-semibold text-brand hover:underline">
              see all
            </Link>
          </h2>
          <div className="grid gap-x-6 gap-y-3 sm:grid-cols-3">
            {cols.map((col, i) => (
              <ul key={i} className="space-y-3">
                {col.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/cn/$slug"
                      params={{ slug: c.slug }}
                      className="text-[15px] text-ink-soft hover:text-ink"
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-lg bg-surface px-6 py-6">
          <p className="text-sm text-ink-soft">© Blink Commerce Private Limited, 2016-2026</p>
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold text-ink">Download App</span>
            <span className="rounded-md bg-ink px-3 py-2 text-xs font-semibold text-primary-foreground">
              App Store
            </span>
            <span className="rounded-md bg-ink px-3 py-2 text-xs font-semibold text-primary-foreground">
              Google Play
            </span>
          </div>
          <div className="flex items-center gap-3 text-ink">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <span key={i} className="grid size-9 place-items-center rounded-full bg-ink">
                <Icon className="size-4 text-primary-foreground" />
              </span>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-ink-soft">
          “Blinkit” is owned & managed by “Blink Commerce Private Limited” and is not related, linked
          or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate
          services business operated by “Redstone Consultancy Services Private Limited”.
        </p>
      </div>
    </footer>
  );
}
