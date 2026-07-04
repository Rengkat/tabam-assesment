"use client";

import { Search } from "lucide-react";
import type { CategoryFilters as Filters, CategoryStatus } from "@/types/category.types";

interface CategoryFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function CategoryFilters({ filters, onChange }: CategoryFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          aria-hidden="true"
        />
        <label htmlFor="category-search" className="sr-only">
          Search categories
        </label>
        <input
          id="category-search"
          type="search"
          placeholder="Search categories..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="category-status-filter" className="sr-only">
          Filter by status
        </label>
        <select
          id="category-status-filter"
          value={filters.status}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as CategoryStatus | "all" })
          }
          className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
