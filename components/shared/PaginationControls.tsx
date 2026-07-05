"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  baseParams?: Record<string, string | undefined>;
}

export function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  baseParams = {},
}: PaginationControlsProps) {
  const pathname = usePathname();
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    Object.entries(baseParams).forEach(([key, value]) => {
      if (value && key !== "page") params.set(key, value);
    });
    params.set("page", String(page));
    return `${pathname}?${params.toString()}`;
  };

  const start = (currentPage - 1) * perPage + 1;
  const end = Math.min(currentPage * perPage, totalItems);

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50">
      <p className="text-sm text-slate-500">
        Showing {start}–{end} of {totalItems}
      </p>
      <div className="flex items-center gap-1">
        {currentPage > 1 ? (
          <Link
            href={buildHref(currentPage - 1)}
            aria-label="Previous page"
            className="p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <ChevronLeft className="w-4 h-4" />
          </Link>
        ) : (
          <span className="p-2 rounded-lg opacity-50" aria-hidden="true">
            <ChevronLeft className="w-4 h-4" />
          </span>
        )}
        <span className="text-sm text-slate-600 px-2" aria-current="page">
          Page {currentPage} of {totalPages}
        </span>
        {currentPage < totalPages ? (
          <Link
            href={buildHref(currentPage + 1)}
            aria-label="Next page"
            className="p-2 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <ChevronRight className="w-4 h-4" />
          </Link>
        ) : (
          <span className="p-2 rounded-lg opacity-50" aria-hidden="true">
            <ChevronRight className="w-4 h-4" />
          </span>
        )}
      </div>
    </nav>
  );
}
