import { Suspense } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductsTable } from "@/components/products/ProductsTable";
import { EmptyState } from "@/components/shared/EmptyState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { getProducts } from "./actions";
import { getCategories } from "../categories/actions";
import ProductsLoading from "@/components/products/loading";

const PER_PAGE = 10;

interface ProductsPageProps {
  searchParams: Promise<{ search?: string; category?: string; status?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const { products, total } = await getProducts({
    search: params.search,
    category: params.category,
    status: params.status,
    page,
    perPage: PER_PAGE,
  });
  const categories = await getCategories();
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500 mt-1">
            {total} product{total !== 1 ? "s" : ""}
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
        initialSearch={params.search ?? ""}
        initialCategory={params.category ?? ""}
        initialStatus={params.status ?? "all"}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
      />

      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description="Try adjusting your filters, or add your first product."
          actionHref="/products/new"
          actionLabel="Add Product"
        />
      ) : (
        <Suspense fallback={<ProductsLoading />}>
          <ProductsTable products={products} />
        </Suspense>
      )}

      <PaginationControls
        currentPage={page}
        totalPages={totalPages}
        totalItems={total}
        perPage={PER_PAGE}
        baseParams={params}
      />
    </div>
  );
}
