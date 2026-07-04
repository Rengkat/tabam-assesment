"use client";

import Image from "next/image";
import Link from "next/link";
import { Edit, Package } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { StockIndicator } from "./StockIndicator";
import { DeleteProductDialog } from "./DeleteProductDialog";
import type { Product } from "@/types/product.types";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export function ProductsTable({ products, onDelete }: ProductsTableProps) {
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
                Price
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Stock
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
                <td className="px-4 py-3 text-sm text-slate-600">₦{product.price.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <StockIndicator stock={product.stock} />
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={product.status} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/products/${product.id}/edit`}
                      aria-label={`Edit ${product.name}`}
                      className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
                      <Edit className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    </Link>
                    <DeleteProductDialog
                      productName={product.name}
                      onConfirm={() => onDelete(product.id)}
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
