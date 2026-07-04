import type { DashboardStat, RevenuePoint, RecentOrder } from "@/types/dashboard.types";

export const mockStats: Omit<DashboardStat, "icon" | "iconBg">[] = [
  { title: "Total Revenue", value: "$45,231.89", change: 12.5, trend: "up" },
  { title: "Total Orders", value: "1,284", change: 8.2, trend: "up" },
  { title: "Total Products", value: "2,847", change: 2.4, trend: "up" },
  { title: "Low Stock Items", value: "12", change: 3.1, trend: "down" },
];

export const mockRevenueData: RevenuePoint[] = [
  { date: "Jun 05", revenue: 3200 },
  { date: "Jun 08", revenue: 4100 },
  { date: "Jun 11", revenue: 3800 },
  { date: "Jun 14", revenue: 5200 },
  { date: "Jun 17", revenue: 4700 },
  { date: "Jun 20", revenue: 6100 },
  { date: "Jun 23", revenue: 5800 },
  { date: "Jun 26", revenue: 6900 },
  { date: "Jun 29", revenue: 6400 },
  { date: "Jul 02", revenue: 7200 },
];

export const mockRecentOrders: RecentOrder[] = [
  {
    id: "#ORD-001",
    customer: "Alice Johnson",
    email: "alice@example.com",
    amount: 299.99,
    status: "completed",
    date: "2026-07-03",
  },
  {
    id: "#ORD-002",
    customer: "Bob Smith",
    email: "bob@example.com",
    amount: 149.5,
    status: "processing",
    date: "2026-07-03",
  },
  {
    id: "#ORD-003",
    customer: "Carol White",
    email: "carol@example.com",
    amount: 89.99,
    status: "pending",
    date: "2026-07-02",
  },
  {
    id: "#ORD-004",
    customer: "David Brown",
    email: "david@example.com",
    amount: 459.0,
    status: "completed",
    date: "2026-07-02",
  },
];
