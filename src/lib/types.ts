export type CurrencyCode = "USD" | "EUR" | "GEL";
export type Locale = "en" | "ka" | "ru";

/** A string available in every supported language. */
export type Localized = Record<Locale, string>;

export interface Subcategory {
  slug: string;
  name: Localized;
}

export interface Category {
  slug: string;
  name: Localized;
  icon: string; // lucide icon name
  description: Localized;
  subcategories: Subcategory[];
}

export interface Brand {
  slug: string;
  name: string;
  logo: string; // emoji / monogram fallback
}

export interface Review {
  author: string;
  rating: number; // 1-5
  date: string;
  comment: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string; // canonical English name (used for search/slug)
  nameL: Localized;
  shortL: Localized;
  descriptionL: Localized;
  sku: string;
  categorySlug: string;
  brandSlug: string;
  price: number;
  salePrice?: number;
  unit: string; // e.g. "bag", "m²", "piece"
  stock: number;
  rating: number;
  reviewCount: number;
  images: string[]; // gradient placeholders use emoji
  emoji: string;
  shortDescription: string;
  description: string;
  specs: { key: string; value: Localized }[];
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  reviews: Review[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  text: string;
  avatar: string;
}
