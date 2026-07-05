"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { Category } from "@/lib/models/category.model";
import { Product } from "@/lib/models/product.model";
import { requireSession } from "@/lib/session";
import { categorySchema, type CategoryFormData } from "@/validations/category.schema";
import { slugify } from "@/lib/utils/slugify";

export async function getCategories() {
  await connectDB();
  const categories = await Category.find().sort({ createdAt: -1 }).lean();

  const counts = await Product.aggregate([{ $group: { _id: "$category", count: { $sum: 1 } } }]);
  const countMap = new Map(counts.map((c) => [c._id.toString(), c.count]));

  return categories.map((c) => ({
    id: c._id.toString(),
    name: c.name,
    slug: c.slug,
    description: c.description,
    status: c.status,
    productCount: countMap.get(c._id.toString()) ?? 0,
    createdAt: c.createdAt.toISOString(),
  }));
}

export async function createCategory(data: CategoryFormData) {
  await requireSession();
  const parsed = categorySchema.parse(data);

  await connectDB();
  const slug = slugify(parsed.name);

  const existing = await Category.findOne({ slug });
  if (existing) {
    throw new Error("A category with this name already exists");
  }

  await Category.create({ ...parsed, slug });
  revalidatePath("/categories");
}

export async function updateCategory(id: string, data: CategoryFormData) {
  await requireSession();
  const parsed = categorySchema.parse(data);

  await connectDB();
  await Category.findByIdAndUpdate(id, { ...parsed, slug: slugify(parsed.name) });
  revalidatePath("/categories");
}

export async function deleteCategory(id: string) {
  await requireSession();
  await connectDB();

  const productCount = await Product.countDocuments({ category: id });
  if (productCount > 0) {
    throw new Error(`Cannot delete: ${productCount} product(s) still assigned to this category`);
  }

  await Category.findByIdAndDelete(id);
  revalidatePath("/categories");
}
