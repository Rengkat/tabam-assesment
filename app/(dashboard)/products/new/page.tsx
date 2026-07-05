import { ProductForm } from "@/components/products/ProductForm";
import { getCategories } from "../../categories/actions";
import { createProduct } from "../actions";
import type { ProductFormData } from "@/validations/product.schema";

export default async function NewProductPage() {
  const categories = await getCategories();

  async function handleCreate(data: ProductFormData, image: File | null) {
    "use server";
    let imageUrl: string | undefined;
    if (image) {
      // TODO: upload to Vercel Blob and set imageUrl to the returned URL
    }
    await createProduct({ ...data, image: imageUrl });
  }

  return (
    <div className="max-w-3xl">
      <ProductForm
        mode="create"
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        onSubmit={handleCreate}
      />
    </div>
  );
}
