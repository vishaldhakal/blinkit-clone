import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { categoryBySlug, productsByCategory } from "@/lib/data";

export function ProductRail({ categorySlug }: { categorySlug: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const category = categoryBySlug(categorySlug);
  const items = productsByCategory(categorySlug);
  if (!category) return null;

  const scroll = (dir: 1 | -1) =>
    scroller.current?.scrollBy({ left: dir * 600, behavior: "smooth" });

  return (
    <section className="py-4">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-bold text-ink md:text-2xl">{category.name}</h2>
        <Link
          to="/cn/$slug"
          params={{ slug: category.slug }}
          className="text-sm font-semibold text-brand hover:underline"
        >
          see all
        </Link>
      </div>
      <div className="relative">
        <div ref={scroller} className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth pb-1">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute -left-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full bg-card shadow-pop md:grid"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute -right-4 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full bg-card shadow-pop md:grid"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </section>
  );
}
