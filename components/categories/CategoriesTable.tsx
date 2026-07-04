"use client";

import Link from "next/link";
import { Edit, Folder } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ConfirmDeleteDialog } from "@/components/shared/ConfirmDeleteDialog";
import type { Category } from "@/types/category.types";

interface CategoriesTableProps {
  categories: Category[];
  onDelete: (id: string) => void;
}

export function CategoriesTable({ categories, onDelete }: CategoriesTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Slug
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Products
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Folder className="w-4 h-4 text-slate-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{category.name}</p>
                      <p className="text-xs text-slate-500 line-clamp-1">{category.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{category.slug}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{category.productCount}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={category.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/categories/${category.id}`}
                      aria-label={`Edit ${category.name}`}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      <Edit className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    </Link>
                    <ConfirmDeleteDialog
                      itemLabel="category"
                      itemName={category.name}
                      onConfirm={() => onDelete(category.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
