import { connectDB } from "@/lib/db";
import { Product } from "@/lib/models/product.model";
import { Category } from "@/lib/models/category.model";
import type { CategoryStockPoint, RecentProduct } from "@/types/dashboard.types";

export async function getDashboardStats() {
  await connectDB();

  const [totalProducts, totalCategories, lowStockCount, products] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Product.countDocuments({ stock: { $lte: 15 } }),
    Product.find().select("price stock").lean(),
  ]);

  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  return { totalProducts, totalCategories, lowStockCount, totalStockValue };
}

export async function getStockByCategory(): Promise<CategoryStockPoint[]> {
  await connectDB();

  const result = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        stock: { $sum: "$stock" },
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "_id",
        as: "categoryInfo",
      },
    },
    { $unwind: { path: "$categoryInfo", preserveNullAndEmptyArrays: true } },
    {
      $project: {
        category: { $ifNull: ["$categoryInfo.name", "Uncategorized"] },
        stock: 1,
        _id: 0,
      },
    },
    { $sort: { stock: -1 } },
  ]);

  return result;
}

export async function getRecentProducts(limit = 5): Promise<RecentProduct[]> {
  await connectDB();

  const products = await Product.find()
    .populate("category", "name")
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();

  return products.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    category: (p.category as any)?.name ?? "Uncategorized",
    price: p.price,
    createdAt: p.createdAt.toISOString(),
  }));
}
