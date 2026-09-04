import { createFileRoute, Link } from "@tanstack/react-router";
import { categories, productsByCategory } from "@/lib/data";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Grocery Categories — Blinkit" },
      {
        name: "description",
        content:
          "Browse every Blinkit category: fruits & vegetables, dairy, snacks, pharmacy, pet care and more.",
      },
      { property: "og:title", content: "All Grocery Categories — Blinkit" },
      {
        property: "og:description",
        content: "Browse every Blinkit category and get your order in 8 minutes.",
      },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="mb-5 text-2xl font-bold text-ink">Shop by category</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/cn/$slug"
            params={{ slug: c.slug }}
            className="rounded-lg border border-border p-3 transition-shadow hover:shadow-pop"
          >
            <div
              className="grid aspect-square place-items-center rounded-md text-5xl"
              style={{ backgroundColor: c.tint }}
            >
              <span aria-hidden>{c.emoji}</span>
            </div>
            <p className="mt-2 text-sm font-semibold text-ink">{c.name}</p>
            <p className="text-xs text-ink-soft">{productsByCategory(c.slug).length} products</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
