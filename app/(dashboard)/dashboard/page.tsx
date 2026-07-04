import { DollarSign, ShoppingBag, Package, AlertTriangle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentOrdersTable } from "@/components/dashboard/RecentOrdersTable";
import { mockStats, mockRevenueData, mockRecentOrders } from "@/lib/mock/dashboard";

const icons = [
  { icon: <DollarSign className="w-6 h-6 text-blue-600" />, bg: "bg-blue-50" },
  { icon: <ShoppingBag className="w-6 h-6 text-purple-600" />, bg: "bg-purple-50" },
  { icon: <Package className="w-6 h-6 text-green-600" />, bg: "bg-green-50" },
  { icon: <AlertTriangle className="w-6 h-6 text-orange-600" />, bg: "bg-orange-50" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of your store's performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockStats.map((stat, i) => (
          <StatCard key={stat.title} {...stat} icon={icons[i].icon} iconBg={icons[i].bg} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueChart data={mockRevenueData} />
        <RecentOrdersTable orders={mockRecentOrders.slice(0, 4)} />
      </div>
    </div>
  );
}
