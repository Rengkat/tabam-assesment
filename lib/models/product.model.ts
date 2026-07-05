import { Schema, models, model, Types } from "mongoose";

export interface IProduct {
  name: string;
  sku: string;
  description: string;
  price: number;
  stock: number;
  category: Types.ObjectId;
  status: "published" | "draft";
  image?: string;
  createdAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    sku: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, maxlength: 1000 },
    price: { type: Number, required: true, min: 0.01 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    status: { type: String, enum: ["published", "draft"], default: "draft" },
    image: { type: String },
  },
  { timestamps: true },
);

productSchema.index({ name: "text", sku: "text" });

export const Product = models.Product || model<IProduct>("Product", productSchema);
