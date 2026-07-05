import { notFound } from "next/navigation";
import { ProductForm } from "@/components/products/ProductForm";
import { getProductById, updateProduct } from "../../actions";
import { getCategories } from "../../../categories/actions";
import type { ProductFormData } from "@/validations/product.schema";

interface EditProductPageProps {
  params: { id: string };
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  const [product, categories] = await Promise.all([getProductById(params.id), getCategories()]);

  if (!product) notFound();

  async function handleUpdate(data: ProductFormData, image: File | null) {
    "use server";
    let imageUrl: string | undefined;
    if (image) {
      // TODO: upload to Vercel Blob and set imageUrl to the returned URL
    }
    await updateProduct(params.id, { ...data, image: imageUrl });
  }

  return (
    <div className="max-w-3xl">
      <ProductForm
        mode="edit"
        defaultValues={{
          name: product.name,
          description: product.description,
          categoryId: product.category,
          price: product.price,
          sku: product.sku,
          stock: product.stock,
          status: product.status,
        }}
        initialImage={product.image}
        categories={categories.map((c) => ({ id: c.id, name: c.name }))}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
