import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductRail } from "@/components/ProductRail";
import { categories, homeRails } from "@/lib/data";
import hero from "@/assets/hero-essentials.jpg";
import promoPharmacy from "@/assets/promo-pharmacy.jpg";
import promoPet from "@/assets/promo-pet.jpg";
import promoBaby from "@/assets/promo-baby.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Blinkit — Groceries & Daily Essentials in 8 Minutes" },
      {
        name: "description",
        content:
          "Shop fruits, vegetables, dairy, snacks, pharmacy and pet care online. Delivered to your door in 8 minutes.",
      },
      { property: "og:title", content: "Blinkit — Groceries in 8 Minutes" },
      {
        property: "og:description",
        content: "Farm-fresh goodness, daily essentials and 30,000+ products delivered in minutes.",
      },
    ],
  }),
  component: Home,
});

const promos = [
  {
    img: promoPharmacy,
    title: "Pharmacy at\nyour doorstep!",
    sub: "Cough syrups, pain\nrelief sprays & more",
    bg: "#0d9298",
    text: "text-white",
    to: "pharma-wellness",
    dark: false,
  },
  {
    img: promoPet,
    title: "Pet care supplies\nat your door",
    sub: "Food, treats, toys & more",
    bg: "#f8cb46",
    text: "text-ink",
    to: "pet-care",
    dark: true,
  },
  {
    img: promoBaby,
    title: "No time for\na diaper run?",
    sub: "Get baby care essentials",
    bg: "#cfe2f3",
    text: "text-ink",
    to: "baby-care",
    dark: true,
  },
];

function Home() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-4">
      <Link
        to="/cn/$slug"
        params={{ slug: "fruits-vegetables" }}
        className="relative block overflow-hidden rounded-2xl"
      >
        <img
          src={hero}
          alt="Fresh fruits, vegetables, milk and eggs"
          width={1600}
          height={544}
          className="h-[220px] w-full object-cover md:h-[320px]"
        />
        <div className="absolute inset-0 flex flex-col justify-center gap-3 bg-gradient-to-r from-[#2c7a1f]/95 via-[#2c7a1f]/70 to-transparent p-6 md:p-10">
          <h1 className="max-w-lg text-2xl font-extrabold leading-tight text-primary-foreground md:text-5xl">
            Stock up on daily essentials
          </h1>
          <p className="max-w-md text-sm text-primary-foreground/90 md:text-xl">
            Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more
          </p>
          <span className="w-fit rounded-md bg-card px-5 py-2 text-sm font-bold text-ink md:text-lg">
            Shop Now
          </span>
        </div>
      </Link>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {promos.map((p) => (
          <Link
            key={p.to}
            to="/cn/$slug"
            params={{ slug: p.to }}
            className="relative block overflow-hidden rounded-2xl"
            style={{ backgroundColor: p.bg }}
          >
            <img
              src={p.img}
              alt=""
              loading="lazy"
              width={900}
              height={600}
              className="ml-auto h-[250px] w-[70%] object-cover object-right"
            />
            <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5">
              <h2 className={`whitespace-pre-line text-2xl font-extrabold leading-tight ${p.text}`}>
                {p.title}
              </h2>
              <p className={`whitespace-pre-line text-sm ${p.text} opacity-85`}>{p.sub}</p>
              <span
                className={`mt-2 w-fit rounded-md px-4 py-2 text-sm font-semibold ${
                  p.dark ? "bg-ink text-primary-foreground" : "bg-card text-ink"
                }`}
              >
                Order Now
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="no-scrollbar mt-8 grid grid-flow-col grid-rows-2 gap-x-3 gap-y-6 overflow-x-auto md:grid-flow-row md:grid-cols-10 md:overflow-visible">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/cn/$slug"
            params={{ slug: c.slug }}
            className="w-[100px] text-center md:w-auto"
          >
            <div
              className="grid aspect-square place-items-center rounded-lg text-4xl"
              style={{ backgroundColor: c.tint }}
            >
              <span aria-hidden>{c.emoji}</span>
            </div>
            <p className="mt-2 text-[13px] font-medium leading-tight text-ink">{c.name}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 divide-y divide-border">
        {homeRails.map((slug) => (
          <ProductRail key={slug} categorySlug={slug} />
        ))}
      </div>
    </div>
  );
}
