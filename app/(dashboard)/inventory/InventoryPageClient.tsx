"use client";

import { useState, useMemo, useTransition } from "react";
import { Search, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { InventoryTable } from "@/components/inventory/InventoryTable";
import { AdjustStockModal } from "@/components/inventory/AdjustStockModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { adjustStock } from "./actions";
import type { InventoryItem } from "@/types/inventory.types";

const LOW_STOCK_THRESHOLD = 15;

export function InventoryPageClient({ initialProducts }: { initialProducts: InventoryItem[] }) {
  const [products, setProducts] = useState<InventoryItem[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [adjustingProduct, setAdjustingProduct] = useState<InventoryItem | null>(null);
  const [isPending, startTransition] = useTransition();

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

  const handleAdjustStock = async (productId: string, newStock: number, reason: string) => {
    startTransition(async () => {
      try {
        await adjustStock(productId, newStock, reason);
        setProducts((prev) =>
          prev.map((p) => (p.id === productId ? { ...p, stock: newStock } : p)),
        );
        toast.success(`Stock updated: ${reason}`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to update stock");
      }
    });
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
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>
        <label className="flex items-center gap-2 px-3 py-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showLowStockOnly}
            onChange={(e) => setShowLowStockOnly(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-700">Low stock only</span>
        </label>
      </div>

      {filteredProducts.length === 0 ? (
        <EmptyState title="No items found" description="Try adjusting your search or filters." />
      ) : (
        <InventoryTable products={filteredProducts} onAdjust={setAdjustingProduct} />
      )}

      <AdjustStockModal
        product={adjustingProduct}
        onClose={() => setAdjustingProduct(null)}
        onSave={handleAdjustStock}
      />
    </div>
  );
}
