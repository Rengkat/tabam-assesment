import { Schema, models, model } from "mongoose";

export interface ICategory {
  name: string;
  slug: string;
  description: string;
  status: "active" | "inactive";
  createdAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true, maxlength: 60 },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true, maxlength: 300 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true },
);

export const Category = models.Category || model<ICategory>("Category", categorySchema);
