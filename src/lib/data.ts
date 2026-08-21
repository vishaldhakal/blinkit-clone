export type Product = {
  id: string;
  slug: string;
  name: string;
  unit: string;
  price: number;
  mrp?: number;
  emoji: string;
  tint: string;
  category: string; // category slug
  details?: Record<string, string>;
  variants?: { unit: string; price: number; mrp?: number }[];
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
  tint: string;
};

export const categories: Category[] = [
  { slug: "paan-corner", name: "Paan Corner", emoji: "🍃", tint: "#e9f6e6" },
  { slug: "dairy-bread-eggs", name: "Dairy, Bread & Eggs", emoji: "🥛", tint: "#e7f0ff" },
  { slug: "fruits-vegetables", name: "Fruits & Vegetables", emoji: "🥬", tint: "#eaf7e4" },
  { slug: "cold-drinks-juices", name: "Cold Drinks & Juices", emoji: "🥤", tint: "#ffeaea" },
  { slug: "snacks-munchies", name: "Snacks & Munchies", emoji: "🍿", tint: "#fff2df" },
  { slug: "breakfast-instant-food", name: "Breakfast & Instant Food", emoji: "🥣", tint: "#fdeee7" },
  { slug: "sweet-tooth", name: "Sweet Tooth", emoji: "🍫", tint: "#f3e9ff" },
  { slug: "bakery-biscuits", name: "Bakery & Biscuits", emoji: "🍪", tint: "#fdf1dc" },
  { slug: "tea-coffee-milk-drinks", name: "Tea, Coffee & Milk Drinks", emoji: "☕", tint: "#efe7de" },
  { slug: "atta-rice-dal", name: "Atta, Rice & Dal", emoji: "🌾", tint: "#f7f1e0" },
  { slug: "masala-oil-more", name: "Masala, Oil & More", emoji: "🫙", tint: "#fdeada" },
  { slug: "sauces-spreads", name: "Sauces & Spreads", emoji: "🍯", tint: "#fff0d9" },
  { slug: "chicken-meat-fish", name: "Chicken, Meat & Fish", emoji: "🍗", tint: "#ffe9e4" },
  { slug: "organic-healthy-living", name: "Organic & Healthy Living", emoji: "🥗", tint: "#e8f7ea" },
  { slug: "baby-care", name: "Baby Care", emoji: "🍼", tint: "#e9f2ff" },
  { slug: "pharma-wellness", name: "Pharma & Wellness", emoji: "💊", tint: "#e3f6f5" },
  { slug: "cleaning-essentials", name: "Cleaning Essentials", emoji: "🧽", tint: "#e7f1fb" },
  { slug: "home-office", name: "Home & Office", emoji: "🏠", tint: "#f0eef9" },
  { slug: "personal-care", name: "Personal Care", emoji: "🧴", tint: "#fdeaf1" },
  { slug: "pet-care", name: "Pet Care", emoji: "🐶", tint: "#fff5da" },
];

type Seed = [name: string, unit: string, price: number, mrp: number | 0, emoji: string, tint: string];

const seeds: Record<string, Seed[]> = {
  "dairy-bread-eggs": [
    ["Chitale Pasteurised Cow Milk", "500 ml", 32, 0, "🥛", "#e7f0ff"],
    ["Amul Taaza Toned Milk", "500 ml", 30, 0, "🥛", "#e2f4ff"],
    ["Yojana Poultry Power White Eggs - 6 pcs", "6 pcs", 60, 0, "🥚", "#fdf3df"],
    ["Chitale Full Cream Milk", "500 ml", 39, 0, "🍶", "#eaf1ff"],
    ["Amul Masti Cup Curd", "200 g", 25, 0, "🥣", "#eef8e6"],
    ["Amul Masti Pouch Curd", "500 g", 45, 50, "🥣", "#f4fbe7"],
    ["Harvest Gold Sandwich Bread", "400 g", 45, 50, "🍞", "#fdf0dd"],
    ["Amul Salted Butter", "100 g", 58, 62, "🧈", "#fff6d9"],
    ["Britannia Cheese Slices", "200 g", 135, 145, "🧇", "#fff3d6"],
    ["Gokul Full Cream Milk", "500 ml", 39, 0, "🥛", "#e8f0ff"],
  ],
  "fruits-vegetables": [
    ["Banana Robusta", "6 pcs", 42, 50, "🍌", "#fdf6d8"],
    ["Baby Spinach", "250 g", 35, 40, "🥬", "#e9f7e2"],
    ["Tomato Hybrid", "500 g", 28, 35, "🍅", "#ffe7e3"],
    ["Onion", "1 kg", 39, 45, "🧅", "#f7ecdc"],
    ["Royal Gala Apple", "4 pcs", 189, 220, "🍎", "#ffe8e8"],
    ["Nagpur Orange", "1 kg", 99, 120, "🍊", "#ffeeda"],
    ["Green Capsicum", "250 g", 24, 30, "🫑", "#e9f7e2"],
    ["Coriander Leaves", "100 g", 12, 15, "🌿", "#e9f7e2"],
    ["Potato", "1 kg", 34, 40, "🥔", "#f6efe0"],
    ["Watermelon Kiran", "1 pc", 79, 99, "🍉", "#ffe6ec"],
  ],
  "cold-drinks-juices": [
    ["Coca-Cola Soft Drink", "750 ml", 40, 45, "🥤", "#ffe4e4"],
    ["Pepsi Can", "300 ml", 35, 40, "🥫", "#e6ecff"],
    ["Real Mango Fruit Power", "1 L", 119, 130, "🧃", "#ffefd8"],
    ["Sprite Lime Flavoured", "750 ml", 40, 45, "🍋", "#e8f8e6"],
    ["Bisleri Mineral Water", "1 L", 20, 22, "💧", "#e6f4ff"],
    ["Red Bull Energy Drink", "250 ml", 125, 130, "⚡", "#e8ecff"],
    ["Paper Boat Aam Panna", "500 ml", 60, 65, "🥭", "#fff0d6"],
    ["Amul Kool Rose Milk", "180 ml", 25, 0, "🌹", "#ffe8f1"],
  ],
  "snacks-munchies": [
    ["Lay's India's Magic Masala", "52 g", 20, 0, "🥟", "#ffe6e6"],
    ["Kurkure Masala Munch", "90 g", 20, 0, "🌽", "#fff1d9"],
    ["Haldiram's Bhujia", "200 g", 55, 60, "🍜", "#fdeedb"],
    ["Doritos Nacho Cheese", "50 g", 30, 0, "🧀", "#fff0cf"],
    ["Bingo Mad Angles", "66 g", 20, 0, "🔺", "#ffe9e0"],
    ["Peanut Chikki", "200 g", 65, 75, "🥜", "#f7ecd6"],
    ["Too Yumm Multigrain Chips", "58 g", 30, 35, "🌾", "#f0f7e2"],
    ["Act II Popcorn Butter", "70 g", 25, 0, "🍿", "#fff5dc"],
  ],
  "breakfast-instant-food": [
    ["Kellogg's Corn Flakes", "475 g", 210, 240, "🥣", "#ffedd8"],
    ["Maggi 2-Minute Noodles", "8 pack", 96, 108, "🍜", "#ffe9d6"],
    ["Quaker Oats", "1 kg", 205, 230, "🌾", "#f4f0e0"],
    ["MTR Poha Mix", "160 g", 55, 60, "🍚", "#fdf3e2"],
    ["Yippee Magic Masala Noodles", "4 pack", 60, 68, "🍥", "#ffefdb"],
    ["Saffola Masala Oats", "500 g", 175, 195, "🥗", "#eef7e4"],
  ],
  "sweet-tooth": [
    ["Cadbury Dairy Milk Silk", "150 g", 175, 190, "🍫", "#f0e4ff"],
    ["Amul Vanilla Ice Cream Tub", "1 L", 210, 240, "🍨", "#eef4ff"],
    ["Oreo Chocolate Biscuits", "120 g", 35, 40, "🍪", "#eae7ff"],
    ["KitKat 4 Finger", "37.3 g", 30, 0, "🍫", "#ffe9e0"],
    ["Kaju Katli Box", "250 g", 375, 420, "🍬", "#fff3dd"],
    ["Ferrero Rocher Pack", "8 pcs", 349, 399, "🟤", "#f7ecd8"],
  ],
  "bakery-biscuits": [
    ["Britannia Good Day Cashew", "200 g", 45, 50, "🍪", "#fdf0d9"],
    ["Parle-G Gold", "250 g", 40, 45, "🍘", "#fff2d5"],
    ["Farmlite Digestive Oats", "250 g", 90, 100, "🌾", "#f1f6e0"],
    ["Whole Wheat Brown Bread", "400 g", 50, 55, "🍞", "#f6ecd9"],
    ["Butter Croissant", "2 pcs", 99, 110, "🥐", "#fdf0dc"],
    ["Rusk Toast", "300 g", 55, 60, "🥖", "#fbeed7"],
  ],
  "tea-coffee-milk-drinks": [
    ["Tata Tea Premium", "500 g", 275, 295, "🍵", "#e9f2e2"],
    ["Bournvita Health Drink", "500 g", 245, 265, "🥛", "#f2e6da"],
    ["Nescafé Classic Coffee", "50 g", 175, 185, "☕", "#efe2d5"],
    ["Red Label Natural Care Tea", "250 g", 155, 170, "🍂", "#f6e6da"],
    ["Horlicks Classic Malt", "500 g", 259, 285, "🧋", "#f7eddc"],
    ["Sunrise Instant Coffee", "100 g", 210, 230, "☕", "#eee1d3"],
  ],
  "atta-rice-dal": [
    ["Aashirvaad Shudh Chakki Atta", "5 kg", 285, 320, "🌾", "#f7f0dd"],
    ["India Gate Basmati Rice", "1 kg", 165, 185, "🍚", "#f9f4e6"],
    ["Toor Dal", "1 kg", 175, 195, "🫘", "#f6eedb"],
    ["Moong Dal", "500 g", 95, 105, "🫘", "#f3f2dd"],
    ["Rajma Chitra", "500 g", 120, 135, "🫘", "#f7e8e0"],
    ["Sooji Rava", "1 kg", 65, 72, "🥣", "#f9f2e2"],
  ],
  "paan-corner": [
    ["Ultimate Rolling Paper with Filter Tips", "32 pcs", 90, 0, "📄", "#eef7e2"],
    ["Brown Ripper Rolling Paper 32 Leaves", "32 pcs", 120, 0, "📃", "#f0f5e0"],
    ["Perfect Rolled Cones (Natural)", "3 pcs", 45, 0, "🧻", "#fdeee0"],
    ["Brown Rolling Paper Cones", "6 pcs", 90, 0, "🎯", "#e8ecfb"],
    ["Thins Pre Rolled Cones", "3 x 2 pcs", 60, 0, "📌", "#faf1dc"],
    ["Colour Roach Filter Tips", "32 sheets", 50, 0, "🎴", "#eef7e2"],
    ["Mint Mouth Freshener", "18 g", 35, 40, "🌱", "#e8f7ea"],
    ["Sweet Meetha Paan", "1 pc", 45, 0, "🍃", "#e9f6e6"],
  ],
  "masala-oil-more": [
    ["Fortune Sunlite Refined Oil", "1 L", 145, 165, "🫗", "#fff0d3"],
    ["Everest Garam Masala", "100 g", 85, 92, "🧂", "#fbe6d4"],
    ["Saffola Gold Oil", "1 L", 175, 195, "🫗", "#fff2d8"],
    ["Tata Salt", "1 kg", 28, 30, "🧂", "#eef3fb"],
    ["Turmeric Powder", "200 g", 62, 70, "🟡", "#fff3cf"],
    ["Cow Ghee Jar", "500 ml", 375, 420, "🫙", "#fdeeca"],
  ],
  "sauces-spreads": [
    ["Kissan Fresh Tomato Ketchup", "950 g", 130, 145, "🍅", "#ffe4e2"],
    ["Veeba Chinese Schezwan Chutney", "310 g", 99, 115, "🌶️", "#ffe3dd"],
    ["Kissan Mixed Fruit Jam", "500 g", 175, 190, "🍓", "#ffe6ee"],
    ["Pintola Peanut Butter", "1 kg", 449, 499, "🥜", "#f7ecd6"],
    ["Nutella Hazelnut Spread", "290 g", 399, 425, "🍫", "#f4e5d5"],
    ["Mayonnaise Eggless", "250 g", 89, 99, "🥚", "#fdf4e2"],
  ],
  "chicken-meat-fish": [
    ["Chicken Curry Cut", "500 g", 199, 240, "🍗", "#ffe8e2"],
    ["Boneless Chicken Breast", "450 g", 289, 330, "🥩", "#ffe4e4"],
    ["Rohu Fish Curry Cut", "500 g", 249, 290, "🐟", "#e6f2fb"],
    ["Prawns Medium Cleaned", "250 g", 329, 380, "🦐", "#ffe6e0"],
    ["Mutton Curry Cut", "500 g", 499, 560, "🍖", "#ffe0dc"],
    ["Chicken Sausages", "250 g", 165, 185, "🌭", "#ffeada"],
  ],
  "organic-healthy-living": [
    ["Organic Quinoa", "500 g", 275, 320, "🌾", "#eff7e4"],
    ["Cold Pressed Coconut Oil", "500 ml", 349, 399, "🥥", "#f6f1e2"],
    ["Raw Forest Honey", "500 g", 425, 480, "🍯", "#fff2d3"],
    ["Chia Seeds", "250 g", 189, 220, "⚫", "#f0f2e4"],
    ["Almond Milk Unsweetened", "1 L", 249, 275, "🥛", "#f5f0e6"],
    ["Organic Jaggery Powder", "500 g", 129, 150, "🟤", "#f6e8d2"],
  ],
  "baby-care": [
    ["Pampers All Round Diapers M", "56 pcs", 899, 1099, "🧷", "#e9f2ff"],
    ["Johnson's Baby Powder", "400 g", 249, 275, "🍼", "#fdeef4"],
    ["Cerelac Wheat Apple", "300 g", 285, 310, "🥣", "#fdf1e0"],
    ["Baby Wipes Fragrance Free", "72 pcs", 199, 230, "🧻", "#eaf4ff"],
    ["Himalaya Baby Lotion", "200 ml", 199, 215, "🧴", "#f0f7ff"],
    ["Baby Feeding Bottle", "250 ml", 349, 399, "🍼", "#eef4ff"],
  ],
  "pharma-wellness": [
    ["ENO Fruit Salt Lemon", "100 g", 145, 160, "💊", "#e4f6f4"],
    ["Moov Pain Relief Spray", "80 g", 285, 315, "🧯", "#f1e6fb"],
    ["Dettol Antiseptic Liquid", "550 ml", 265, 290, "🧪", "#e5f0fb"],
    ["Vicks VapoRub", "50 ml", 175, 190, "🫙", "#e6f4f2"],
    ["Digital Thermometer", "1 pc", 249, 299, "🌡️", "#eaf1fb"],
    ["Cotton Roll", "100 g", 79, 90, "☁️", "#f4f7fb"],
  ],
  "cleaning-essentials": [
    ["Surf Excel Easy Wash", "1 kg", 135, 150, "🧺", "#e7f1fb"],
    ["Vim Dishwash Gel", "750 ml", 185, 210, "🍋", "#eaf7e2"],
    ["Harpic Toilet Cleaner", "1 L", 199, 220, "🚽", "#e8eefb"],
    ["Colin Glass Cleaner", "500 ml", 115, 130, "🪟", "#e6f4fb"],
    ["Lizol Floor Cleaner", "975 ml", 235, 260, "🧴", "#f0eefb"],
    ["Scotch-Brite Scrub Pad", "3 pcs", 65, 75, "🧽", "#e9f7ec"],
  ],
  "home-office": [
    ["LED Bulb 9W", "1 pc", 129, 160, "💡", "#fff5d6"],
    ["A4 Printing Paper", "500 sheets", 349, 399, "📄", "#f2f5fb"],
    ["Gel Pen Blue", "5 pcs", 75, 90, "🖊️", "#e9eefb"],
    ["Extension Board 4 Socket", "1 pc", 449, 520, "🔌", "#f0eef9"],
    ["Storage Basket", "1 pc", 299, 350, "🧺", "#f6f0e4"],
    ["Sticky Notes Pack", "3 pads", 99, 120, "📝", "#fff6d9"],
  ],
  "personal-care": [
    ["Dove Cream Beauty Bar", "3 x 100 g", 195, 225, "🧼", "#fdeef4"],
    ["Colgate Strong Teeth", "200 g", 115, 130, "🪥", "#e9f0fb"],
    ["Head & Shoulders Shampoo", "340 ml", 349, 399, "🧴", "#e8f2fb"],
    ["Gillette Mach3 Cartridges", "2 pcs", 399, 449, "🪒", "#eef1f7"],
    ["Nivea Body Lotion", "400 ml", 425, 470, "🧴", "#e9f2fb"],
    ["Fogg Deodorant", "150 ml", 249, 275, "💨", "#f1eafb"],
  ],
  "pet-care": [
    ["Pedigree Adult Chicken", "3 kg", 749, 899, "🐕", "#fff3d6"],
    ["Whiskas Ocean Fish Cat Food", "1.1 kg", 449, 520, "🐈", "#fdeee0"],
    ["Drools Puppy Dry Food", "1.2 kg", 359, 420, "🦴", "#f7f0dc"],
    ["Cat Litter Clumping", "5 kg", 549, 620, "🪣", "#eef2fb"],
    ["Dog Chew Bone", "3 pcs", 199, 240, "🦴", "#f6eedc"],
    ["Pet Grooming Brush", "1 pc", 249, 299, "🧹", "#fdf0e2"],
  ],
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const products: Product[] = Object.entries(seeds).flatMap(([category, list]) =>
  list.map(([name, unit, price, mrp, emoji, tint]) => ({
    id: `${category}-${slugify(name)}`,
    slug: slugify(name),
    name,
    unit,
    price,
    mrp: mrp || undefined,
    emoji,
    tint,
    category,
    details: {
      "Unit": unit,
      "Shelf Life": "As printed on the pack",
      "Country of Origin": "India",
      "Customer Care": "support@blinkit-clone.example",
    },
    variants: [
      { unit, price },
      { unit: `3 x ${unit}`, price: Math.round(price * 2.9), mrp: price * 3 },
    ],
  })),
);

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const categoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const homeRails = [
  "dairy-bread-eggs",
  "paan-corner",
  "snacks-munchies",
  "cold-drinks-juices",
  "fruits-vegetables",
  "sweet-tooth",
  "tea-coffee-milk-drinks",
  "pharma-wellness",
];

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return products.filter(
    (p) => p.name.toLowerCase().includes(t) || p.category.replace(/-/g, " ").includes(t),
  );
}

export const footerLinks = {
  useful: [
    ["Blog", "Partner", "Recipes"],
    ["Privacy", "Franchise", "Bistro"],
    ["Terms", "Seller", "District"],
    ["FAQs", "Warehouse", "Blinkit Ambulance"],
    ["Security", "Deliver", "Feeding India"],
    ["Contact", "Resources", ""],
  ],
};
