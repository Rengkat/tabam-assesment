import { DollarSign, Package, Tag, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { StockByCategoryChart } from "@/components/dashboard/StockByCategoryChart";
import { RecentProductsList } from "@/components/dashboard/RecentProductsList";
import { getDashboardStats, getStockByCategory, getRecentProducts } from "@/lib/dashboard/stats";

export default async function DashboardPage() {
  const [stats, stockByCategory, recentProducts] = await Promise.all([
    getDashboardStats(),
    getStockByCategory(),
    getRecentProducts(5),
  ]);

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts.toLocaleString(),
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      title: "Total Categories",
      value: stats.totalCategories.toLocaleString(),
      icon: <Tag className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
    {
      title: "Stock Value",
      value: `₦${stats.totalStockValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      title: "Low Stock Items",
      value: stats.lowStockCount.toLocaleString(),
      icon: <AlertTriangle className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <StatCard key={c.title} title={c.title} value={c.value} icon={c.icon} iconBg={c.bg} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StockByCategoryChart data={stockByCategory} />
        <RecentProductsList products={recentProducts} />
      </div>
    </div>
  );
}
