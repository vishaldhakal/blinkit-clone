import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { categories, categoryBySlug, productsByCategory } from "@/lib/data";

export const Route = createFileRoute("/cn/$slug")({
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Unavailable — Blinkit" }, { name: "robots", content: "noindex" }] };
    const name = loaderData.category.name;
    return {
      meta: [
        { title: `Buy ${name} Online — Blinkit` },
        {
          name: "description",
          content: `Order ${name.toLowerCase()} online at best prices. Delivered to your door in 8 minutes.`,
        },
        { property: "og:title", content: `Buy ${name} Online — Blinkit` },
        {
          property: "og:description",
          content: `Fresh ${name.toLowerCase()} delivered in 8 minutes with Blinkit.`,
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const items = productsByCategory(category.slug);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <nav className="mb-4 text-sm text-ink-soft">
        <Link to="/" className="hover:text-ink">
          Home
        </Link>{" "}
        / <span className="text-ink">{category.name}</span>
      </nav>

      <div className="flex gap-6">
        <aside className="hidden w-[240px] shrink-0 md:block">
          <div className="rounded-lg border border-border">
            {categories.map((c) => (
              <Link
                key={c.slug}
                to="/cn/$slug"
                params={{ slug: c.slug }}
                className={`flex items-center gap-3 border-l-4 px-3 py-2.5 text-[13px] font-medium ${
                  c.slug === category.slug
                    ? "border-brand bg-brand-soft text-brand"
                    : "border-transparent text-ink hover:bg-surface"
                }`}
              >
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-md text-xl"
                  style={{ backgroundColor: c.tint }}
                  aria-hidden
                >
                  {c.emoji}
                </span>
                {c.name}
              </Link>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <h1 className="mb-4 text-2xl font-bold text-ink">{category.name}</h1>
          <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {items.length === 0 && (
            <p className="text-ink-soft">No products in this category yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
