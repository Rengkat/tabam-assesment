import Link from "next/link";
import { Package } from "lucide-react";
import type { RecentProduct } from "@/types/dashboard.types";

export function RecentProductsList({ products }: { products: RecentProduct[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/50 overflow-hidden">
      <div className="p-6 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">Recently Added</h3>
          <p className="text-sm text-slate-500">Latest products in your catalog</p>
        </div>
        <Link href="/products" className="text-sm font-medium text-blue-600 hover:text-blue-700">
          View all →
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">No products yet.</p>
      ) : (
        <ul className="divide-y divide-slate-200">
          {products.map((product) => (
            <li key={product.id} className="px-6 py-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                <Package className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                <p className="text-xs text-slate-500">{product.category}</p>
              </div>
              <span className="text-sm font-semibold text-slate-900">
                ₦{product.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
