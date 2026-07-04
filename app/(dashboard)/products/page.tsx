"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductsTable } from "@/components/products/ProductsTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { mockProducts, productCategories } from "@/lib/mock/products";
import type { ProductFilters as Filters } from "@/types/product.types";

const PER_PAGE = 10;

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [filters, setFilters] = useState<Filters>({ search: "", category: "", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !filters.search ||
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.sku.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = !filters.category || p.category === filters.category;
      const matchesStatus = filters.status === "all" || p.status === filters.status;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, filters]);

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    // TODO: replace with Server Action call once Product model exists
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/products/new"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Product
        </Link>
      </div>

      <ProductFilters
        filters={filters}
        categories={productCategories}
        onChange={handleFilterChange}
      />

      {paginatedProducts.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your filters, or add your first product."
          actionHref="/products/new"
          actionLabel="Add Product"
        />
      ) : (
        <ProductsTable products={paginatedProducts} onDelete={handleDelete} />
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
