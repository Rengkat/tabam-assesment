"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { productSchema, type ProductFormData } from "@/validations/product.schema";
import { ImageUploadField } from "@/components/products/ImageUploadField";

interface ProductFormProps {
  mode: "create" | "edit";
  defaultValues?: ProductFormData;
  initialImage?: string;
  categories: { id: string; name: string }[];
  onSubmit: (data: ProductFormData, image: File | null) => Promise<void>;
}

export function ProductForm({
  mode,
  defaultValues,
  initialImage,
  categories,
  onSubmit,
}: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      categoryId: "",
      price: 0,
      sku: "",
      stock: 0,
      status: "draft",
    },
  });

  const submit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data, image);
      toast.success(
        mode === "create" ? "Product created successfully!" : "Product updated successfully!",
      );
      router.push("/products");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/products"
          aria-label="Back to products"
          className="p-2 rounded-xl hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">
          {mode === "create" ? "Add Product" : "Edit Product"}
        </h1>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50 space-y-5">
        <ImageUploadField initialPreview={initialImage} onChange={setImage} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            title="name"
            id="name"
            type="text"
            placeholder="e.g. Premium Wireless Headphones"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
              errors.name ? "border-red-500" : "border-slate-200 hover:border-slate-300"
            }`}
            {...register("name")}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-sm text-red-500 mt-1.5">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            title="describtion"
            id="description"
            rows={4}
            placeholder="Describe the product..."
            aria-invalid={!!errors.description}
            className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-y ${
              errors.description ? "border-red-500" : "border-slate-200 hover:border-slate-300"
            }`}
            {...register("description")}
          />
          <div className="flex justify-between mt-1.5">
            {errors.description ? (
              <p role="alert" className="text-sm text-red-500">
                {errors.description.message}
              </p>
            ) : (
              <span className="text-xs text-slate-400">
                {watch("description")?.length ?? 0}/1000
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              title="categoryId"
              id="categoryId"
              aria-invalid={!!errors.categoryId}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                errors.categoryId ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("categoryId")}>
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                Please select a category
              </p>
            )}
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-slate-700 mb-1.5">
              SKU <span className="text-red-500">*</span>
            </label>
            <input
              title="sku"
              id="sku"
              type="text"
              placeholder="SKU-000001"
              aria-invalid={!!errors.sku}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                errors.sku ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("sku")}
            />
            {errors.sku && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                {errors.sku.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1.5">
              Price (₦) <span className="text-red-500">*</span>
            </label>
            <input
              title="price"
              id="price"
              type="number"
              step="0.01"
              placeholder="0.00"
              aria-invalid={!!errors.price}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                errors.price ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-1.5">
              Stock Quantity <span className="text-red-500">*</span>
            </label>
            <input
              id="stock"
              type="number"
              placeholder="0"
              aria-invalid={!!errors.stock}
              className={`w-full px-4 py-2.5 rounded-xl border bg-slate-50 text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 ${
                errors.stock ? "border-red-500" : "border-slate-200 hover:border-slate-300"
              }`}
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && (
              <p role="alert" className="text-sm text-red-500 mt-1.5">
                {errors.stock.message}
              </p>
            )}
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-slate-700 mb-1.5">Status</legend>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="published"
                className="text-blue-600 focus:ring-blue-500"
                {...register("status")}
              />
              <span className="text-sm text-slate-700">Published</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="draft"
                className="text-blue-600 focus:ring-blue-500"
                {...register("status")}
              />
              <span className="text-sm text-slate-700">Draft</span>
            </label>
          </div>
        </fieldset>
      </div>

      <div className="flex justify-end gap-3">
        <Link
          href="/products"
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500/40">
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          ) : (
            <Save className="w-4 h-4" aria-hidden="true" />
          )}
          {mode === "create" ? "Create Product" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}
