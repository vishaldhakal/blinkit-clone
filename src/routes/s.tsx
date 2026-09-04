import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { searchProducts } from "@/lib/data";

export const Route = createFileRoute("/s")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search['q'] === "string" ? (search['q'] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Search Products — Blinkit" },
      { name: "description", content: "Search across 30,000+ grocery products on Blinkit." },
      { property: "og:title", content: "Search Products — Blinkit" },
      {
        property: "og:description",
        content: "Search across 30,000+ grocery products delivered in 8 minutes.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = searchProducts(q);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <h1 className="mb-1 text-2xl font-bold text-ink">
        {q ? `Results for “${q}”` : "Search products"}
      </h1>
      <p className="mb-5 text-sm text-ink-soft">
        {q ? `${results.length} product${results.length === 1 ? "" : "s"} found` : "Type in the search bar above to find products."}
      </p>
      <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {results.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {q && results.length === 0 && (
        <p className="text-ink-soft">No products matched your search. Try another keyword.</p>
      )}
    </div>
  );
}
