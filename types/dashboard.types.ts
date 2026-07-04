export interface DashboardStat {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
}

export interface RevenuePoint {
  date: string;
  revenue: number;
}

export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  amount: number;
  status: "completed" | "pending" | "processing" | "cancelled";
  date: string;
}
