export type ProductCategory = "Momos" | "Spring Rolls" | "Parathas" | "Snacks" | "Kurkure Momos" | "Manchurian";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  weight: string;
  price: number;
  unit: "kg" | "piece";
  badge?: string;
  image: string;
};

export const categoryMeta: Record<ProductCategory, { slug: string; image: string; icon: string; description: string }> = {
  Momos: {
    slug: "momos",
    image: "/images/categories/momos.jpg",
    icon: "/images/icons/momos.png",
    description: "Restaurant-grade dumplings with consistent size, clean filling and reliable frozen handling."
  },
  "Spring Rolls": {
    slug: "spring-rolls",
    image: "/images/categories/spring-rolls.jpg",
    icon: "/images/icons/spring-rolls.png",
    description: "Crisp rolls for cafes, cloud kitchens and party menus."
  },
  Parathas: {
    slug: "parathas",
    image: "/images/categories/parathas.jpg",
    icon: "/images/icons/parathas.png",
    description: "Frozen parathas built for fast service and predictable texture."
  },
  Snacks: {
    slug: "snacks",
    image: "/images/categories/snacks.jpg",
    icon: "/images/icons/samosa.png",
    description: "Samosas and kababs for high-volume snack programs."
  },
  "Kurkure Momos": {
    slug: "kurkure-momos",
    image: "/images/categories/kurkure.jpg",
    icon: "/images/icons/kurkure-momos.png",
    description: "Crunchy momo formats with high-margin menu appeal."
  },
  Manchurian: {
    slug: "manchurian",
    image: "/images/categories/manchurian.jpg",
    icon: "/images/icons/manchurian.png",
    description: "Frozen Manchurian bites for Indo-Chinese kitchens."
  }
};

const rows: Array<Omit<Product, "id" | "slug" | "image">> = [
  { name: "Veg Momo", category: "Momos", weight: "28-30 gm", price: 155, unit: "kg", badge: "Bestseller" },
  { name: "Veg Momo", category: "Momos", weight: "20-22 gm", price: 170, unit: "kg" },
  { name: "Chicken Momo", category: "Momos", weight: "28-30 gm", price: 200, unit: "kg" },
  { name: "Chicken Momo", category: "Momos", weight: "20-22 gm", price: 215, unit: "kg" },
  { name: "Butter Chicken Momo", category: "Momos", weight: "28-30 gm", price: 245, unit: "kg", badge: "Premium" },
  { name: "Corn & Cheese Momo", category: "Momos", weight: "28-30 gm", price: 265, unit: "kg", badge: "Premium" },
  { name: "Paneer Momo", category: "Momos", weight: "28-30 gm", price: 190, unit: "kg" },
  { name: "Paneer Momo", category: "Momos", weight: "20-22 gm", price: 210, unit: "kg" },
  { name: "Soya Momo", category: "Momos", weight: "28-30 gm", price: 160, unit: "kg" },
  { name: "Veg Spring Roll", category: "Spring Rolls", weight: "90-100 gm", price: 18, unit: "piece" },
  { name: "Chicken Spring Roll", category: "Spring Rolls", weight: "90-100 gm", price: 23, unit: "piece" },
  { name: "Paneer Spring Roll", category: "Spring Rolls", weight: "90-100 gm", price: 23, unit: "piece" },
  { name: "Veg Spring Roll", category: "Spring Rolls", weight: "70-75 gm", price: 15, unit: "piece" },
  { name: "Chicken Spring Roll", category: "Spring Rolls", weight: "70-75 gm", price: 18, unit: "piece" },
  { name: "Paneer Spring Roll", category: "Spring Rolls", weight: "70-75 gm", price: 18, unit: "piece" },
  { name: "Tikona Plain Paratha", category: "Parathas", weight: "Standard", price: 15.36, unit: "piece" },
  { name: "Malabari Paratha", category: "Parathas", weight: "Standard", price: 23.2, unit: "piece" },
  { name: "Lachha Paratha", category: "Parathas", weight: "Standard", price: 16, unit: "piece" },
  { name: "Mix Veg Paratha", category: "Parathas", weight: "Standard", price: 21.25, unit: "piece" },
  { name: "Aloo Paratha", category: "Parathas", weight: "Standard", price: 17.4, unit: "piece" },
  { name: "Paneer Paratha", category: "Parathas", weight: "Bulk pack", price: 180, unit: "kg", badge: "Starts at" },
  { name: "Punjabi Samosa", category: "Snacks", weight: "Bulk pack", price: 218, unit: "kg" },
  { name: "Soya Keema Samosa", category: "Snacks", weight: "Bulk pack", price: 209, unit: "kg" },
  { name: "Veg Shami Kabab", category: "Snacks", weight: "Bulk pack", price: 239, unit: "kg" },
  { name: "Butter Chicken Kurkure Momo", category: "Kurkure Momos", weight: "Standard", price: 9, unit: "piece", badge: "Chef pick" },
  { name: "Chicken Kurkure Momo", category: "Kurkure Momos", weight: "Standard", price: 7.5, unit: "piece" },
  { name: "Paneer Kurkure Momo", category: "Kurkure Momos", weight: "Standard", price: 7.5, unit: "piece" },
  { name: "Veg Kurkure Momo", category: "Kurkure Momos", weight: "Standard", price: 6.5, unit: "piece" },
  { name: "Chicken Manchurian", category: "Manchurian", weight: "Standard", price: 7.5, unit: "piece" },
  { name: "Paneer Manchurian", category: "Manchurian", weight: "Standard", price: 7.5, unit: "piece" },
  { name: "Veg Manchurian", category: "Manchurian", weight: "Standard", price: 6.5, unit: "piece" }
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const productImagesByName: Record<string, string> = {
  "Aloo Paratha": "/images/products/Aloo_Paratha.jpeg",
  "Butter Chicken Kurkure Momo": "/images/products/Butter_Chicken_Kurkure.jpeg",
  "Butter Chicken Momo": "/images/products/Butter_Chicken_Momo.jpeg",
  "Chicken Kurkure Momo": "/images/products/Chicken_Kurkure_Momos.jpeg",
  "Chicken Manchurian": "/images/products/Chicken_Manchurian.jpeg",
  "Chicken Momo": "/images/products/Chicken_Momo.jpeg",
  "Chicken Spring Roll": "/images/products/Chicken_Spring_Roll.jpeg",
  "Corn & Cheese Momo": "/images/products/Corn & Cheese Momo.jpeg",
  "Lachha Paratha": "/images/products/Lachchha_Paratha.jpeg",
  "Malabari Paratha": "/images/products/Malabari_Paratha.jpeg",
  "Mix Veg Paratha": "/images/products/Mix_Veg_Paratha.jpeg",
  "Paneer Kurkure Momo": "/images/products/Paneer_Kurkure_Momos.jpeg",
  "Paneer Manchurian": "/images/products/Paneer_Manchurian.jpeg",
  "Paneer Momo": "/images/products/Paneer_Momo.jpeg",
  "Paneer Paratha": "/images/products/Paneer_Paratha.jpeg",
  "Paneer Spring Roll": "/images/products/Paneer_Spring_Rolls.jpeg",
  "Punjabi Samosa": "/images/products/Punjabi_Samosa.jpeg",
  "Soya Keema Samosa": "/images/products/Soya_Keema_Samosa.jpeg",
  "Soya Momo": "/images/products/Soya_Momo.jpeg",
  "Tikona Plain Paratha": "/images/products/Tikoni_Plain_Paratha.jpeg",
  "Veg Kurkure Momo": "/images/products/Kurkure_Momo.jpeg",
  "Veg Manchurian": "/images/products/Veg_Manchurian.jpeg",
  "Veg Momo": "/images/products/Veg_Momo.jpeg",
  "Veg Shami Kabab": "/images/products/Veg_Shami_Kaba.jpeg",
  "Veg Spring Roll": "/images/products/Veg_Spring_Roll.jpeg"
};

export const products: Product[] = rows.map((product, index) => ({
  ...product,
  id: `af-${index + 1}`,
  slug: `${slugify(product.name)}-${slugify(product.weight)}`,
  image: productImagesByName[product.name] ?? `/images/products/${slugify(product.name)}.jpeg`
}));

export const featuredProducts = products.filter((product) => product.badge).slice(0, 6);

export const formatPrice = (product: Pick<Product, "price" | "unit">) =>
  `Rs ${product.price.toLocaleString("en-IN", { maximumFractionDigits: 2 })}/${product.unit}`;

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
