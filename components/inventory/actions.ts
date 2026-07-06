"use server";

import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product.model";
import { requireSession } from "@/lib/session";
import type { InventoryItem } from "@/types/inventory.types";

export async function adjustStock(productId: string, newStock: number, reason: string) {
  await requireSession();

  if (newStock < 0) {
    throw new Error("Stock cannot go below 0");
  }
  if (!reason.trim()) {
    throw new Error("A reason is required for stock adjustments");
  }

  await connectDB();
  const product = await Product.findByIdAndUpdate(productId, { stock: newStock }, { new: true });
  if (!product) {
    throw new Error("Product not found");
  }
}

export async function getInventory({
  search,
  lowStockOnly,
}: { search?: string; lowStockOnly?: boolean } = {}): Promise<InventoryItem[]> {
  await connectDB();

  const query: Record<string, unknown> = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { sku: { $regex: search, $options: "i" } },
    ];
  }
  if (lowStockOnly) query.stock = { $lte: 15 };

  const products = await Product.find(query).populate("category", "name").sort({ stock: 1 }).lean();

  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    sku: p.sku,
    stock: p.stock,
    image: p.image,
    category: (p.category as any)?.name ?? "Uncategorized",
  }));
}
