"use client";

import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { CategoryFilters } from "@/components/categories/CategoryFilters";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { CategoryFormModal } from "@/components/categories/CategoryFormModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { mockCategories } from "@/lib/mock/categories";
import type { CategoryFilters as Filters, Category } from "@/types/category.types";
import type { CategoryFormData } from "@/validations/category.schema";
import { toast } from "sonner";

const PER_PAGE = 10;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [filters, setFilters] = useState<Filters>({ search: "", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      const matchesSearch =
        !filters.search ||
        c.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        c.slug.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === "all" || c.status === filters.status;
      return matchesSearch && matchesStatus;
    });
  }, [categories, filters]);

  const totalPages = Math.ceil(filteredCategories.length / PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleDelete = (id: string) => {
    // TODO: replace with Server Action once Category model exists
    setCategories((prev) => prev.filter((c) => c.id !== id));
    toast.success("Category deleted");
  };

  const handleCreate = async (data: CategoryFormData) => {
    // TODO: replace with Server Action once Category model exists
    const newCategory: Category = {
      id: crypto.randomUUID(),
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      productCount: 0,
      createdAt: new Date().toISOString(),
      ...data,
    };
    setCategories((prev) => [newCategory, ...prev]);
    toast.success("Category created");
  };

  const handleEdit = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    // TODO: replace with Server Action once Category model exists
    setCategories((prev) => prev.map((c) => (c.id === editingCategory.id ? { ...c, ...data } : c)));
    toast.success("Category updated");
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
          <p className="text-slate-500 mt-1">
            {filteredCategories.length} categor{filteredCategories.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          <Plus className="w-4 h-4" aria-hidden="true" />
          Add Category
        </button>
      </div>

      <CategoryFilters filters={filters} onChange={handleFilterChange} />

      {paginatedCategories.length === 0 ? (
        <EmptyState
          title="No categories found"
          description="Try adjusting your filters, or add your first category."
        />
      ) : (
        <CategoriesTable categories={paginatedCategories} onDelete={handleDelete} />
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredCategories.length}
        perPage={PER_PAGE}
        onPageChange={setCurrentPage}
      />

      <CategoryFormModal
        isOpen={isModalOpen}
        mode="create"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreate}
      />

      {editingCategory && (
        <CategoryFormModal
          isOpen={!!editingCategory}
          mode="edit"
          defaultValues={{
            name: editingCategory.name,
            description: editingCategory.description,
            status: editingCategory.status,
          }}
          onClose={() => setEditingCategory(null)}
          onSubmit={handleEdit}
        />
      )}
    </div>
  );
}
