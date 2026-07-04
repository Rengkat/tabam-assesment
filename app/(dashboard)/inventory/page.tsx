"use client";

import { useState, useMemo } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AdjustStockModal } from "@/components/inventory/AdjustStockModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { mockProducts } from "@/lib/mock/products";
import type { Product } from "@/types/product.types";
import { toast } from "sonner";

const PER_PAGE = 10;
const LOW_STOCK_THRESHOLD = 15;

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [search, setSearch] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);

  const lowStockCount = products.filter((p) => p.stock <= LOW_STOCK_THRESHOLD).length;

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase());
      const matchesLowStock = !showLowStockOnly || p.stock <= LOW_STOCK_THRESHOLD;
      return matchesSearch && matchesLowStock;
    });
  }, [products, search, showLowStockOnly]);

  const totalPages = Math.ceil(filteredProducts.length / PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const handleAdjustStock = async (productId: string, newStock: number, reason: string) => {
    // TODO: replace with Server Action once Product model exists.
    // The Server Action should also write an entry to a lightweight
    // StockAdjustment log (productId, previousStock, newStock, reason, timestamp)
    // for auditability — a single collection, not a per-item movements array.
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p)));
    toast.success(`Stock updated: ${reason}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
        <p className="text-slate-500 mt-1">
          {products.length} product{products.length !== 1 ? "s" : ""} tracked
          {lowStockCount > 0 && (
            <span className="ml-2 inline-flex items-center gap-1 text-yellow-600">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              {lowStockCount} low on stock
            </span>
          )}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/50">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            aria-hidden="true"
          />
          <label htmlFor="inventory-search" className="sr-only">
            Search inventory
          </label>
          <input
            id="inventory-search"
            type="search"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <label className="flex items-center gap-2 px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={(e) => {
              setShowLowStockOnly(e.target.checked);
              setCurrentPage(1);
            }}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Low stock only</span>
        </label>
      </div>

      {paginatedProducts.length === 0 ? (
        <EmptyState title="No items found" description="Try adjusting your search or filters." />
      ) : (
        <InventoryTable products={paginatedProducts} onAdjust={setAdjustingProduct} />
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredProducts.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <AdjustStockModal
        product={adjustingProduct}
        onClose={() => setAdjustingProduct(null)}
        onSave={handleAdjustStock}
      />
    </div>
  );
}
