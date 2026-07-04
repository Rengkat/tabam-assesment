"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Loader2 } from "lucide-react";
import { categorySchema, type CategoryFormData } from "@/validations/category.schema";

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  defaultValues?: CategoryFormData;
  mode: "create" | "edit";
}

export function CategoryFormModal({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
  mode,
}: CategoryFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues ?? { name: "", description: "", status: "active" },
  });

  useEffect(() => {
    if (isOpen) reset(defaultValues ?? { name: "", description: "", status: "active" });
  }, [isOpen, defaultValues, reset]);

  if (!isOpen) return null;

  const submit = async (data: CategoryFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 id="category-modal-title" className="text-lg font-semibold text-slate-900">
            {mode === "create" ? "Add Category" : "Edit Category"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          <div>
            <label htmlFor="cat-name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              title="category name"
              id="cat-name"
              type="text"
              aria-invalid={!!errors.name}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                errors.name ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="cat-description"
              className="block text-sm font-medium text-slate-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="cat-description"
              rows={3}
              aria-invalid={!!errors.description}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y ${
                errors.description ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("description")}
            />
            {errors.description && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                {errors.description.message}
              </p>
            )}
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-slate-700 mb-1.5">Status</legend>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="active"
                  className="text-blue-600 focus:ring-blue-500"
                  {...register("status")}
                />
                <span className="text-sm text-slate-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="inactive"
                  className="text-blue-600 focus:ring-blue-500"
                  {...register("status")}
                />
                <span className="text-sm text-slate-700">Inactive</span>
              </label>
            </div>
          </fieldset>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500/40">
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {mode === "create" ? "Create" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
