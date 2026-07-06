import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import type { DashboardStat } from "@/types/dashboard.types";

interface StatCardProps extends DashboardStat {
  icon: React.ReactNode;
  iconBg: string;
}

export function StatCard({ title, value, change, trend, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {change !== undefined && trend && (
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  trend === "up" ? "text-green-600" : "text-red-600"
                }`}>
                {trend === "up" ? (
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                ) : (
                  <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                )}
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-slate-400">vs last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`} aria-hidden="true">
          {icon}
        </div>
      </div>
    </div>
  );
}
