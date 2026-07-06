"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { CategoryStockPoint } from "@/types/dashboard.types";

export function StockByCategoryChart({ data }: { data: CategoryStockPoint[] }) {
  if (data.length === 0) {
    return (
      <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 flex items-center justify-center h-[340px]">
        <p className="text-sm text-slate-500">Add products to see stock distribution.</p>
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Stock by Category</h3>
        <p className="text-sm text-slate-500">Total units in stock, grouped by category</p>
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis dataKey="category" stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <YAxis stroke="#94A3B8" tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${value} units`, "Stock"]} />
            <Bar dataKey="stock" fill="#3B82F6" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
