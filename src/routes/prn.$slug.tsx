import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, Package, Tag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { categoryBySlug, productBySlug, productsByCategory } from "@/lib/data";

export const Route = createFileRoute("/prn/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Unavailable — Blinkit" }, { name: "robots", content: "noindex" }] };
    const p = loaderData.product;
    const title = `${p.name} (${p.unit}) — Blinkit`;
    const description = `Buy ${p.name} ${p.unit} online at ₹${p.price}. Delivered in 8 minutes.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

const why = [
  {
    icon: Clock,
    title: "Round The Clock Delivery",
    body: "Get items delivered to your doorstep from dark stores near you, whenever you need them.",
  },
  {
    icon: Tag,
    title: "Best Prices & Offers",
    body: "Best price destination with offers directly from the manufacturers.",
  },
  {
    icon: Package,
    title: "Wide Assortment",
    body: "Choose from 30,000+ products across food, personal care, household & other categories.",
  },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { qtyOf, add } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const variants = product.variants ?? [{ unit: product.unit, price: product.price }];
  const variant = variants[variantIdx] ?? variants[0]!;
  const category = categoryBySlug(product.category);
  const similar = productsByCategory(product.category).filter((p) => p.id !== product.id);
  const qty = qtyOf(product.id);

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-6">
      <div className="grid gap-8 border-b border-border pb-8 md:grid-cols-2">
        <div>
          <div
            className="grid h-[380px] place-items-center rounded-xl text-[180px]"
            style={{ backgroundColor: product.tint }}
          >
            <span aria-hidden>{product.emoji}</span>
          </div>
          <div className="mt-4 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`grid size-[70px] place-items-center rounded-md border text-3xl ${
                  i === 0 ? "border-brand" : "border-border"
                }`}
                style={{ backgroundColor: product.tint }}
                aria-hidden
              >
                {product.emoji}
              </div>
            ))}
          </div>

          <h2 className="mt-8 text-xl font-bold text-ink">Product Details</h2>
          <dl className="mt-3 space-y-3">
            {Object.entries(product.details ?? {}).map(([k, v]) => (
              <div key={k}>
                <dt className="text-[15px] font-semibold text-ink">{k}</dt>
                <dd className="text-[15px] text-ink-soft">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:border-l md:border-border md:pl-8">
          <nav className="text-sm text-ink-soft">
            <Link to="/" className="hover:text-ink">
              Home
            </Link>{" "}
            /{" "}
            {category && (
              <>
                <Link
                  to="/cn/$slug"
                  params={{ slug: category.slug }}
                  className="hover:text-ink"
                >
                  {category.name}
                </Link>{" "}
                /{" "}
              </>
            )}
            <span>{product.name}</span>
          </nav>

          <h1 className="mt-3 text-2xl font-bold text-ink md:text-3xl">{product.name}</h1>

          <p className="mt-6 text-[15px] font-semibold text-ink">Select Unit</p>
          <div className="mt-3 flex flex-wrap gap-3">
            {variants.map((v, i) => (
              <button
                key={v.unit}
                onClick={() => setVariantIdx(i)}
                className={`rounded-lg border px-4 py-3 text-left text-sm ${
                  i === variantIdx ? "border-brand bg-brand-soft" : "border-border"
                }`}
              >
                <span className="block text-ink-soft">{v.unit}</span>
                <span className="font-bold text-ink">
                  ₹{v.price}
                  {v.mrp && <span className="ml-1 font-normal line-through">₹{v.mrp}</span>}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[15px] text-ink-soft">{variant.unit}</p>
              <p className="text-2xl font-bold text-ink">₹{variant.price}</p>
              <p className="text-xs text-ink-soft">(Inclusive of all taxes)</p>
            </div>
            <button
              onClick={() => add(product.id)}
              className="rounded-lg bg-brand px-8 py-4 text-lg font-bold text-primary-foreground transition-colors hover:bg-brand-dark"
            >
              {qty > 0 ? `Added (${qty})` : "Add to cart"}
            </button>
          </div>

          <h2 className="mt-10 text-xl font-bold text-ink">Why shop from blinkit?</h2>
          <ul className="mt-4 space-y-5">
            {why.map((w) => (
              <li key={w.title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fff3d6]">
                  <w.icon className="size-6 text-[#c58f00]" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{w.title}</p>
                  <p className="text-[15px] text-ink-soft">{w.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="pt-8">
        <h2 className="mb-4 text-xl font-bold text-ink">Similar products</h2>
        <div className="no-scrollbar flex gap-3 overflow-x-auto pb-2">
          {similar.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
