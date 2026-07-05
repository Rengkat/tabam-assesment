"use client";

import { useState, useMemo, useTransition } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { CategoryFilters } from "@/components/categories/CategoryFilters";
import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { CategoryFormModal } from "@/components/categories/CategoryFormModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { createCategory, updateCategory, deleteCategory } from "./actions";
import type { CategoryFilters as Filters, Category } from "@/types/category.types";
import type { CategoryFormData } from "@/validations/category.schema";

const PER_PAGE = 10;

export function CategoriesPageClient({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState(initialCategories);
  const [filters, setFilters] = useState<Filters>({ search: "", status: "all" });
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isPending, startTransition] = useTransition();

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
    startTransition(async () => {
      try {
        await deleteCategory(id);
        setCategories((prev) => prev.filter((c) => c.id !== id));
        toast.success("Category deleted");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Failed to delete category");
      }
    });
  };

  const handleCreate = async (data: CategoryFormData) => {
    await createCategory(data);
    setCategories((prev) => [
      {
        id: crypto.randomUUID(),
        slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        productCount: 0,
        createdAt: new Date().toISOString(),
        ...data,
      },
      ...prev,
    ]);
    toast.success("Category created");
  };

  const handleEdit = async (data: CategoryFormData) => {
    if (!editingCategory) return;
    await updateCategory(editingCategory.id, data);
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
        <CategoriesTable
          categories={paginatedCategories}
          onEdit={setEditingCategory}
          onDelete={handleDelete}
        />
      )}

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
