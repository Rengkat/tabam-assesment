export type ProductStatus = "published" | "draft";

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: ProductStatus;
  image?: string;
  createdAt: string;
}

export interface ProductFilters {
  search: string;
  category: string;
  status: ProductStatus | "all";
}
