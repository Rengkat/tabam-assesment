"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product.model";
import { requireSession } from "@/lib/session";
import { productSchema, type ProductFormData } from "@/validations/product.schema";

interface GetProductsParams {
  search?: string;
  category?: string;
  status?: string;
  page?: number;
  perPage?: number;
}

export async function getProducts({
  search,
  category,
  status,
  page = 1,
  perPage = 10,
}: GetProductsParams = {}) {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }
  if (category) query.category = category;
  if (status && status !== "all") query.status = status;

  const [products, total] = await Promise.all([
    Product.find(query)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean(),
    Product.countDocuments(query),
  ]);

  return {
    products: products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      sku: p.sku,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: (p.category as any)?.name ?? "Uncategorized",
      categoryId: (p.category as any)?._id?.toString(),
      status: p.status,
      image: p.image,
      createdAt: p.createdAt.toISOString(),
    })),
    total,
  };
}

export async function getProductById(id: string) {
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return null;

  return {
    id: product._id.toString(),
    name: product.name,
    sku: product.sku,
    description: product.description,
    price: product.price,
    stock: product.stock,
    category: product.category.toString(),
    status: product.status,
    image: product.image,
  };
}

export async function createProduct(
  data: ProductFormData & { categoryId: string; image?: string },
) {
  await requireSession();
  const { categoryId, image, ...rest } = data;
  const parsed = productSchema.parse(rest);

  await connectDB();

  const existingSku = await Product.findOne({ sku: parsed.sku });
  if (existingSku) {
    throw new Error("A product with this SKU already exists");
  }

  await Product.create({ ...parsed, category: categoryId, image });
  revalidatePath("/products");
  revalidatePath("/dashboard");
}

export async function updateProduct(
  id: string,
  data: ProductFormData & { categoryId: string; image?: string },
) {
  await requireSession();
  const { categoryId, image, ...rest } = data;
  const parsed = productSchema.parse(rest);

  await connectDB();
  await Product.findByIdAndUpdate(id, { ...parsed, category: categoryId, ...(image && { image }) });
  revalidatePath("/products");
  revalidatePath(`/products/${id}/edit`);
}

export async function deleteProduct(id: string) {
  await requireSession();
  await connectDB();
  await Product.findByIdAndDelete(id);
  revalidatePath("/products");
  revalidatePath("/dashboard");
}
