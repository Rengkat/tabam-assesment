"use client";

import Image from "next/image";
import { Settings, Package } from "lucide-react";
import { StockLevelBar } from "./StockLevelBar";
import type { InventoryItem } from "@/types/inventory.types";

interface InventoryTableProps {
  products: InventoryItem[];
  onAdjust: (product: InventoryItem) => void;
}

const LOW_STOCK_THRESHOLD = 15;

export function InventoryTable({ products, onAdjust }: InventoryTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Product
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stock
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt=""
                          width={40}
                          height={40}
                          className="object-cover h-full w-full"
                        />
                      ) : (
                        <Package className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{product.name}</p>
                      <p className="text-xs text-slate-500">{product.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-slate-600">{product.category}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock <= LOW_STOCK_THRESHOLD
                            ? "text-yellow-600"
                            : "text-slate-900"
                      }`}>
                      {product.stock}
                    </span>
                    <StockLevelBar stock={product.stock} lowStockThreshold={LOW_STOCK_THRESHOLD} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => onAdjust(product)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      <Settings className="w-3.5 h-3.5" aria-hidden="true" />
                      Adjust
                    </button>
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
