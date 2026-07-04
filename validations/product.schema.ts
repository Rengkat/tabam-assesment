import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000),
  category: z.string().min(1, "Please select a category"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  sku: z.string().min(3, "SKU must be at least 3 characters").max(50),
  stock: z.number().min(0, "Stock cannot be negative"),
  status: z.enum(["published", "draft"]),
});

export type ProductFormData = z.infer<typeof productSchema>;
