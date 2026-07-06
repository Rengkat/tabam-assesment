export interface DashboardStat {
  title: string;
  value: string;
  change?: number;
  trend?: "up" | "down";
}

export interface CategoryStockPoint {
  category: string;
  stock: number;
}

export interface RecentProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
}
