export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: CategoryStatus;
  productCount: number;
  createdAt: string;
}

export interface CategoryFilters {
  search: string;
  status: CategoryStatus | "all";
}
