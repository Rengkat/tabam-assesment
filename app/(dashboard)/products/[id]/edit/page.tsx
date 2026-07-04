"use client";

import { ProductForm } from "@/components/products/ProductForm";
import type { ProductFormData } from "@/validations/product.schema";

export default function NewProductPage() {
  const handleSubmit = async (data: ProductFormData, image: File | null) => {
    // TODO: replace with Server Action once Product model + lib/db.ts exist.
    // TODO: upload `image` to Vercel Blob first (if present), then save the returned URL.
    console.log("Creating product:", data, image);
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <div className="max-w-3xl">
      <ProductForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
