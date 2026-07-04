"use client";

import { ProductForm } from "@/components/products/ProductForm";
import type { ProductFormData } from "@/validations/product.schema";
import type { Product } from "@/types/product.types";

export function EditProductForm({ product }: { product: Product }) {
  const defaultValues: ProductFormData = {
    name: product.name,
    description: product.description,
    category: product.category,
    price: product.price,
    sku: product.sku,
    stock: product.stock,
    status: product.status,
  };

  const handleSubmit = async (data: ProductFormData, image: File | null) => {
    // TODO: replace with Server Action once Product model + lib/db.ts exist.
    console.log("Updating product:", product.id, data, image);
    await new Promise((resolve) => setTimeout(resolve, 800));
  };

  return (
    <ProductForm
      mode="edit"
      defaultValues={defaultValues}
      initialImage={product.image}
      onSubmit={handleSubmit}
    />
  );
}
