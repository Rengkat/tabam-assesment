import type { Category } from "@/types/category.types";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Phones, laptops, and accessories.",
    status: "active",
    productCount: 24,
    createdAt: "2026-05-01",
  },
  {
    id: "2",
    name: "Wearables",
    slug: "wearables",
    description: "Smartwatches and fitness trackers.",
    status: "active",
    productCount: 8,
    createdAt: "2026-05-10",
  },
  {
    id: "3",
    name: "Apparel",
    slug: "apparel",
    description: "Clothing and footwear.",
    status: "active",
    productCount: 31,
    createdAt: "2026-05-15",
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    description: "Bags, wallets, and small goods.",
    status: "inactive",
    productCount: 5,
    createdAt: "2026-06-01",
  },
];
